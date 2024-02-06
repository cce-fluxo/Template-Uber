import React, { useState, useRef, useEffect } from "react";
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  Text,
  View,
  TextInput,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import { StyleSheet } from "react-native";
import { screenHeight, screenWidth } from "../../../../constants/dimensions";
import { colors } from "../../../../constants/theme";
import { Formik } from "formik";
import { Keyboard } from "react-native";
import SelectInputModal from "../../../../components/modals/selectInputModal";
import { set } from "date-fns";
import * as yup from "yup";
import { KeyboardAvoidingView } from "react-native";
import { Feather } from "@expo/vector-icons";
import { TextInputMask } from "react-native-masked-text";
import MainButton from "../../../../components/buttons/MainButton";
import { Vector } from "../../../../assets/Vector.png";
import api from "../../../../services/api";

const AddMaterial = ({ navigation, route }) => {
  const { materiaisVendidos, setMateriaisVendidos } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [added, setIsAdded] = useState(false);
  const [materiais, setMateriais] = useState([]);
  const optionsModalRef = useRef(null);
  const [materialId, setMaterialId] = useState(null);
  const openOptionsModal = (optionsModalRef) => optionsModalRef.current?.open();

  const getMaterials = async () => {
    setIsLoading(true);
    try {
      const response = await api.get(`material/list`);
      setMateriais(response.data);
      console.log("materiais: ", response.data);
    } catch (error) {
      console.log(error);
      console.log(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMaterials();
  }, []);

  validationSchema = yup.object().shape({
    nome_material: yup
      .string()
      .matches(/\w/, "Escolha um Material")
      .required("A escolha de um Material é obrigatória"),
    kg: yup
      .string()
      .matches(/\w/, "Digite o peso")
      .required("O peso é obrigatório"),
    valor_kg: yup
      .string()
      .matches(/\w/, "Digite o Valor")
      .required("O Valor é obrigatório"),
  });

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{
        nome_material: "",
        kg: "",
        valor_kg: "",
      }}
      onSubmit={(values, { resetForm }) => {
        console.log("materiaisVendidos: ", materiaisVendidos);
        values.valor_kg = parseFloat(values.valor_kg.replace("R$", ""));
        values.kg = parseFloat(values.kg);
        values["material_id"] = parseInt(materialId);
        setMateriaisVendidos((last) => [...last, values]);
        setIsAdded(true);
        resetForm();
      }}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        isValid,
        touched,
      }) => (
        <View style={styles.background}>
          <TouchableOpacity
            style={styles.goBack}
            onPress={navigation.goBack}
            activeOpacity={1}
          />

          <View style={styles.modal}>
            {added ? (
              <>
                <Image
                  style={styles.image}
                  source={require("../../../../assets/Vector.png")}
                />
                <Text style={styles.title2}>
                  Material Adicionado com Sucesso
                </Text>
                <View style={styles.buttonWrapper}>
                  <MainButton
                    name="Adicionar Outro Material"
                    negative
                    onPress={() => setIsAdded(false)}
                  />
                  <MainButton
                    name="Concluir"
                    onPress={() => navigation.navigate("Sales Materials")}
                  />
                </View>
              </>
            ) : (
              <>
                <Text style={styles.title}>Adicionar Material</Text>
                <Text style={styles.subtitle}>Material</Text>
                <TextInput
                  style={
                    errors.nome_material && touched.nome_material
                      ? styles.errorInput
                      : styles.input
                  }
                  name="nome_material"
                  autoCapitalize="none"
                  placeholder=""
                  showSoftInputOnFocus={false}
                  onBlur={handleBlur("nome_material")}
                  value={values?.nome_material}
                  onFocus={() => {
                    Keyboard.dismiss();
                    openOptionsModal(optionsModalRef);
                  }}
                />

                {/* {errors.nome_material && touched.nome_material && (
              <Text style={styles.errorText}>{errors.nome_material}</Text>
            )} */}
                <Text style={styles.subtitle}>Peso (Kg)</Text>
                <TextInputMask
                  type={"money"}
                  options={{
                    precision: 2,
                    separator: ".",
                    delimiter: ",",
                    unit: "",
                    suffixUnit: "",
                  }}
                  style={
                    errors.kg && touched.kg ? styles.errorInput : styles.input
                  }
                  name="kg"
                  autoCapitalize="none"
                  placeholder=""
                  keyboardType="number-pad"
                  onBlur={handleBlur("kg")}
                  value={values?.kg}
                  onChangeText={handleChange("kg")}
                />
                {/* {errors.kg && touched.kg && (
              <Text style={styles.errorText}>{errors.kg}</Text>
            )} */}
                <Text style={styles.subtitle}>Valor por Kg</Text>
                <TextInputMask
                  type={"money"}
                  options={{
                    precision: 2,
                    separator: ".",
                    delimiter: ",",
                    unit: "R$",
                    prefixUnit: "",
                  }}
                  style={
                    errors.valor_kg && touched.valor_kg
                      ? styles.errorInput
                      : styles.input
                  }
                  name="valor_kg"
                  autoCapitalize="none"
                  placeholder=""
                  onBlur={handleBlur("valor_kg")}
                  value={values?.valor_kg}
                  onChangeText={handleChange("valor_kg")}
                />
                {/* {errors.valor_kg && touched.valor_kg && (
              <Text style={styles.errorText}>{errors.valor_kg}</Text>
            )} */}
                <View style={styles.buttonWrapper}>
                  <MainButton
                    name="Adicionar"
                    onPress={handleSubmit}
                    disabled={!isValid}
                  />
                </View>
              </>
            )}
          </View>
          <TouchableOpacity
            style={styles.goBack}
            onPress={navigation.goBack}
            activeOpacity={1}
          />

          <SelectInputModal
            modalRef={optionsModalRef}
            handleChange={handleChange}
            data={materiais}
            title=""
            setData={setMaterialId}
            name="nome_material"
            emptyText={"Nenhum Material Encontrado"}
            // loading={isLoading}
          />
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#464646",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    width: screenWidth * 0.9,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: screenWidth * 0.06,
    paddingVertical: screenHeight * 0.025,
    gap: screenHeight * 0.005,
    minHeight: screenHeight * 0.5,
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: colors.primary,
    marginBottom: screenHeight * 0.01,
  },
  title2: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#464646",
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: colors.inputBackground,
    borderRadius: 5,
    paddingLeft: screenWidth * 0.026,
    paddingRight: screenWidth * 0.01,
    marginVertical: screenHeight * 0.0073,
    fontSize: 16,
    color: colors.font,
  },
  errorInput: {
    width: "100%",
    height: 50,
    borderRadius: 5,
    paddingLeft: screenWidth * 0.026,
    paddingRight: screenWidth * 0.01,
    marginVertical: screenHeight * 0.0073,
    fontSize: 16,
    color: colors.inputErrorText,
    borderColor: colors.inputErrorBorder,
    borderWidth: 2,
    borderStyle: "solid",
    backgroundColor: colors.inputErrorBackground,
  },
  errorText: {
    color: colors.fontError,
    fontSize: screenHeight * 0.016,
    alignSelf: "center",
  },
  buttonWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    alignSelf: "center",
    marginBottom: screenHeight * 0.02,
  },
  goBack: {
    flex: 1,
    width: "100%",
  },
});

export default AddMaterial;
