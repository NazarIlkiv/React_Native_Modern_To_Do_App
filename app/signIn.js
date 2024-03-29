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
import { Octicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Loading from "../components/custom/Loading";
import CustomKeyboardAvoidView from "../components/custom/CustomKeyboardAvoidView";
import { useAuth } from "../context/authContext";

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login, i18n } = useAuth();

  const emailRef = useRef("");
  const passwordRef = useRef("");

  const handleLogin = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert("Sign in", "Please fill all fields");
      return; // зупиняється виконання функції якщо є порожні поля
    }
    setLoading(true);
    const response = await login(emailRef.current, passwordRef.current);
    setLoading(false);
    if (!response.success) {
      Alert.alert("Sign in", response.msg);
    }

    // login process
  };

  return (
    <CustomKeyboardAvoidView>
      <StatusBar style="dark" />
      <View
        style={{ paddingTop: hp(25), paddingHorizontal: wp(5) }}
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
            {i18n.t("SingInText")}
          </Text>

          {/* inputs */}
          <View className="gap-4">
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
            <View className="gap-3">
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
              <Text
                style={{ fontSize: hp(1.8) }}
                className="font-semibold text-right text-neutral-500"
              >
                {i18n.t("ForgotPassword")}
              </Text>
            </View>

            {/* submit button */}

            <View>
              {loading ? (
                <View className="flex-row justify-center">
                  <Loading size={hp(6.5)} />
                </View>
              ) : (
                <TouchableOpacity
                  onPress={handleLogin}
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
                    {i18n.t("SingIn")}
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
                {i18n.t("HaveAccount")}
              </Text>
              <Pressable onPress={() => router.push("signUp")}>
                <Text
                  style={{ fontSize: hp(1.8), color: "#24A19C" }}
                  className=" font-bold"
                >
                  {" "}
                  {i18n.t("SingUp")}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </CustomKeyboardAvoidView>
  );
};

export default SignIn;
