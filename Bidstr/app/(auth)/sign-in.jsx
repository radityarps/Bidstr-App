import { View, Text, Image, ScrollView, Alert } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../../constants/images";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import GoogleButton from "../../components/GoogleButton";
import { Link } from "expo-router";
import Loading from "../../components/Loading";
import { useAuth } from "../../context/authContext";

const SignIn = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isSubmitting, setisSubmitting] = useState(false);

  const { login } = useAuth();

  const submit = async () => {
    // Check if all fields are filled
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    // set for loading state
    setisSubmitting(true);

    const formData = {
      email: form.email,
      password: form.password,
    };
    // Remove undefined value
    Object.keys(formData).forEach((key) => {
      if (formData[key] === undefined) {
        delete formData[key];
      }
    });

    // Login
    let response = await login(formData.email, formData.password);

    setisSubmitting(false);

    if (!response.success) {
      Alert.alert("Error", response.msg);
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

          {/* Input email field */}
          <FormField
            title="email"
            placeholder="Input your Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="top-[-50px]"
            keyboardType="email-address"
          />
          {/* Input password field */}
          <FormField
            title="password"
            placeholder="Input your Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="top-[-40px]"
            keyboardType="password"
          />

          {/* Forget Password */}
          <View className="my-2 top-[-35px]">
            <Link
              href=""
              className="text-right font-semibold color-[#6A707C] text-xs"
            >
              Forget Password?
            </Link>
          </View>

          {/* Submit Button */}
          {isSubmitting ? (
            <View className="bg-secondary rounded-[5px] min-h-[56px] justify-center items-center flex w-full top-[-20px]">
              <Loading size={50} />
            </View>
          ) : (
            <CustomButton
              title="Login"
              handlePress={submit}
              containerStyles=" bg-secondary rounded-[5px] min-h-[56px] justify-center items-center flex w-full top-[-20px]"
              textStyles="font-semibold text-lg"
            />
          )}

          <View className="flex-row justify-arround items-center h-fit w-full">
            <View className="flex-1 h-[1px] bg-[#6A707C]" />
            <Text className="w-fit text-center color-[#6A707C] font-semibold mx-2">
              Or
            </Text>
            <View className="flex-1 h-[1px] bg-[#6A707C]" />
          </View>

          {/* Google button */}
          <GoogleButton title="Login with Google" />

          {/* Register */}
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
