import React, { useCallback, useEffect } from 'react';
import { View, Text,  RefreshControl, FlatList } from 'react-native';
import Header from '../Components/HomeScreen/Header';
import Categories from '../Components/HomeScreen/Categories';
import LatestItemList from '../Components/HomeScreen/LatestItemList';
import Slider from '../Components/HomeScreen/Slider';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { getFirestore, getDocs, collection, query, orderBy, limit } from 'firebase/firestore';
import { app } from '@/firebaseConfig';

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [latestItems, setLatestItems] = useState<any[]>([]);
  const isFocused = useIsFocused();

  const fetchLatestItems = async () => {
    setRefreshing(true);
    const db = getFirestore(app);
    const querySnapshot = await getDocs(query(collection(db, 'UserPost'),orderBy("createdAt","desc"),limit(10)));
    const newItems = querySnapshot.docs.map(doc => doc.data());
    setLatestItems(newItems);
    setRefreshing(false);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchLatestItems().then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    if (isFocused) {
      fetchLatestItems();
    }
  }, [isFocused]);

  const renderContent = () => (
    <>
      <Slider/>
      <Categories/>
      <LatestItemList latestItems={latestItems} heading={'En Son Eklenenler'} />
    </>
  );

  return (
    <View style={{flex: 1, backgroundColor: '#EFEFF0'}}>
      <Header />
      <FlatList
        data={[1]}
        renderItem={() => renderContent()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        style={{flex: 1, backgroundColor: '#EFEFF0', marginBottom: 100}}
      />
    </View>
  );
}