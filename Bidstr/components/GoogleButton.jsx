import { TouchableOpacity, Text, Image, View } from "react-native";
import React from "react";
import Images from "../constants/images";
import images from "../constants/images";

const GoogleButton = ({ title, containerStyles, isLoading }) => {
  return (
    <TouchableOpacity
      onPress={() => {}}
      activeOpacity={0.7}
      className={`${containerStyles} flex-row mt-5 bg-transparent border-[0.2px] rounded-[5px] min-h-[56px] justify-center items-center w-full"
            textStyles="font-semibold text-l ${isLoading ? "opacity-50" : ""}`}
      disabled={isLoading}
    >
      <View className="flex-row w-full justify-center items-center gap-4">
        <Image
          source={images.googleLogo}
          resizeMode="contain"
          className="w-7 h-7"
        />
        <Text className="text-lg font-medium">{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default GoogleButton;
