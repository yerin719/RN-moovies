import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  Text,
  View,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type RootStackParamList = {
  Tabs: {screen: string};
  One: undefined;
  Two: undefined;
  Three: undefined;
};

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

const NativeStack = createNativeStackNavigator();

const Stack = () => (
  <NativeStack.Navigator screenOptions={{presentation: 'modal'}}>
    <NativeStack.Screen name="One" component={ScreenOne} />
    <NativeStack.Screen name="Two" component={ScreenTwo} />
    <NativeStack.Screen name="Three" component={ScreenThree} />
  </NativeStack.Navigator>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#1e272e',
    padding: 10,
    borderRadius: 5,
    minWidth: 120,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

const ScreenOne = ({navigation}: Props) => (
  <View style={styles.container}>
    <Pressable style={styles.button} onPress={() => navigation.navigate('Two')}>
      <Text style={styles.buttonText}>Go to Two</Text>
    </Pressable>
  </View>
);

const ScreenTwo = ({navigation}: Props) => (
  <View style={styles.container}>
    <Pressable
      style={styles.button}
      onPress={() => navigation.navigate('Three')}>
      <Text style={styles.buttonText}>Go to Three</Text>
    </Pressable>
  </View>
);

const ScreenThree = ({navigation}: Props) => (
  <TouchableOpacity
    onPress={() => navigation.navigate('Tabs', {screen: 'Search'})}>
    <Text>Go to search</Text>
  </TouchableOpacity>
);

export default Stack;
