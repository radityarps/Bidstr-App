import { Text, View } from "react-native";
import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import React, { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, fontError] = useFonts({
    "Monserrat-Regular": require("../assets/fonts/Montserrat-Regular.ttf"),
    "Monserrat-Medium": require("../assets/fonts/Montserrat-Medium.ttf"),
    "Monserrat-SemiBold": require("../assets/fonts/Montserrat-SemiBold.ttf"),
    "Monserrat-Bold": require("../assets/fonts/Montserrat-Bold.ttf"),
    "Monserrat-Italic": require("../assets/fonts/Montserrat-Italic.ttf"),
  });

  useEffect(() => {
    if (fontError) throw fontError;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
};

export default RootLayout;
