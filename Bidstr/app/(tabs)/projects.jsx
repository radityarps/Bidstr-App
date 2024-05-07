import { View, Text, Pressable } from "react-native";
import React from "react";
import { useAuth } from "../../context/authContext";
import { useRouter } from "expo-router";

const Projects = () => {
  const router = useRouter();
  const { logout } = useAuth();
  const handleLogout = async () => {
    await logout();
    router.push("/");
  };
  return (
    <View className="flex-1 items-center justify-center">
      <Text>Projects</Text>
      <Pressable onPress={handleLogout}>
        <Text>Logout</Text>
      </Pressable>
    </View>
  );
};

export default Projects;
