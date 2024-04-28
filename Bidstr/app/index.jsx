import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, View, Image } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import images from "../constants/images";
import CustomButton from "../components/CustomButton";

export default function App() {
  return (
    <SafeAreaView clasName="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "100%",
            width: "100%",
            paddingLeft: 16,
            paddingRight: 16,
          }}
        >
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
            handlePress={() => {}}
            containerStyles=" bg-secondary rounded-[5px] min-h-[56px] justify-center items-center flex w-full mt-20"
          />
          <CustomButton
            title="Register"
            handlePress={() => {}}
            containerStyles=" bg-transparent border rounded-[5px] min-h-[56px] justify-center items-center flex w-full mt-4"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
