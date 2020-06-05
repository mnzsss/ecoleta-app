import React, { useCallback, useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SvgUri } from 'react-native-svg';
import { ScrollView } from 'react-native-gesture-handler';

import api from '../../services/api';

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

interface Item {
  id: number;
  name: string;
  image_url: string;
}

const Points: React.FC = () => {
  const navigation = useNavigation();

  const [items, setItems] = useState<Item[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  useEffect(() => {
    async function loadItems(): Promise<void> {
      const { data } = await api.get('items');

      setItems(data);
    }

    loadItems();
  }, []);

  const handleSelectItem = useCallback(
    (id: number) => {
      const alreadySelected = selectedItems.findIndex(item => item === id);

      if (alreadySelected >= 0) {
        const filteredItems = selectedItems.filter(item => item !== id);

        setSelectedItems(filteredItems);
      } else {
        setSelectedItems(old => [...old, id]);
      }
    },
    [selectedItems],
  );

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
          {items.map(item => (
            <Item
              onPress={() => handleSelectItem(item.id)}
              key={String(item.id)}
              activeOpacity={0.6}
              selected={!!selectedItems.includes(item.id)}
            >
              <SvgUri width={42} height={42} uri={item.image_url} />
              <ItemTitle>{item.name}</ItemTitle>
            </Item>
          ))}
        </ScrollView>
      </ItemsContainer>
    </>
  );
};

export default Points;
