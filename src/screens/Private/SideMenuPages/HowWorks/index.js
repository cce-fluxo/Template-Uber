import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import * as Linking from 'expo-linking';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../../../constants/theme';
import ScreensHeader from '../../../../components/common/screensHeader';
import { Feather } from '@expo/vector-icons';
import FaqAccordion from '../../../../components/common/faqAccordion';
import { useAuth } from '../../../../context/auth';

export default function HowWorksScreen({ navigation }) {
  const { user } = useAuth();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScreensHeader title={'Como funciona?'} navigation={navigation} />
      {user?.tipo == 'catador' ? (
        <ScrollView>
          <FaqAccordion
            title={'Como aceitar uma coleta?'}
            text={
              "Clique em 'Aceitar uma coleta' e escolha no mapa uma coleta disponível próxima à sua localização. \n\nEm seguida, confirme-a e verifique se a coleta foi adicionada às suas listas."
            }
          />
          <FaqAccordion
            title={'Como visualizar os detalhes uma coleta?'}
            text={
              'Para acessar informações como endereço, token e valor da coleta, basta clicar na respectiva coleta em alguma de suas listas, seja no calendário ou nas proximas coletas da tela de início'
            }
          />
          <FaqAccordion
            title={'O que é o token da coleta?'}
            text={
              'Para garantir a sua segurança a cada coleta aceita é gerado aleatoriamente um token de verificação. \n\nAssim, só é possível encerrar uma coleta fornecendo essa senha para o outro usuário'
            }
          />
          <FaqAccordion
            title={'Como visualizar meu saldo na carteira?'}
            text={
              'Na tela de início, caso seu saldo na carteira estiver coberto, basta clicar no símbolo de um olho para visualiza-lo.'
            }
          />
        </ScrollView>
      ) : (
        <ScrollView>
          <FaqAccordion
            title={'Como agendar uma coleta?'}
            text={
              "Clique em 'Agendar coleta' e escolha a quantidade, material e tamanho, e adicione ao seu carrinho de coletas clicando no símbolo de mais.\n\nApós a escolha dos itens, clique em continuar e será encaminhado a uma página de confirmação do agendamento.\n\nEmseguida, escolha o endereço, data e turno para a coleta e confirme-a."
            }
          />
          <FaqAccordion
            title={'Como uma coleta é aceita pelo catador?'}
            text={
              "Após criada uma coleta, essa passa a ser exibida no mapa fornecido aos catadores, os quais selecionado-a passa a ter um status de 'Aceita'\n\nDesse modo, o catador tem acesso ao endereço e informações da coleta para enfim efetua-la"
            }
          />
          <FaqAccordion
            title={'Como encerrar uma coleta?'}
            text={
              'Após efetuada a coleta, para encerra-la abra os detalhes dessa e clicar em encerrar. \nEm seguida, insira o código token fornecido pelo catador.\nE por fim, avalie o catador.'
            }
          />
          <FaqAccordion
            title={'Como visualizar meu saldo na carteira?'}
            text={
              'Na tela de início, caso seu saldo na carteira estiver coberto por uma tarja, basta clicar no símbolo de um olho para visualiza-lo.'
            }
          />
        </ScrollView>
      )}
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingBottom: 10,
          paddingTop: 5,
        }}
      >
        <Text style={styles.contactText}>
          Em caso de dúvidas, entre em contato com:
        </Text>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL('mailto:rafaelscarpe@gmail.com');
          }}
        >
          <Text style={styles.contactEmail}>rafaelscarpe@gmail.com</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    marginBottom: 50,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    position: 'absolute',
    left: '31%',
  },
  contactText: {
    color: colors.font,
    fontSize: 12,
  },
  contactEmail: {
    color: colors.font,
    fontSize: 12,
    textDecorationLine: 'underline',
  },
});
