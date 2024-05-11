import { View, Text, Image, ScrollView, Linking, Alert } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../../constants/images";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import GoogleButton from "../../components/GoogleButton";
import { Link, router } from "expo-router";
import { useAuth } from "../../context/authContext";
import Loading from "../../components/Loading";

const SignUp = () => {
  // Form state
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });
  // Submit state
  const [isSubmitting, setisSubmitting] = useState(false);
  // Auth context
  const { register } = useAuth();

  // Register handler
  const submit = async () => {
    // Check if all fields are filled
    if (
      (form.email === "" || form.password === "" || form.confirmPassword === "",
      form.name == "")
    ) {
      Alert.alert("Error", "Please fill in all fields");
    }
    if (form.password != form.confirmPassword) {
      Alert.alert("Error", "Password did not match");
    } else {
      setisSubmitting(true);

      const formData = {
        email: form.email,
        password: form.password,
        name: form.name,
        confirmPassword: form.confirmPassword,
      };
      // Remove undefined value
      Object.keys(formData).forEach((key) => {
        if (formData[key] === undefined) {
          delete formData[key];
        }
      });

      // Register user
      let response = await register(
        formData.name,
        formData.email,
        formData.password
      );

      // console.log("got result: ", response);
      if (!response.success) {
        Alert.alert("Sign Up", response.msg);
      }

      setisSubmitting(false);
    }
  };
  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView>
        <View className="flex justify-base min-h-[60vh] w-full px-5">
          <Text className="text-4xl font-bold mb-8">
            Hello! Register to get started
          </Text>

          {/* Name input field */}
          <FormField
            title="name"
            placeholder="Name"
            value={form.name}
            handleChangeText={(e) => setForm({ ...form, name: e })}
            otherStyles="mb-2"
            keyboardType="name"
          />
          {/* Email input field */}
          <FormField
            title="email"
            placeholder="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mb-2"
            keyboardType="email-address"
          />
          {/* Password input field */}
          <FormField
            title="password"
            placeholder="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mb-2"
            keyboardType="password"
          />
          {/* ConfirmPassword input field */}
          <FormField
            title="password"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            handleChangeText={(e) => setForm({ ...form, confirmPassword: e })}
            otherStyles="mb-2"
            keyboardType="password"
          />

          {/* Submit Button */}
          {isSubmitting ? (
            <View className="bg-secondary rounded-[5px] min-h-[56px] justify-center items-center flex w-full mt-4 mb-10">
              <Loading size={50} />
            </View>
          ) : (
            <CustomButton
              title="Register"
              handlePress={submit}
              containerStyles=" bg-secondary rounded-[5px] min-h-[56px] justify-center items-center flex w-full mt-4 mb-10"
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
          <GoogleButton title="Register with Google" />

          {/* Login */}
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
