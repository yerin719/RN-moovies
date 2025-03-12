import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import styled from 'styled-components/native';

const Button = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.mainBgColor};
`;

const Title = styled.Text`
  color: blue;
  font-size: 20px;
  font-weight: bold;
  color: ${props => props.theme.textColor};
`;

const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = ({
  navigation: {navigate},
}) => (
  <Button onPress={() => navigate('Stack', {screen: 'Three'})}>
    <Title>Movies</Title>
  </Button>
);
export default Movies;
