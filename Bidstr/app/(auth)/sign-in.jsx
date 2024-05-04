import { View, Text, Image, ScrollView, Linking, Alert } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../../constants/images";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import GoogleButton from "../../components/GoogleButton";
import { Link } from "expo-router";
import axios from "axios";

const SignIn = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isSubmitting, setisSubmitting] = useState(false);
  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }
    setisSubmitting(true);
    const email = form.email;
    const password = form.password;
    try {
      // await axios
      //   .post("http://localhost:3000/auth/sign-in", { email, password })
      //   .then((data) => {
      //     if (!data) return;
      //     console.log(data);
      //   });
      fetch("http://localhost:3000/auth/sign-in", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
        },
        body: JSON.stringify(form),
      })
        .catch((err) => {
          return;
        })
        .then((res) => {
          if (!res || !res.ok || res.status >= 400) {
            return;
          }
          return res.json();
        })
        .then((data) => {
          if (!data) return;
          console.log(data);
        });
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setisSubmitting(false);
    }
  };
  return (
    <SafeAreaView className="h-full">
      <ScrollView>
        <View className="flex justify-center min-h-[85vh] w-full px-5">
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
            handlePress={submit}
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
          <GoogleButton title="Login with Google" />
          <View className="w-full flex-row justify-center items-center mt-16">
            <Text>Don't have an account? </Text>
            <Link href="/sign-up" className="color-secondary font-semibold">
              Register Now
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
