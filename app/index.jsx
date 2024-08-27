import Colors from "@/constants/Colors";
import { useUser } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import React, { useCallback } from 'react'
import { Image, Text, View, Pressable, ToastAndroid } from 'react-native'

export default function Index() {

  const {user} = useUser();

  return (
    <View>
      {user && <Redirect href={'/(tabs)/home'}/>}
    </View>
  );
}
