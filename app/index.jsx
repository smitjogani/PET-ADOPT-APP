import Colors from "@/constants/Colors";
import { useUser } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import React, { useCallback } from 'react'
import { Image, Text, View, Pressable, ToastAndroid } from 'react-native'
import Home from "./(tabs)/home"

export default function Index() {

  const {user} = useUser();


  return (
    <View>
      {user && <Home/>}
    </View>
  );
}
