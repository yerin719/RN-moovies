import React from 'react';
import {useState, useEffect, useCallback} from 'react';
import * as SplashScreen from 'expo-splash-screen';
import {Text, Image, View} from 'react-native';
import * as Font from 'expo-font';

import {Ionicons} from '@expo/vector-icons';
import {Asset} from 'expo-asset';

SplashScreen.preventAutoHideAsync();

const loadFonts = (fonts: {[x: string]: any}[]) =>
  fonts.map(font => Font.loadAsync(font));

const loadImages = (images: (string | number)[]) =>
  images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.loadAsync(image);
    }
  });

function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        const fonts = loadFonts([Ionicons.font]);
        const images = loadImages([require('./assets/hart.jpg')]);
        await Promise.all([...fonts, ...images]);
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
    <View onLayout={onLayoutRootView}>
      <Text>App is ready!</Text>
    </View>
  );
}

export default App;
