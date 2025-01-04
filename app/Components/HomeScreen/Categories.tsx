import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DocumentData, getFirestore, collection, query, getDocs, orderBy } from 'firebase/firestore';
import { app } from '@/firebaseConfig';


type RootStackParamList = {
  ItemList: { category: string };
};

export default function Categories() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [categoryList, setCategoryList] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState(true);

  const iconList = [
    { id: '1', iconName: 'car-sport-outline', iconLib: Ionicons },
    { id: '2', iconName: 'phone-portrait-outline', iconLib: Ionicons },
    { id: '3', iconName: 'laptop-outline', iconLib: Ionicons },
    { id: '4', iconName: 'bicycle-outline', iconLib: Ionicons },
    { id: '5', iconName: 'bed-outline', iconLib: Ionicons },
    { id: '6', iconName: 'shirt-outline', iconLib: Ionicons },
    { id: '7', iconName: 'person-outline', iconLib: Ionicons },
    { id: '8', iconName: 'book-outline', iconLib: Ionicons },
    { id: '9', iconName: 'briefcase-outline', iconLib: Ionicons },
    { id: '10', iconName: 'football-outline', iconLib: Ionicons },
    { id: '11', iconName: 'paw-outline', iconLib: Ionicons },
  ];

  const db = getFirestore(app);

  useEffect(() => {
    getCategoryList();
  }, []);

  // Fetch category list from Firestore
  const getCategoryList = async () => {
    try {
      setCategoryList([]);
      const categoryQuery = query(collection(db, 'Category'), orderBy('id', 'asc'));
      const querySnapshot = await getDocs(categoryQuery);

      const categories = querySnapshot.docs.map(doc => doc.data());
      setCategoryList(categories);
    } catch (error) {
      console.error("Error fetching categories: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Kategorilere Göz At</Text>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#6747E9" />
      ) : (
        <View style={styles.listContainer}>
          <FlatList
            data={categoryList}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
              const icon = iconList.find(icon => icon.id == item.id);
              const IconComponent = icon?.iconLib || Ionicons;
              return (
                <View style={styles.itemContainer}>
                  <TouchableOpacity 
                    style={styles.categoryItem} 
                    onPress={() => navigation.navigate('ItemList', { category: item.name })}
                  >
                    <IconComponent 
                      name={(icon?.iconName || 'ios-alert') as keyof typeof Ionicons.glyphMap} 
                      style={styles.categoryIcon} 
                    />
                    <Text style={styles.categoryText}>{item.name}</Text>
                  </TouchableOpacity>
                </View>
              );
            }}
            keyExtractor={(item) => item.id}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#EFEFF0', // Ensures compatibility with light and dark themes
    marginTop: 10,
 
  },
  header: {
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    color: '#0B0406',
    fontFamily: 'Poppins-Medium',
    marginLeft: 15,
  },
  listContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemContainer: {
    marginHorizontal: 15,
    marginBottom: 10,
  },
  categoryItem: {
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    width: 75,
    height: 75,
    backgroundColor: 'white',
  },
  categoryIcon: {
    color: '#0B0406',
    fontSize: 25,
  },
  categoryText: {
    fontSize: 11,
    color: '#0B0406',
    marginTop: 5,
    textAlign: 'center',
    fontFamily: 'Poppins-Light',
  },
});
