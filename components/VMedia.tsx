import React from 'react';
import styled from 'styled-components/native';
import Poster from './Poster';
import Votes from './Votes';
import {useColorScheme, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const Movie = styled.View`
  align-items: center;
`;

const Title = styled.Text<{isDark: boolean}>`
  color: ${props => (props.isDark ? 'white' : props.theme.textColor)};
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;

interface VMediaProps {
  posterPath: string;
  originalTitle: string;
  voteAverage: number;
}

// Define the navigation type
type RootStackParamList = {
  Stack: {
    screen: string;
  };
};

const VMedia: React.FC<VMediaProps> = ({
  posterPath,
  originalTitle,
  voteAverage,
}) => {
  const isDark = useColorScheme() === 'dark';

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const goToDetail = () => {
    navigation.navigate('Stack', {screen: 'Detail'});
  };

  return (
    <TouchableOpacity onPress={goToDetail}>
      <Movie>
        <Poster path={posterPath} />
        <Title isDark={isDark}>
          {originalTitle.slice(0, 12)}
          {originalTitle.length > 12 ? '...' : null}
        </Title>
        <Votes votes={voteAverage} />
      </Movie>
    </TouchableOpacity>
  );
};

export default VMedia;
