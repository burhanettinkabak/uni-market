import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { getDoc } from 'firebase/firestore';
import { doc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { app } from '../../firebaseConfig';
import { useUser } from '@clerk/clerk-expo';
import { GiftedChat } from 'react-native-gifted-chat';

const ChatRoomScreen = () => {

  const db = getFirestore(app);

  type RouteParams = {
    params: {
      id: string;
    }
  };

  const { user } = useUser();
  const navigation = useNavigation();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getuserDetails();
    
    });


  const route = useRoute<RouteProp<RouteParams, 'params'>>();
  const { id } = route.params;

  const getuserDetails = async () => {
    const docRef = doc(db, 'Chat', id);
    const docSnap = await getDoc(docRef);

    const result = docSnap.data();
    console.log(result);

    const otherUser = result?.users.filter((item: any) => item.email !== user?.primaryEmailAddress?.emailAddress);
    console.log(otherUser);
    navigation.setOptions({
      headerTitle: otherUser[0].email
    });
  }

  const onSend = (messages: any) => {
    console.log(messages);
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
  )
}

export default ChatRoomScreen;
