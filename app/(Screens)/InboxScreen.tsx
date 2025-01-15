import { View, Text, StatusBar, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useUser } from '@clerk/clerk-expo';
import { query } from 'firebase/firestore';
import { collection, getDocs, where,getFirestore } from 'firebase/firestore';
import UserItem from '../Components/HomeScreen/Inbox/UserItem';

export default function InboxScreen() {
  
  const {user}=useUser();
  const db=getFirestore();
  const [userData, setUserData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(()=>{
    
      user&&GetUserDetails();
  },[user]);
  
//get user details depends on Current User Email

  const GetUserDetails=async()=>{
    setIsLoading(true);
    setUserData([]);
    const q=query(collection(db,'Chat'),where('userIds','array-contains',user?.primaryEmailAddress?.emailAddress));
    const querySnapshot=await getDocs(q);
    querySnapshot.forEach((doc)=>{
      console.log(doc.data());
      setUserData(prevList=>[...prevList,doc.data()]);
    });
    setIsLoading(false);
  }

  // Filter user data to get the other user's email
  const MapOtherUserEmail=()=>{
    const list:any[]=[]
    userData.forEach((record)=>{
      const otherUser=record.users?.filter((u:any)=>u?.email!==user?.primaryEmailAddress?.emailAddress);
      const result={
        docId:record.id,
        ...otherUser[0],
      }
      list.push(result);
    });
    console.log(list);
    return list;
  }

  return (
    <View style={{flex:1,padding:10,marginTop:20}}>
     <Text style={{fontFamily:'Poppins-SemiBold',color:'#0B0406',fontSize:20,textAlign:'center',marginTop:20,borderBottomWidth:1,borderBottomColor:'#ccc',paddingBottom:10}}>Sohbetler</Text>
     {isLoading?<ActivityIndicator size="large" color="#0000ff" />:
     <FlatList
     data={MapOtherUserEmail()}
     contentContainerStyle={{ paddingHorizontal: 15,
      paddingBottom: 15,
      paddingTop: 15,
     }}
     renderItem={({item,index})=>{
        return(
          <UserItem userInfo={item} key={index}/>
        )
     }}
     />
     }
    </View>
  )
}