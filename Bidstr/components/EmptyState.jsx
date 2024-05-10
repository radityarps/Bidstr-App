import { router } from "expo-router";
import { View, Text, Image } from "react-native";

import images from "../constants/images";
import CustomButton from "./CustomButton";

const EmptyState = ({ title, subtitle }) => {
  return (
    <View className="flex justify-center items-center px-4">
      <Image
        source={images.empty}
        resizeMode="contain"
        className="w-[270px] h-[216px]"
      />

      <Text className="text-sm font-medium ">{title}</Text>
      <Text className="text-xl text-center font-semibold  mt-2">
        {subtitle}
      </Text>
    </View>
  );
};

export default EmptyState;
