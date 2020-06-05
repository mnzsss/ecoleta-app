import React, { useCallback } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SvgUri } from 'react-native-svg';

import { ScrollView } from 'react-native-gesture-handler';
import {
  Container,
  ButtonBack,
  Title,
  Description,
  MapContainer,
  Map,
  ItemsContainer,
  Item,
  ItemTitle,
  MapMarker,
  MapMarkerImage,
  MapMarkerContainer,
  MapMarkerTitle,
} from './styles';

const Points: React.FC = () => {
  const navigation = useNavigation();

  const handlePointDetail = useCallback(() => {
    navigation.navigate('Detail');
  }, [navigation]);

  return (
    <>
      <Container>
        <ButtonBack onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={20} color="#34cb79" />
        </ButtonBack>

        <Title>Bem vindo.</Title>
        <Description>Encontre no mapa um ponto de coleta.</Description>

        <MapContainer>
          <Map
            initialRegion={{
              latitude: -23.6100655,
              longitude: -46.5538262,
              latitudeDelta: 0.014,
              longitudeDelta: 0.014,
            }}
          >
            <MapMarker
              onPress={handlePointDetail}
              coordinate={{ latitude: -23.6100655, longitude: -46.5538262 }}
            >
              <MapMarkerContainer>
                <MapMarkerImage
                  resizeMode="cover"
                  source={{
                    uri:
                      'https://images.unsplash.com/photo-1556767576-5ec41e3239ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=40',
                  }}
                />
                <MapMarkerTitle>Mercado</MapMarkerTitle>
              </MapMarkerContainer>
            </MapMarker>
          </Map>
        </MapContainer>
      </Container>

      <ItemsContainer>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 32 }}
        >
          <Item onPress={() => {}}>
            <SvgUri
              width={42}
              height={42}
              uri="http://192.168.0.5:3333/uploads/organicos.svg"
            />
            <ItemTitle>Lâmpadas</ItemTitle>
          </Item>
          <Item onPress={() => {}}>
            <SvgUri
              width={42}
              height={42}
              uri="http://192.168.0.5:3333/uploads/organicos.svg"
            />
            <ItemTitle>Lâmpadas</ItemTitle>
          </Item>
          <Item onPress={() => {}}>
            <SvgUri
              width={42}
              height={42}
              uri="http://192.168.0.5:3333/uploads/organicos.svg"
            />
            <ItemTitle>Lâmpadas</ItemTitle>
          </Item>
          <Item onPress={() => {}}>
            <SvgUri
              width={42}
              height={42}
              uri="http://192.168.0.5:3333/uploads/organicos.svg"
            />
            <ItemTitle>Lâmpadas</ItemTitle>
          </Item>
          <Item onPress={() => {}}>
            <SvgUri
              width={42}
              height={42}
              uri="http://192.168.0.5:3333/uploads/organicos.svg"
            />
            <ItemTitle>Lâmpadas</ItemTitle>
          </Item>
          <Item onPress={() => {}}>
            <SvgUri
              width={42}
              height={42}
              uri="http://192.168.0.5:3333/uploads/organicos.svg"
            />
            <ItemTitle>Lâmpadas</ItemTitle>
          </Item>
          <Item onPress={() => {}}>
            <SvgUri
              width={42}
              height={42}
              uri="http://192.168.0.5:3333/uploads/organicos.svg"
            />
            <ItemTitle>Lâmpadas</ItemTitle>
          </Item>
        </ScrollView>
      </ItemsContainer>
    </>
  );
};

export default Points;
