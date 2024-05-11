import { useState } from "react";
import { router, usePathname } from "expo-router";
import { View, TouchableOpacity, Image, TextInput, Alert } from "react-native";

import icons from "../constants/icons";

const SearchInput = ({ initialQuery }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");

  return (
    <View className="flex-row items-center bg-gray-100 space-x-2 w-full h-11 px-4 rounded-full">
      <TouchableOpacity
        onPress={() => {
          if (query === "")
            return Alert.alert(
              "Missing Query",
              "Please input something to search results across database"
            );
          if (pathname.startsWith("/search")) router.setParams({ query });
          else router.push(`/search/${query}`);
        }}
      >
        <Image source={icons.search} className="w-6 h-6" resizeMode="contain" />
      </TouchableOpacity>
      <TextInput
        className="text-base mt-0.5  flex-1 font-regular"
        value={query}
        placeholder="Search for project"
        placeholderTextColor="#585C61"
        onChangeText={(e) => setQuery(e)}
      />
    </View>
  );
};

export default SearchInput;
