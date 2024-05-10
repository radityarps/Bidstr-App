import { View, Image, Text, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import icons from "../constants/icons";

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [showPassword, setshowPassword] = useState(false);
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <View className="w-full flex-row items-center h-14 bg-gray-100 px-4 border-1 border-gray-200 rounded-lg">
        <TextInput
          className="flex-1 text-black font-medium text-base"
          value={value}
          placeholder={placeholder}
          onChangeText={handleChangeText}
          secureTextEntry={title === "password" && !showPassword}
        />

        {title === "password" && (
          <TouchableOpacity onPress={() => setshowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyehide}
              className="w-5 h-5"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
