import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { useState } from "react";
import { useAuth } from "../../context/authContext";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "../../components/SearchInput";
import icons from "../../constants/icons";
import EmptyState from "../../components/EmptyState";

const Projects = () => {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <SafeAreaView className="bg-white w-full h-full flex">
      <FlatList
        data={[
          { id: 1, key: 1 },
          { id: 2, key: 1 },
          { id: 3, key: 3 },
        ]}
        // data={[]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text className="">{item.id}</Text>
          </View>
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
        ListEmptyComponent={() => (
          <EmptyState
            title="No projects found"
            subtitle="Be the first one to upload a project"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Projects;
