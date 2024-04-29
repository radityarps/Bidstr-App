import { View, Text, Image, ScrollView, Linking } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../../constants/images";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import GoogleButton from "../../components/GoogleButton";
import { Link } from "expo-router";
import { OtpInput } from "react-native-otp-entry";

const otpVerify = () => {
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
          <Text className="text-4xl font-bold mb-2">OTP Verification</Text>
          <Text className="text-[14px] font-medium w-full color-[#838BA1] mb-8">
            Enter the verification code we just sent on your email address.
          </Text>
          <OtpInput
            numberOfDigits={4}
            focusColor="#35C2C1"
            onTextChange={() => {}}
            theme={{ pinCodeContainerStyle: { width: 60 } }}
          />
          <View className="w-full flex-row justify-base items-center mt-2 mb-6">
            <Text>Didn’t received code? </Text>
            <Link href="" className="color-secondary font-semibold">
              Resend
            </Link>
          </View>
          <CustomButton
            title="Verify"
            handlePress={() => {}}
            containerStyles=" bg-secondary rounded-[5px] min-h-[56px] justify-center items-center flex w-full mt-4 mb-10"
            textStyles="font-semibold text-lg"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default otpVerify;
