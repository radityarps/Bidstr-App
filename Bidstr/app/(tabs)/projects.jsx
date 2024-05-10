import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { useAuth } from "../../context/authContext";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "../../components/SearchInput";
import icons from "../../constants/icons";

const Projects = () => {
  const router = useRouter();
  const { logout } = useAuth();
  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <SafeAreaView className="bg-white w-full h-full">
      <FlatList
        data={[{ id: 1 }, { id: 2 }, { id: 3 }]}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <Text className="text-center">{item.id}</Text>
        )}
        ListHeaderComponent={
          <View className="flex-row justify-between grid gap-x-1 items-center w-[90%] px-2">
            <SearchInput />
            <View className="flex flex-row items-center justify-center bg-third p-2 rounded-full">
              <TouchableOpacity>
                <Image
                  source={icons.filter}
                  className="w-6 h-6"
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default Projects;
