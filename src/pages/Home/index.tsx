import React, { useEffect, useState, useCallback } from 'react';
import { Feather } from '@expo/vector-icons';
import { Image, KeyboardAvoidingView, Platform } from 'react-native';
import RNPickerSelect, { Item } from 'react-native-picker-select';
import axios from 'axios';

import { useNavigation } from '@react-navigation/native';

import {
  Container,
  Main,
  Title,
  Description,
  Footer,
  Button,
  ButtonIcon,
  ButtonText,
} from './styles';

const Home: React.FC = () => {
  const navigation = useNavigation();

  const [ufs, setUfs] = useState<Item[]>([]);
  const [cities, setCities] = useState<Item[]>([]);

  const [selectedUf, setSelectedUf] = useState(0);
  const [selectedCity, setSelectedCity] = useState(0);

  useEffect(() => {
    async function loadUfs(): Promise<void> {
      const { data } = await axios.get(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
      );

      const parsedUfs = data.map((uf: any) => {
        return {
          key: uf.id,
          value: uf.sigla,
          label: uf.sigla,
        };
      });

      setUfs(parsedUfs);
    }

    loadUfs();
  }, []);

  useEffect(() => {
    async function loadCity(): Promise<void> {
      const { data } = await axios.get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`,
      );

      const parsedCities = data.map((city: City) => {
        return {
          key: city.id,
          value: city.nome,
          label: city.nome,
        };
      });

      setCities(parsedCities);
    }

    loadCity();
  }, [selectedUf]);

  const handleSelectUf = useCallback((value: number) => {
    setSelectedUf(value);
  }, []);

  const handleSelectCity = useCallback((value: number) => {
    setSelectedCity(value);
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Container
        source={require('../../assets/home-background.png')}
        imageStyle={{
          width: 274,
          height: 368,
        }}
      >
        <Main>
          <Image source={require('../../assets/logo.png')} />

          <Title>Seu marketplace de coleta de resíduos.</Title>
          <Description>
            Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.
          </Description>
        </Main>

        <Footer>
          <RNPickerSelect
            placeholder={{
              label: 'Selecione um Estado',
            }}
            onValueChange={value => handleSelectUf(value)}
            items={ufs}
            style={{
              inputIOSContainer: {
                height: 60,
                backgroundColor: '#fff',
                borderRadius: 8,
                justifyContent: 'center',
                paddingHorizontal: 20,
                marginBottom: 20,
              },
              iconContainer: { right: 20, top: 20 },
              placeholder: {
                color: '#6c6c80',
                fontSize: 16,
                fontFamily: 'Roboto_400Regular',
              },
              inputIOS: {
                fontSize: 20,
                color: '#322153',
                fontWeight: 'bold',
              },
              inputAndroid: {
                fontSize: 20,
                color: '#322153',
                fontWeight: 'bold',
              },
            }}
            value={selectedUf}
            Icon={() => (
              <Feather name="chevron-down" size={24} color="#6c6c80" />
            )}
          />

          <RNPickerSelect
            disabled={!selectedUf}
            placeholder={{
              label: 'Selecione uma Cidade',
            }}
            onValueChange={value => handleSelectCity(value)}
            items={cities}
            style={{
              inputIOSContainer: {
                height: 60,
                backgroundColor: '#fff',
                borderRadius: 8,
                justifyContent: 'center',
                paddingHorizontal: 20,
                marginBottom: 20,
              },
              inputAndroidContainer: {
                height: 60,
                backgroundColor: '#fff',
                borderRadius: 8,
                justifyContent: 'center',
                paddingHorizontal: 20,
                marginBottom: 20,
              },
              iconContainer: { right: 20, top: 20 },
              placeholder: {
                color: '#6c6c80',
                fontSize: 16,
                fontFamily: 'Roboto_400Regular',
              },
              inputIOS: {
                fontSize: 20,
                color: '#322153',
                fontWeight: 'bold',
              },
              inputAndroid: {
                fontSize: 20,
                color: '#322153',
                fontWeight: 'bold',
              },
            }}
            value={selectedCity}
            Icon={() => (
              <Feather name="chevron-down" size={24} color="#6c6c80" />
            )}
          />

          <Button
            onPress={() => {
              navigation.navigate('Points', {
                uf: selectedUf,
                city: selectedCity,
              });
            }}
          >
            <ButtonIcon>
              <Feather name="arrow-right" color="#f0f0f5" size={24} />
            </ButtonIcon>
            <ButtonText>Entrar</ButtonText>
          </Button>
        </Footer>
      </Container>
    </KeyboardAvoidingView>
  );
};

export default Home;
