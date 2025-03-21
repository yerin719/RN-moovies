import React from 'react';
import {useState, useEffect, useCallback} from 'react';
import {Text, Image, View, useColorScheme} from 'react-native';
import {darkTheme, lightTheme} from './styled';
import {ThemeProvider} from 'styled-components/native';

// Navigation
import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

// Expo
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import {Asset} from 'expo-asset';
import {Ionicons} from '@expo/vector-icons';
import Root from './navigation/Root';

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

const queryClient = new QueryClient();

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

  const isDark = useColorScheme() === 'dark';

  if (!appIsReady) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <NavigationContainer>
          <Root />
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
