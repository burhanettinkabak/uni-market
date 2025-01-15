import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { addDoc, collection, getDoc, onSnapshot } from 'firebase/firestore';
import { doc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { app } from '../../firebaseConfig';
import { useUser } from '@clerk/clerk-expo';
import { GiftedChat, Bubble, InputToolbar, Send, SendProps, IMessage, Time, Composer } from 'react-native-gifted-chat';
import { useLocalSearchParams } from 'expo-router';
import moment from 'moment';
import { Ionicons } from '@expo/vector-icons';

const ChatRoomScreen = () => {
  const db = getFirestore(app);
  const params = useLocalSearchParams();
  const { user } = useUser();
  const navigation = useNavigation();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getuserDetails(); 

    const unsubscribe = onSnapshot(collection(db, 'Chat', params.id as string, 'Messages'), (snapshot) => {
      const messageData = snapshot.docs.map((doc) => ({
        _id: doc.id,
        ...doc.data() as {createdAt:string},
      }));
      setMessages(messageData.sort((a, b) => moment(b.createdAt).valueOf() - moment(a.createdAt).valueOf()) as any);
    });
    return () => unsubscribe();
  }, []);

  const getuserDetails = async () => {
    const docRef = doc(db, 'Chat', params.id as string);
    const docSnap = await getDoc(docRef);

    const result = docSnap.data();
    console.log(result);

    const otherUser = result?.users.filter((item: any) => item.email !== user?.primaryEmailAddress?.emailAddress);
    console.log(otherUser);
    navigation.setOptions({
      headerTitle: otherUser[0].email
    });
  }

  const onSend = async (newMessage: any) => {
    setMessages((previousMessages: any) => GiftedChat.append(previousMessages, newMessage));
    newMessage[0].createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
    await addDoc((collection(db, 'Chat', params.id as string, 'Messages')), newMessage[0]);
  }

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        showUserAvatar={true}
        user={{
          _id: user?.primaryEmailAddress?.emailAddress || 'anonymous',
          avatar: user?.imageUrl,
        }}
        renderBubble={props => (
          <Bubble
            {...props}
            wrapperStyle={{
              left: styles.bubbleLeft,
              right: styles.bubbleRight,
            }}
            textStyle={{
              left: styles.textLeft,
              right: styles.textRight,
            }}
          />
        )}
        renderTime={props => (
          <Time
            {...props}
            timeTextStyle={{
              left: styles.timeTextLeft,
              right: styles.timeTextRight,
            }}
          />
        )}
        renderComposer={props => (
          <Composer
            {...props}
            textInputStyle={styles.textInput}
            placeholder="Mesajınızı yazınız..."
            placeholderTextColor="#0B0406"
          />
        )}
        renderInputToolbar={props => (
          <InputToolbar
            {...props}
            containerStyle={styles.inputToolbar}
            primaryStyle={styles.inputPrimary}
          />
        )}
        renderSend={(props: SendProps<IMessage>) => (
          <Send {...props} containerStyle={styles.sendButton} alwaysShowSend>
            <Text style={{fontFamily:'Poppins-Medium',fontSize:16,marginLeft:10}}>Gönder</Text>
          </Send>
        )}
        
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  bubbleLeft: {
    backgroundColor: '#FFD42D',
    borderRadius: 20,
    padding: 8,
    marginVertical: 2,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  bubbleRight: {
    backgroundColor: '#6747E9',
    borderRadius: 20,
    padding: 8,
    marginVertical: 2,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  textLeft: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'Arial',

  },
  textRight: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Arial',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  timeTextLeft: {
    color: '#000',
    fontSize: 12,
    fontFamily: 'Arial',
  },
  timeTextRight: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Arial',
  },
  inputToolbar: {
    backgroundColor: 'white', 
    borderTopWidth: 1,
    borderTopColor: '#0B0406',
    padding: 5,
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#0B0406',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  inputPrimary: {
    alignItems: 'center',
  },
  textInput: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'Arial',
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 5,
    backgroundColor: '#FFD42D',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
});

export default ChatRoomScreen;
