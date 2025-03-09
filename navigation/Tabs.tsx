import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useColorScheme} from 'react-native';
import Movies from '../screens/Movies';
import Tv from '../screens/Tv';
import Search from '../screens/Search';
import {COLORS} from '../colors';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const isDark = useColorScheme() === 'dark';
  const colors = isDark ? COLORS.dark : COLORS.light;

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.PRIMARY,
        },
        tabBarActiveTintColor: colors.ACTIVE,
        tabBarInactiveTintColor: colors.INACTIVE_TEXT,
        headerStyle: {
          backgroundColor: colors.PRIMARY,
        },
        headerTitleStyle: {
          color: colors.TEXT,
        },
      }}>
      <Tab.Screen name="Movies" component={Movies} />
      <Tab.Screen name="Tv" component={Tv} />
      <Tab.Screen name="Search" component={Search} />
    </Tab.Navigator>
  );
};

export default Tabs;
