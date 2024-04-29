import { View, Text, Image, ScrollView, Linking } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../../constants/images";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import GoogleButton from "../../components/GoogleButton";
import { Link } from "expo-router";

const SignUp = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    username: "",
    confirmPassword: "",
  });
  const [isSubmitting, setisSubmitting] = useState(false);
  return (
    <SafeAreaView className="h-full">
      <ScrollView>
        <View className="flex justify-base min-h-[85vh] w-full px-5">
          <Text className="text-4xl font-bold mb-8">
            Hello! Register to get started
          </Text>
          <FormField
            title="username"
            placeholder="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mb-2"
            keyboardType="username"
          />
          <FormField
            title="email"
            placeholder="Input your Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mb-2"
            keyboardType="email-address"
          />
          <FormField
            title="password"
            placeholder="Input your Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mb-2"
            keyboardType="password"
          />
          <FormField
            title="password"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            handleChangeText={(e) => setForm({ ...form, confirmPassword: e })}
            otherStyles="mb-2"
            keyboardType="password"
          />
          <CustomButton
            title="Register"
            handlePress={() => {}}
            containerStyles=" bg-secondary rounded-[5px] min-h-[56px] justify-center items-center flex w-full mt-4 mb-10"
            textStyles="font-semibold text-lg"
          />
          <View className="flex-row justify-arround items-center h-fit w-full">
            <View className="flex-1 h-[1px] bg-[#6A707C]" />
            <Text className="w-fit text-center color-[#6A707C] font-semibold mx-2">
              Or
            </Text>
            <View className="flex-1 h-[1px] bg-[#6A707C]" />
          </View>
          <GoogleButton title="Register with Google" />
          <View className="w-full flex-row justify-center items-center mt-16">
            <Text>Already have an account? </Text>
            <Link href="/sign-in" className="color-secondary font-semibold">
              Login Now
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
