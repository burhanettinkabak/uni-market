import { View, Text, Button, FlatList, Alert, RefreshControl, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState, useEffect, useCallback, useLayoutEffect } from 'react';
import { getFirestore, collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { app } from '@/firebaseConfig';
import { useUser } from '@clerk/clerk-expo';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

export default function MyadsScreen() {
  const [posts, setPosts] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useUser();
  const db = getFirestore(app);
  const navigation = useNavigation();



  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerShown: true,
  //     headerTitle: 'İlanlarım',
  //     headerTitleAlign: 'center',
  //     headerTitleStyle: { color: 'white', fontFamily: 'Poppins-SemiBold' },
  //     headerStyle: { backgroundColor: '#0B0406' },
  //     headerTintColor: 'white',
  //   });
  // }, [navigation]);


  useFocusEffect(
    useCallback(() => {
      if (user?.emailAddresses[0]?.emailAddress) {
        fetchPostsByEmail(user.emailAddresses[0].emailAddress);
      }
    }, [user])
  );

  const fetchPostsByEmail = async (email: string) => {
    try {
      setRefreshing(true);
      const q = query(collection(db, 'UserPost'), where('useremail', '==', user?.emailAddresses[0]?.emailAddress));
      const querySnapshot = await getDocs(q);
      const userPosts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPosts(userPosts);
    } catch (error: any) {
      console.error('Error fetching posts: ', error);
      Alert.alert('Error fetching posts', error.message);
    } finally {
      setRefreshing(false);
    }
  };

  const onRefresh = useCallback(() => {
    if (user?.emailAddresses[0]?.emailAddress) {
      fetchPostsByEmail(user.emailAddresses[0].emailAddress);
    }
  }, [user]);

  const deletePost = (postId: string) => {
    setPosts(posts.filter(post => post.id !== postId));
    deleteDoc(doc(db, 'UserPost', postId));
  };

  return (
    <View style={styles.scrollView}>
      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.detailContainer}>
            
            <Text style={styles.separator}>{item.createdAt}</Text>
            <Text style={styles.sectionTitle}>{item.category}</Text>
            <Text style={styles.sectionTitle}>{item.price}</Text>
            <Text style={styles.sectionTitle}>{item.address}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Image source={{ uri: item.image }} style={styles.image} />
            <TouchableOpacity onPress={() => deletePost(item.id)} style={styles.chatButton}>
              <Text style={styles.chatButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: '100%',
    height: 300,
  },
  detailContainer: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  infoContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: '600',
    width: 80,
  },
  infoText: {
    fontSize: 16,
    color: '#666',
    flex: 1,
  },
  chatButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 45,
    alignItems: 'center',
    marginTop: 20,
    width: '70%',
    alignSelf: 'center',
  },
  chatButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  chatIcon: {
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 45,
    alignItems: 'center',
    marginTop: 20,
    width: '70%',
    alignSelf: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteIcon: {
    marginRight: 10,
  },
  
});
