import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
} from "react-native";
import React, { useRef, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import { Feather, Octicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Loading from "../components/custom/Loading";
import CustomKeyboardAvoidView from "../components/custom/CustomKeyboardAvoidView";
import { useAuth } from "../context/authContext";

const SignUp = () => {
  const { register, i18n } = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const emailRef = useRef("");
  const passwordRef = useRef("");
  const usernameRef = useRef("");
  const profileRef = useRef("");

  const handleRegister = async () => {
    if (
      !emailRef.current ||
      !passwordRef.current ||
      !usernameRef.current ||
      !profileRef.current
    ) {
      Alert.alert("Sign up", "Please fill all the fields");
      return;
    }

    setLoading(true);

    let response = await register(
      emailRef.current,
      passwordRef.current,
      usernameRef.current,
      profileRef.current
    );

    setLoading(false);

    console.log("got result: ", response);
    if (!response.success) {
      Alert.alert("Sign up", response.msg);
    }
  };

  return (
    <CustomKeyboardAvoidView>
      <StatusBar style="dark" />
      <View
        style={{ paddingTop: hp(20), paddingHorizontal: wp(5) }}
        className="flex-1 gap-12"
      >
        {/* signIn image - якщо вставляємо фото, змінювати paddingTop hp(8) */}

        {/* <View className="items-center">
          <Image source={} />
        </View> */}

        <View className="gap-10">
          <Text
            style={{ fontSize: hp(4) }}
            className="font-bold tracking-wider text-center text-neutral-900  "
          >
            {i18n.t("SingUp")}
          </Text>

          {/* inputs */}
          <View className="gap-4">
            <View
              style={{ height: hp(7) }}
              className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl"
            >
              <Feather name="user" size={hp(2.7)} color="gray" />
              <TextInput
                onChangeText={(value) => (usernameRef.current = value)}
                style={{ fontSize: hp(2) }}
                className="flex-1 font-semibold text-neutral-700"
                placeholder="User name"
                placeholderTextColor={"gray"}
              />
            </View>

            <View
              style={{ height: hp(7) }}
              className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl"
            >
              <Octicons name="mail" size={hp(2.7)} color="gray" />
              <TextInput
                onChangeText={(value) => (emailRef.current = value)}
                style={{ fontSize: hp(2) }}
                className="flex-1 font-semibold text-neutral-700"
                placeholder="Email address"
                placeholderTextColor={"gray"}
              />
            </View>

            <View
              style={{ height: hp(7) }}
              className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl"
            >
              <Octicons name="lock" size={hp(2.7)} color="gray" />
              <TextInput
                onChangeText={(value) => (passwordRef.current = value)}
                style={{ fontSize: hp(2) }}
                className="flex-1 font-semibold text-neutral-700"
                secureTextEntry
                placeholder="Password"
                placeholderTextColor={"gray"}
              />
            </View>

            <View
              style={{ height: hp(7) }}
              className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl"
            >
              <Feather name="image" size={hp(2.7)} color="gray" />
              <TextInput
                onChangeText={(value) => (profileRef.current = value)}
                style={{ fontSize: hp(2) }}
                className="flex-1 font-semibold text-neutral-700"
                placeholder="Profile url"
                placeholderTextColor={"gray"}
              />
            </View>

            {/* submit button */}

            <View>
              {loading ? (
                <View className="flex-row justify-center">
                  <Loading size={hp(6.5)} />
                </View>
              ) : (
                <TouchableOpacity
                  onPress={handleRegister}
                  style={{
                    height: hp(6.5),
                    backgroundColor: "#24A19C",
                    borderRadius: 12,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{ fontSize: hp(2.7) }}
                    className="text-white font-bold tracking-wider"
                  >
                    {i18n.t("SingUp")}
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            {/* sign up text */}

            <View className="flex-row justify-center">
              <Text
                style={{ fontSize: hp(1.8) }}
                className="font-semibold text-neutral-500"
              >
                {i18n.t("AlreadyHaveAccount")}
              </Text>
              <Pressable onPress={() => router.push("signIn")}>
                <Text
                  style={{ fontSize: hp(1.8), color: "#24A19C" }}
                  className="font-bold"
                >
                  {" "}
                  {i18n.t("SingIn")}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </CustomKeyboardAvoidView>
  );
};

export default SignUp;
