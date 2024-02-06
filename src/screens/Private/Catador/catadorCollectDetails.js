import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';

import { colors } from '../../../constants/theme';
import { screenHeight, screenWidth } from '../../../constants/dimensions';
import ListResumeList from '../../../components/resumeList/listResumeList';
import { Feather } from '@expo/vector-icons';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CatadorCollectDetailsScreen({ navigation, route }) {
  const {
    itemInformation,
    previousCalendar,
    previousHistoric,
    previousPackage,
  } = route.params;

  const alertCancel = () => {
    Alert.alert(
      'Cancelar coleta?',
      'Uma pequena taxa poderá ser cobrada pelo cancelamento',
      [
        {
          text: 'Não',
          onPress: () => {
            console.log('');
          },
          style: 'default',
        },
        {
          text: 'Sim, cancelar',
          onPress: () => console.log('req de cancelar'),
          style: 'destructive',
        },
      ]
    );
  };

  function formatDate(date) {
    const newDate = new Date(date);
    const formated = format(newDate, 'dd MMMM', { locale: ptBR });
    const day = formated.split(' ')[0];
    let month = formated
      .split(' ')[1]
      .replace(/(^|\s)\S/g, letter => letter.toUpperCase());

    return day + ' ' + month;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <View style={styles.headerMenu}>
          <TouchableOpacity
            onPress={() => {
              // previousCalendar == true
              //   ? navigation.navigate('Collections')
              //   : previousHistoric == true
              //   ? navigation.navigate('Historic')
              //   : previousPackage == true
              //   ? navigation.navigate('PackageScreen')
              //   : navigation.navigate('Home');
              navigation.goBack();
            }}
          >
            <Feather name="arrow-left" size={25} color={colors.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Detalhes da coleta</Text>
        </View>

        <View style={styles.background}>
          <View style={styles.informationContainer}>
            <View style={{ width: '80%' }}>
              <Text style={styles.date}>
                {formatDate(itemInformation?.date)}
              </Text>
              <Text style={styles.hour}>{itemInformation?.horario}</Text>
            </View>
            {itemInformation?.gorjeta == null ? null : (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.price}>R$ {itemInformation.gorjeta}</Text>
              </View>
            )}
          </View>
          {itemInformation?.catador == null ? null : (
            <>
              <Text style={styles.subTitle}>Nome do usuário</Text>
              <View style={styles.box}>
                <Text style={styles.boxText}>
                  {itemInformation?.user_comum.user.name}
                </Text>
              </View>
            </>
          )}
          {/* {itemInformation?.catador == null ? (
            <View style={{ flexDirection: 'row' }}>
              <View>
                <Text style={styles.boxTitle}>Total</Text>
                <View style={styles.box}>
                  <Text style={styles.boxText}>
                    R${itemInformation?.valor.toFixed(2)}
                  </Text>
                </View>
              </View>
            </View>
          ) : (
            <View style={{ flexDirection: 'row' }}>
              <View>
                <Text style={styles.tokenTitle}>Token</Text>
                <View style={styles.boxToken}>
                  <Text style={styles.tokenText}>{itemInformation?.token}</Text>
                </View>
              </View>
              <View>
                <Text style={styles.tokenTitle}>Total</Text>
                <View style={styles.boxToken}>
                  <Text style={styles.tokenText}>
                    R${itemInformation?.valor.toFixed(2)}
                  </Text>
                </View>
              </View>
            </View>
          )} */}
          <Text style={styles.subTitle}>Local da coleta</Text>
          <View style={styles.box}>
            <Text style={styles.boxText}>
              {itemInformation?.address}, {itemInformation?.number},{' '}
              {itemInformation?.complement}
            </Text>
            <Text style={styles.boxText}>
              {itemInformation?.neighbourhood}, {itemInformation?.cep}
            </Text>
            <Text style={styles.boxText}>
              {itemInformation?.city} - {itemInformation?.state}
            </Text>
          </View>
          {/* <Text style={styles.boxTitle}>Data da coleta</Text>
          <View style={styles.dateBox}>
            <Text style={styles.dateText}>{date}</Text>
            <Text style={styles.dateText}>{itemInformation?.horario}</Text>
          </View> */}
          <ListResumeList cartList={itemInformation.sacolas} />

          {/* <TouchableOpacity style={styles.containerFinish} onPress={alertCancel}>
          <Text style={styles.textFinish}>CANCELAR</Text>
        </TouchableOpacity> */}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    width: '100%',
    marginBottom: 50,
    flex: 1,
    //alignItems: 'center',
    justifyContent: 'flex-end',
  },
  image: {
    resizeMode: 'contain',
    height: 150,
  },
  textBuildingContainer: {
    width: 336,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBuilding: {
    color: colors.font + 'cf',
    textAlign: 'center',
  },
  headerMenu: {
    height: 50,
    paddingLeft: 20,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  headerTitle: {
    color: colors.primary,
    fontSize: 22,
    fontWeight: '400',
    textAlign: 'center',
    paddingLeft: '19%',
  },
  box: {
    flexDirection: 'column',
    width: screenWidth * 0.8876,
    paddingVertical: 10,
    backgroundColor: colors.inputBackground,
    borderRadius: 5,
    paddingLeft: screenWidth * 0.026,
    paddingRight: screenWidth * 0.026,
    marginVertical: screenHeight * 0.0063,
    fontSize: screenHeight * 0.02,
    color: colors.font + 'cf',
    marginBottom: screenHeight * 0.018,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
  },
  boxToken: {
    flexDirection: 'column',
    width: screenWidth * 0.42,
    paddingVertical: 10,
    backgroundColor: colors.inputBackground,
    borderRadius: 5,
    paddingLeft: screenWidth * 0.073,
    paddingRight: screenWidth * 0.026,
    marginVertical: screenHeight * 0.0033,
    fontSize: screenHeight * 0.02,
    color: colors.font + 'cf',
    marginBottom: screenHeight * 0.018,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  dateBox: {
    flexDirection: 'row',
    width: screenWidth * 0.8876,
    paddingVertical: 10,
    backgroundColor: colors.inputBackground,
    borderRadius: 5,
    paddingLeft: screenWidth * 0.073,
    paddingRight: screenWidth * 0.026,
    marginVertical: screenHeight * 0.0033,
    fontSize: screenHeight * 0.02,
    color: colors.font + 'cf',
    marginBottom: screenHeight * 0.022,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    color: colors.font + 'cf',
    width: '80%',
    fontWeight: 'bold',
  },
  boxTitle: {
    paddingLeft: screenWidth * 0.079,
    color: colors.primary,
    fontSize: 16,
    alignSelf: 'flex-start',
  },
  tokenTitle: {
    paddingLeft: screenWidth * 0.052,
    color: colors.primary,
    fontSize: 16,
    alignSelf: 'flex-start',
  },
  boxText: {
    color: colors.font + 'cf',
    width: screenWidth * 0.739,
  },
  tokenText: {
    color: colors.font + 'cf',
    textAlign: 'left',
    width: '100%',
  },
  containerConfirm: {
    borderRadius: 5,
    width: screenWidth * 0.8876,
    height: 50,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: screenHeight * 0.022,
    marginBottom: screenHeight * 0.022,
  },
  textConfirm: {
    fontSize: screenHeight * 0.0205,
    fontWeight: 'bold',
    color: 'white',
  },
  totalText: {
    fontSize: 15,
    paddingHorizontal: 5,
    color: colors.accent,
    fontWeight: 'bold',
  },
  priceTag: {
    width: screenWidth * 0.893,
    justifyContent: 'flex-start',
  },
  containerFinish: {
    borderRadius: 5,
    width: screenWidth * 0.8876,
    height: 50,
    backgroundColor: colors.cancelCollect,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: screenHeight * 0.022,
    marginBottom: screenHeight * 0.022,
  },
  textFinish: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  date: {
    color: colors.font,
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'left',
    paddingLeft: screenWidth * 0.05,
  },
  hour: {
    color: colors.font,
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'left',
    paddingLeft: screenWidth * 0.05,
  },
  price: {
    color: colors.font,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'right',
  },
  informationContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 20,
    marginBottom: 20,
  },
  subTitle: {
    color: colors.font,
    fontSize: 16,
    paddingLeft: 20,
  },
});
