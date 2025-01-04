import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Share, Button, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { doc, getDocs, setDoc } from 'firebase/firestore';
import { collection, where } from 'firebase/firestore';
import { query } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { app } from '@/firebaseConfig';
import { router, useRouter } from 'expo-router';
import { navigate } from 'expo-router/build/global-state/routing';

type RouteParams = {
  params: {
    item: {
      image: string;
      title: string;
      description: string;
      category: string;
      price: string;
      address: string;
      useremail: string;
    }
  }
};

type RootStackParamList = {
  Anasayfa: undefined;
  ItemList: { category: string };
  ProductDetail: { item: any };
  Myads: undefined;
  InboxScreen: undefined;
  Chatroom: { id: string };
};

const db = getFirestore(app);


export default function ProductDetail() {
    const { params } = useRoute<RouteProp<RouteParams, 'params'>>();
    const [item, setItem] = useState(params.item);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
 
    useEffect(()=>{
        
        params && setItem(params.item);
        shareButton();
    },[params,navigation]);

    const shareButton = () => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => sharePost()}>
                    <Ionicons name="share-social" size={24} color="#0B0406"/>
                </TouchableOpacity>
            ),
          });
    };

    const sharePost = async () => {
        try {
            const result = await Share.share({
                message: `Check out this product: ${item?.title}\n\n${item?.description}\n\nPrice: ${item?.price} ₺\n\nCategory: ${item?.category}\n\nAddress: ${item?.address}`,
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    console.log('Shared with activity type: ' + result.activityType);
                } else {
                    console.log('Shared successfully');
                }
            } else if (result.action === Share.dismissedAction) {
                console.log('Share dismissed');
            }
        } catch (error) {
            console.error('Error sharing the post: ', error);
        }
    };

    const {user} = useUser();
    const router = useRouter();

    const InitiateChat = async () => {
      
      const docId1=user?.primaryEmailAddress?.emailAddress+'_'+item?.useremail;
      const docId2=item?.useremail+'_'+user?.primaryEmailAddress?.emailAddress;

      const q = query(collection(db, 'Chat'), where('id', 'in', [docId1, docId2]));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        navigation.navigate('Chatroom', {id: doc.id});
      });
      if(querySnapshot.docs.length == 0){
        await setDoc(doc(db, 'Chat', docId1), {
          id: docId1,
          users: 
          [{
            email: user?.primaryEmailAddress?.emailAddress, 
            }, 
            {
            email: item?.useremail, 
            }],
        });
        navigation.navigate('Chatroom', {id: docId1});
      }
    }
    

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#EFEFF0' }}>
            {/* <StatusBar barStyle="light-content" /> */}

        <Image source={{ uri: item?.image }} style={{ width: '100%', height: 300 }} />
        <View style={styles.detailContainer}>
            <Text style={styles.title}>{item?.title}</Text>
            <View style={styles.separator} />
            <Text style={styles.sectionTitle}>İlan Açıklaması</Text>
            <Text style={styles.description}>{item?.description}</Text>
            <View style={styles.separator} />
            <Text style={styles.sectionTitle}>İlan Özellikleri</Text>

            <View style={styles.infoContainer}>
                <Text style={styles.infoLabel}>Kategori:</Text>
                <Text style={styles.infoText}>{item?.category}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.infoLabel}>Fiyat:</Text>
                <Text style={styles.infoText}>{item?.price} ₺</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.infoLabel}>Adres:</Text>
                <Text style={styles.infoText}>{item?.address}</Text>
            </View>
            <TouchableOpacity 
                style={{
                    backgroundColor: '#FFD42D', 
                    padding: 10, 
                    borderRadius: 45, 
                    alignItems: 'center', 
                    marginTop: 20,
                    width: '70%',
                    alignSelf: 'center',
                }}
                onPress={InitiateChat}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons name="chatbubble-ellipses-outline" size={30} color="#0B0406" style={{ marginRight: 10 }} />
                    <Text style={{ color: '#0B0406', fontSize: 16, fontWeight: 'bold' }}>Sohbet Başlat</Text>
                </View>
            </TouchableOpacity>
           
        </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
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
});
