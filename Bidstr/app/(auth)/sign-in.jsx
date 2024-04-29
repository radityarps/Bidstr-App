import { View, Text, Image, ScrollView, Linking } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../../constants/images";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import GoogleButton from "../../components/GoogleButton";
import { Link } from "expo-router";

const SignIn = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isSubmitting, setisSubmitting] = useState(false);
  return (
    <SafeAreaView className="h-full">
      <ScrollView>
        <View className="flex justify-center h-full w-full px-5">
          <Text className="text-4xl font-bold">Welcome to</Text>
          <Text className="text-4xl font-bold">Bidstr</Text>
          <Image
            source={images.login}
            resizeMode="contain"
            className="w-full h-[200px] top-[-50px]"
          />
          <FormField
            title="email"
            placeholder="Input your Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="top-[-50px]"
            keyboardType="email-address"
          />
          <FormField
            title="password"
            placeholder="Input your Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="top-[-40px]"
            keyboardType="password"
          />
          <View className="my-2 top-[-35px]">
            <Link
              href=""
              className="text-right font-semibold color-[#6A707C] text-xs"
            >
              Forget Password?
            </Link>
          </View>
          <CustomButton
            title="Login"
            handlePress={() => {}}
            containerStyles=" bg-secondary rounded-[5px] min-h-[56px] justify-center items-center flex w-full top-[-20px]"
            textStyles="font-semibold text-lg"
          />
          <View className="flex-row justify-arround items-center h-fit w-full">
            <View className="flex-1 h-[1px] bg-[#6A707C]" />
            <Text className="w-fit text-center color-[#6A707C] font-semibold mx-2">
              Or
            </Text>
            <View className="flex-1 h-[1px] bg-[#6A707C]" />
          </View>
          <GoogleButton />
          <View className="w-full flex-row justify-center items-center mt-16">
            <Text>Don't have an account? </Text>
            <Link href="" className="color-secondary font-semibold">
              Register Now
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
