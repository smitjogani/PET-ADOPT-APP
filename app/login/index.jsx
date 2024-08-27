import Colors from "@/constants/Colors";
import React from 'react'
import { Image, Text, View, Pressable, ToastAndroid } from 'react-native'
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser';
import { useOAuth } from '@clerk/clerk-expo';
import { Redirect } from "expo-router";

WebBrowser.maybeCompleteAuthSession();

const index = () => {
    useWarmUpBrowser();

    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

    const onPress = React.useCallback(async () => {
        try {
            const { createdSessionId, signIn, signUp, setActive } =
                await startOAuthFlow();

            if (createdSessionId) {
                setActive({ session: createdSessionId });
            } else {
                // Use signIn or signUp for next steps such as MFA
            }
        } catch (err) {
            console.error("Outh error", err);
        }
    }, []);

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
    )
}

export default index