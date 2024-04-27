import { Text, View } from "react-native";
import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import React, { useEffect } from "react";

// SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  // const [fontsLoaded, fontError] = useFonts({
  //   "Monserrat-Regular": require("../assets/fonts/Montserrat-VariableFont_wght.ttf"),
  // });

  // useEffect(() => {
  //   if (fontError) throw fontError;
  //   if (fontsLoaded) SplashScreen.hideAsync();
  // }, [fontsLoaded, fontError]);

  // if (!fontsLoaded && !fontError) {
  //   return null;
  // }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
};

export default RootLayout;
