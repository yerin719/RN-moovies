import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Tabs from './Tabs';
import Stack from './Stack';

const Nav = createNativeStackNavigator();

const Root = () => {
  return (
    <Nav.Navigator screenOptions={{headerShown: false}}>
      <Nav.Screen name="Tabs" component={Tabs} />
      <Nav.Screen
        name="Stack"
        component={Stack}
        options={{
          presentation: 'modal',
          animation: 'slide_from_bottom',
        }}
      />
    </Nav.Navigator>
  );
};
export default Root;
