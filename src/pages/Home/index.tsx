import React from 'react';
import { Feather } from '@expo/vector-icons';
import { Image } from 'react-native';
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

  return (
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
        <Button
          onPress={() => {
            navigation.navigate('Points');
          }}
        >
          <ButtonIcon>
            <Feather name="arrow-right" color="#f0f0f5" size={24} />
          </ButtonIcon>
          <ButtonText>Entrar</ButtonText>
        </Button>
      </Footer>
    </Container>
  );
};

export default Home;
