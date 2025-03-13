import React from 'react';
import {View, Text, useColorScheme} from 'react-native';
import {COLORS} from '../colors';

const Tv = () => {
  const isDark = useColorScheme() === 'dark';
  const colors = isDark ? COLORS.dark : COLORS.light;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.PRIMARY,
      }}>
      <Text style={{color: colors.TEXT}}>TV</Text>
    </View>
  );
};

export default Tv;
