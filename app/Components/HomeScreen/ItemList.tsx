import { View, Text, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { app } from '@/firebaseConfig';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import LatestItemList from './LatestItemList';
import sharedStyles from './sharedStyles';

interface RouteParams {
  category: string;
}

export default function ItemList() {
  const { params } = useRoute<RouteProp<{ params: RouteParams }>>();
  const db = getFirestore(app);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    params && getItemList();
  }, [params]);

  const getItemList = async () => {
    setItems([]);
    setLoading(true);
    const q = query(collection(db, "UserPost"), where("category", "==", params.category));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setItems((prevItems) => [...prevItems, doc.data()]);
    });
    setLoading(false);
  };

  return (
    <View>
      {loading ? (
        <ActivityIndicator size="large" color="#f0031c" style={sharedStyles.activityIndicator} />
      ) : items.length > 0 ? (
        <LatestItemList latestItems={items} heading={''} />
      ) : (
        <Text style={sharedStyles.noItemsText}>No items found</Text>
      )}
    </View>
  );
}
