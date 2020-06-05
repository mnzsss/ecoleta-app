import React, { useEffect, useState, useCallback } from 'react';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView, ActivityIndicator } from 'react-native';
import * as MailComposer from 'expo-mail-composer';

import { Linking } from 'expo';
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
import api from '../../services/api';

interface DetailParams {
  point_id: number;
}

interface DataProps {
  image: string;
  name: string;
  email: string;
  whatsapp: string;
  city: string;
  uf: string;
  items: { title: string }[];
}

const Detail: React.FC = () => {
  const navigation = useNavigation();
  const { params } = useRoute();

  const [pointData, setPointData] = useState<DataProps>({} as DataProps);

  const { point_id } = params as DetailParams;

  useEffect(() => {
    async function loadPoint(): Promise<void> {
      const { data } = await api.get(`points/${point_id}`);

      setPointData(data);
    }

    loadPoint();
  }, [point_id]);

  const handleComposeMail = useCallback(() => {
    MailComposer.composeAsync({
      subject: 'Interesse na Coleta de Resíduos',
      recipients: [pointData.email],
    });
  }, [pointData.email]);

  const handleWhatsApp = useCallback(() => {
    Linking.openURL(
      `whatsapp://send?phone=${pointData.whatsapp}&text=Tenho interesse sobre coleta de resíduos.`,
    );
  }, [pointData.whatsapp]);

  if (!pointData) {
    return <ActivityIndicator />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <ButtonBack onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={20} color="#34cb79" />
        </ButtonBack>

        <PointImage
          source={{
            uri: pointData.image,
          }}
        />

        <PointName>{pointData.name}</PointName>
        <PointItems>
          {pointData.items?.map(item => item.title).join(', ')}
        </PointItems>

        <Address>
          <AddressTitle>Endereço</AddressTitle>
          <AddressContent>
            {`${pointData.city}, ${pointData.uf}`}
          </AddressContent>
        </Address>
      </Container>

      <Footer>
        <Button onPress={handleWhatsApp}>
          <FontAwesome name="whatsapp" size={20} color="#fff" />
          <ButtonText>WhatsApp</ButtonText>
        </Button>
        <Button onPress={handleComposeMail}>
          <Feather name="mail" size={20} color="#fff" />
          <ButtonText>E-mail</ButtonText>
        </Button>
      </Footer>
    </SafeAreaView>
  );
};

export default Detail;
