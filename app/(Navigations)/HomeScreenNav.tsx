import { View, Text, StyleSheet ,} from 'react-native'
import React, { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../(Screens)/HomeScreen';
import ItemList from '../Components/HomeScreen/ItemList';
import ProductDetail from '../(Screens)/ProductDetail';
import { Ionicons } from '@expo/vector-icons';
import MyadsScreen from '../(Screens)/MyadsScreen';
import InboxScreen from '../(Screens)/InboxScreen';
import ChatRoomScreen from '../(chat)/Chatroom';

type RootStackParamList = {
  Anasayfa: undefined;
  ItemList: { category: string };
  ProductDetail: { item: any };
  Myads: undefined;
  InboxScreen: undefined;
  Chatroom: { id: string };

}
const Stack = createNativeStackNavigator<RootStackParamList>();



export default function HomeScreenNav() {
  return (
    <Stack.Navigator>
       <Stack.Screen name="Anasayfa" component={HomeScreen} options={{headerShown: false}} />
       <Stack.Screen name="ItemList" component={ItemList} options={({route}) => ({title: route.params?.category, headerStyle: {backgroundColor: '#EFEFF0',}, headerTintColor: '#0B0406'})}  />
       <Stack.Screen 
         name="ProductDetail" 
         component={ProductDetail} 
         options={{
           headerShown: true, 
           headerTitle: 'Ürün Detayı', 
           headerTitleAlign: 'center', 
           headerTitleStyle: { color: '#0B0406' }, 
           headerStyle: { backgroundColor: '#EFEFF0' }, 
           headerTintColor: '#0B0406'
         }} 
       /> 

    </Stack.Navigator>
  )
}

