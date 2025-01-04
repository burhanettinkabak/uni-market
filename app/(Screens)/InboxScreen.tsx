import { View, Text, StatusBar } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';

export default function InboxScreen() {
  const navigation = useNavigation();

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerShown: true,
  //     headerTitle: 'Mesajlar',
  //     headerTitleAlign: 'center',
  //     headerTitleStyle: { color: 'white', fontFamily: 'Poppins-SemiBold' },
  //     headerStyle: { backgroundColor: '#0B0406' },
  //     headerTintColor: 'white',
  //   });
  // }, [navigation]);
  

  return (
    <View>
      <Text>InboxScreen</Text>

    </View>
  )
}