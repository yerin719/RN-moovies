import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

type RootStackParamList = {
  Stack: {screen: string};
};

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

const Movies = ({navigation: {navigate}}: Props) => (
  <TouchableOpacity
    onPress={() => navigate('Stack', {screen: 'Three'})}
    style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text>Movies</Text>
  </TouchableOpacity>
);
export default Movies;
