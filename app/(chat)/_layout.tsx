import { View, Text } from 'react-native'
import React from 'react'
import { Stack, useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'

export default function _layout() {
  const router = useRouter();
  
  return (
   <Stack screenOptions={{headerShown: false}}>
    <Stack.Screen 
      name="Chatroom"
      options={{ 
        headerShown: true, 
        headerTitle: 'Chat', 
        headerTitleAlign: 'center', 
        headerTitleStyle: { color: '#0B0406' }, 
        headerStyle: { backgroundColor: '#EFEFF0' }, 
        headerTintColor: '#0B0406',
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#0B0406" />
          </TouchableOpacity>
        )
      }}
    />
   </Stack>
  )
}