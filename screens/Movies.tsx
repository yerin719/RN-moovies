import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';

type RootStackParamList = {
  Stack: {screen: string};
};

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

const Button = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  color: blue;
  font-size: 20px;
  font-weight: bold;
`;

const Movies = ({navigation: {navigate}}: Props) => (
  <Button onPress={() => navigate('Stack', {screen: 'Three'})}>
    <Title>Movies</Title>
  </Button>
);
export default Movies;
