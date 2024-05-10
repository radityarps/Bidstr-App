import { View, Text } from "react-native";
import { Stack } from "expo-router";
import HeaderBackButton from "../../components/HeaderBackButton";

const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="sign-in"
          options={{
            headerShown: true,
            title: "",
            headerStyle: {
              height: "max",
            },
            headerShadowVisible: false,
            headerLeft: () => <HeaderBackButton />,
          }}
        />
        <Stack.Screen
          name="sign-up"
          options={{
            headerShown: true,
            title: "",
            headerStyle: {
              height: "max",
            },
            headerShadowVisible: false,
            headerLeft: () => <HeaderBackButton />,
          }}
        />
        <Stack.Screen
          name="otp-verify"
          options={{
            headerShown: true,
            title: "",
            headerStyle: {
              backgroundColor: "transparent",
            },
            headerShadowVisible: false,
            headerLeft: () => <HeaderBackButton />,
          }}
        />
      </Stack>
    </>
  );
};

export default AuthLayout;
