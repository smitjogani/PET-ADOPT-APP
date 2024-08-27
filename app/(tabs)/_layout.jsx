import Ionicons from '@expo/vector-icons/Ionicons'
import React, { useEffect } from 'react'
import { Tabs, useNavigation } from 'expo-router'
import Colors from "../../constants/Colors"

const TabLayout = () => {

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, []);

  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: Colors.PRIMARY,
      
    }}>
      <Tabs.Screen name='home' options={{
        title: 'Home',
        headerShown: false,
        tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color="black" color={color} />
      }} />

      <Tabs.Screen name='favourite' options={{
        title: 'Home',
        headerShown: false,
        tabBarIcon: ({ color }) => <Ionicons name="heart" size={24} color="black" color={color} />
      }} />

      <Tabs.Screen name='inbox'
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color }) => <Ionicons name="chatbubble" size={24} color="black" color={color} />
        }}
      />

      <Tabs.Screen name='profile'
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color }) => <Ionicons name="people-circle" size={24} color="black" color={color} />
        }} />
    </Tabs>
  )
}

export default TabLayout