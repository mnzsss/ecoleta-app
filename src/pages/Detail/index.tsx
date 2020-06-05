import React from 'react';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';

import {
  Container,
  ButtonBack,
  PointImage,
  PointName,
  Button,
  ButtonText,
  PointItems,
  Address,
  AddressContent,
  AddressTitle,
  Footer,
} from './styles';

const Detail: React.FC = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <ButtonBack onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={20} color="#34cb79" />
        </ButtonBack>

        <PointImage
          source={{
            uri:
              'https://images.unsplash.com/photo-1556767576-5ec41e3239ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=40',
          }}
        />

        <PointName>Mercado do João</PointName>
        <PointItems>Lâmpadas</PointItems>

        <Address>
          <AddressTitle>Endereço</AddressTitle>
          <AddressContent>Rio do Sul, SC</AddressContent>
        </Address>
      </Container>

      <Footer>
        <Button onPress={() => {}}>
          <FontAwesome name="whatsapp" size={20} color="#fff" />
          <ButtonText>WhatsApp</ButtonText>
        </Button>
        <Button onPress={() => {}}>
          <Feather name="mail" size={20} color="#fff" />
          <ButtonText>E-mail</ButtonText>
        </Button>
      </Footer>
    </SafeAreaView>
  );
};

export default Detail;
