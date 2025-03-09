import React from 'react';
import {useState, useEffect, useCallback} from 'react';
import * as SplashScreen from 'expo-splash-screen';
import {Text, Image, View} from 'react-native';
import * as Font from 'expo-font';

import {Ionicons} from '@expo/vector-icons';
import {Asset} from 'expo-asset';

SplashScreen.preventAutoHideAsync();

function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync(Ionicons.font);
        await Asset.loadAsync(require('./assets/hart.jpg'));
        // await Image.prefetch('링크');
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      try {
        await SplashScreen.hideAsync();
      } catch (e) {
        console.warn('Error hiding splash screen:', e);
      }
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
      }}
      onLayout={onLayoutRootView}>
      <Text>App is ready!</Text>
    </View>
  );
}

export default App;
