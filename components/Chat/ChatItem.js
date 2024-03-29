import { View, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import React from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useEffect, useState } from "react";
import {
  doc,
  collection,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { formatDate, formatTime, getRoomId } from "@/utils/common";
import { db } from "@/firebaseConfig";
import { useAuth } from "../../context/authContext";

const ChatItem = ({ item, noBorder, router, currentUser }) => {
  const [lastMessage, setLastMessage] = useState(undefined);
  const { i18n } = useAuth();

  useEffect(() => {
    let roomId = getRoomId(currentUser.userId, item?.userId);

    const docRef = doc(db, "rooms", roomId);
    const messagesRef = collection(docRef, "messages");
    const q = query(messagesRef, orderBy("createdAt", "desc"));

    let unsub = onSnapshot(q, (snapshot) => {
      let allMessages = snapshot.docs.map((doc) => {
        return doc.data();
      });
      setLastMessage(allMessages[0] ? allMessages[0] : null);
    });

    return unsub;
  }, []);

  const renderTime = () => {
    if (lastMessage) {
      let date = lastMessage?.createdAt;
      let formattedDate = formatDate(new Date(date?.seconds * 1000));
      let formattedTime = formatTime(new Date(date?.seconds * 1000));
      return `${formattedDate} ${formattedTime}`;
    }
  };

  const renderLastMessage = () => {
    if (typeof lastMessage == "undefined") return "Loading...";

    if (lastMessage) {
      if (lastMessage?.imageURL) {
        if (currentUser?.userId == lastMessage?.userId)
          return "You: " + "Sent an image";
        return "Image";
      }

      if (currentUser?.userId == lastMessage?.userId)
        return "You: " + lastMessage?.text;
      return lastMessage?.text;
    } else {
      return `${i18n.t("FirstMessage")}`;
    }
  };

  const openChatRoom = () => {
    router.push({ pathname: "/chat/ChatRoom", params: item });
  };
  return (
    <Pressable
      onPress={openChatRoom}
      className={`flex-row justify-between mx-4 items-center gap-3 mb-4 pb-2 ${
        noBorder ? "" : "border-b border-b-neutral-200"
      }`}
    >
      <Image
        source={{ uri: item?.profileUrl }}
        style={{ height: hp(6), width: hp(6), borderRadius: 100 }}
      />

      {/* name and last message */}
      <View className="flex-1 gap-1">
        <View className="flex-row justify-between">
          <Text
            style={{ fontSize: hp(2) }}
            className="font-bold text-neutral-800"
          >
            {item?.username}
          </Text>
          <Text
            style={{ fontSize: hp(1.6) }}
            className="font-semibold text-neutral-500"
          >
            {renderTime()}
          </Text>
        </View>
        <Text
          style={{ fontSize: hp(1.6) }}
          className="font-medium text-neutral-500"
        >
          {renderLastMessage()}
        </Text>
      </View>
    </Pressable>
  );
};

export default ChatItem;
