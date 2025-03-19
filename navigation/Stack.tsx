import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Detail from '../screens/Detail';
import {COLORS} from '../colors';
import {useColorScheme} from 'react-native';

const NativeStack = createNativeStackNavigator();

const Stack = () => {
  const isDark = useColorScheme() === 'dark';
  const colors = isDark ? COLORS.dark : COLORS.light;

  return (
    <NativeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.PRIMARY,
        },
        headerTitleStyle: {
          color: colors.TEXT,
        },
      }}>
      <NativeStack.Screen name="Detail" component={Detail} />
    </NativeStack.Navigator>
  );
};

export default Stack;
