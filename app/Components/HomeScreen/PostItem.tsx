import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import sharedStyles from './sharedStyles';

type RootStackParamList = {
  ProductDetail: { item: any };
};

interface PostItemProps {
  item: any;
  style?: any;
}

export default function PostItem({ item, style }: PostItemProps) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'ProductDetail'>>();

  return (
    <View style={sharedStyles.card}>
      <Image source={{ uri: item.image }} style={sharedStyles.image} />
      <Text style={sharedStyles.category}>{item.category}</Text>
      <Text style={sharedStyles.price}>{item.price} ₺</Text>
      {/* <Text style={sharedStyles.name}>{item.title}</Text> */}
      <Text style={sharedStyles.location}>📍 {item.address}</Text>
      <TouchableOpacity style={sharedStyles.button} onPress={() => navigation.push('ProductDetail', { item })}>
        <Text style={sharedStyles.buttonText}>İncele</Text>
      </TouchableOpacity>
    </View>
  );
}

