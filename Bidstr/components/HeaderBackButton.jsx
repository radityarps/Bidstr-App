import { TouchableOpacity, Text, Image, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import icons from "../constants/icons";

const HeaderBackButton = ({ title, isLoading }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      activeOpacity={0.7}
      className={` bg-secondary w-10 h-10 flex justify-center rounded-xl items-center ${
        isLoading ? "opacity-50" : ""
      }`}
      disabled={isLoading}
    >
      <Image source={icons.back} resizeMode="contain" className="w-5 h-5" />
    </TouchableOpacity>
  );
};

export default HeaderBackButton;
