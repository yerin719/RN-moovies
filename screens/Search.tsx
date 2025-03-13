import React from 'react';
import {View, Text, useColorScheme} from 'react-native';
import {COLORS} from '../colors';

const Search = () => {
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
      <Text style={{color: colors.TEXT}}>Search</Text>
    </View>
  );
};

export default Search;
