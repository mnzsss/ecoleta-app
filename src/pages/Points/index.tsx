import React, { useCallback, useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SvgUri } from 'react-native-svg';
import { ScrollView } from 'react-native-gesture-handler';
import * as Location from 'expo-location';
import { Alert } from 'react-native';

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

interface Point {
  id: number;
  image: string;
  name: string;
  latitude: number;
  longitude: number;
}

const Points: React.FC = () => {
  const navigation = useNavigation();

  const [items, setItems] = useState<Item[]>([]);
  const [points, setPoints] = useState<Point[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);

  useEffect(() => {
    async function loadCurrentPosition(): Promise<void> {
      const { status } = await Location.requestPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert(
          'Ops!',
          'Precisamos de sua permissão para obter a localização',
        );

        return;
      }

      const location = await Location.getCurrentPositionAsync();

      const { latitude, longitude } = location.coords;

      setInitialPosition([latitude, longitude]);
    }

    loadCurrentPosition();
  }, []);

  useEffect(() => {
    async function loadItems(): Promise<void> {
      const { data } = await api.get('items');

      setItems(data);
    }

    loadItems();
  }, []);

  useEffect(() => {
    async function loadPoints(): Promise<void> {
      const { data } = await api.get('points', {
        params: {
          city: 'São Paulo',
          uf: 'SP',
          items: [1, 2],
        },
      });

      setPoints(data);
    }

    loadPoints();
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

  const handlePointDetail = useCallback(
    (id: number) => {
      navigation.navigate('Detail', { point_id: id });
    },
    [navigation],
  );

  return (
    <>
      <Container>
        <ButtonBack onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={20} color="#34cb79" />
        </ButtonBack>

        <Title>Bem vindo.</Title>
        <Description>Encontre no mapa um ponto de coleta.</Description>

        <MapContainer>
          {initialPosition[0] !== 0 && (
            <Map
              initialRegion={{
                latitude: initialPosition[0],
                longitude: initialPosition[1],
                latitudeDelta: 0.014,
                longitudeDelta: 0.014,
              }}
            >
              {points.map(point => (
                <MapMarker
                  onPress={() => handlePointDetail(point.id)}
                  coordinate={{
                    latitude: point.latitude,
                    longitude: point.longitude,
                  }}
                  key={String(point.id)}
                >
                  <MapMarkerContainer>
                    <MapMarkerImage
                      resizeMode="cover"
                      source={{
                        uri: point.image,
                      }}
                    />
                    <MapMarkerTitle>{point.name}</MapMarkerTitle>
                  </MapMarkerContainer>
                </MapMarker>
              ))}
            </Map>
          )}
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
