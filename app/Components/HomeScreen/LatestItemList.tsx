import { View, Text, FlatList, Alert, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, DocumentData, getDocs, orderBy, query } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { app } from '@/firebaseConfig';
import PostItem from './PostItem';
import sharedStyles from './sharedStyles';
import { router } from 'expo-router';

interface Props {
  latestItems: any[];
  heading?: string;
  headingStyle?: object;
}

export default function LatestItemList({ 
  latestItems, 
  heading = "Son Eklenenler",
  headingStyle 
}: Props) {
  const db = getFirestore(app);
  const [latestItemList, setLatestItemList] = useState<DocumentData[]>([]);

  useEffect(() => {
    getLatestItemList();
  }, []);

  const getLatestItemList = async () => {
    try {
      setLatestItemList([]);
      const snapshot = await getDocs(
        query(collection(db, "UserPost"), orderBy("createdAt", "desc"))
      );
      snapshot.forEach((doc) => {
        setLatestItemList((prevList) => [...prevList, doc.data()]);
      });
    } catch (error: any) {
      console.error("Error fetching latest item list: ", error.message, error.stack);
      Alert.alert("Error fetching latest item list: ", error.message);
    }
  };

  return (
    <View style={sharedStyles.container}>
      <Text style={[sharedStyles.headerText, headingStyle]}>{heading}</Text>
      <FlatList
        data={latestItems}
        numColumns={2}
        keyExtractor={(item, index) => `item-${index}`}
        renderItem={({ item }) => <PostItem item={item} style={sharedStyles.itemContainer} />}
      />
    </View>
  );
}
