import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, View, Image } from "react-native";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import images from "../constants/images";
import CustomButton from "../components/CustomButton";

export default function App() {
  return (
    <SafeAreaView clasName="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="flex-col justify-center items-center min-h-[85vh] w-full px-4">
          <Image
            source={images.welcome}
            resizeMode="contain"
            className="w-[90%] h-[50%] mb-8"
          />
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[80%] h-fit"
          />
          <Text>Make your project realized</Text>
          <CustomButton
            title="Login"
            handlePress={() => {
              router.push("(auth)/sign-in");
            }}
            containerStyles=" bg-secondary rounded-[5px] min-h-[56px] justify-center items-center flex w-full mt-20"
            textStyles="font-semibold text-lg"
          />
          <CustomButton
            title="Register"
            handlePress={() => {
              router.push("(auth)/sign-up");
            }}
            containerStyles=" bg-transparent border rounded-[5px] min-h-[56px] justify-center items-center flex w-full mt-4"
            textStyles="font-semibold text-lg"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
