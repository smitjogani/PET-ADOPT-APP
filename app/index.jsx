import React, { useCallback } from 'react'
import Colors from "@/constants/Colors";
import { Image, Pressable, Text, View } from "react-native";
import * as WebBrowser from 'expo-web-browser'
import { useOAuth } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'

export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    void WebBrowser.warmUpAsync()
    return () => {
      void WebBrowser.coolDownAsync()
    }
  }, [])
}

WebBrowser.maybeCompleteAuthSession()

export default function Index() {
  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });

  const onPress = useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL('/home', { scheme: 'myapp' }),
      })

      if (createdSessionId) {
       
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error('OAuth error', err)
    }
  }, [])

  return (
    <View style={{
      height: '100%',
      backgroundColor: Colors.WHITE,
    }}>
      <Image
        source={require("@/assets/images/login.png")}
        style={{
          width: "100%",
          height: 500,
        }}
      />
      <View
        style={{
          padding: 20,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 30,
            paddingTop: 20
          }}
        >
          Ready to make a new friend?
        </Text>

        <Text
          style={{
            fontFamily: "outfit",
            fontSize: 18,
            textAlign: "center",
            color: Colors.GRAY,
          }}
        >
          Let's adopt the pet which you like and make their life happy again
        </Text>

        <Pressable
          style={{
            padding: 14,
            marginTop: 120,
            backgroundColor: Colors.PRIMARY,
            borderRadius: 14,
            width: "100%",
          }}
          onPress={onPress}
        >
          <Text
            style={{
              fontFamily: "outfit-medium",
              fontSize: 20,
              textAlign: "center",
            }}
          >
            Get Started
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
