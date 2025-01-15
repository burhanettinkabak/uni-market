import { View, Text, Image, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-expo';
import { Link } from 'expo-router';
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { app } from '@/firebaseConfig';

interface UserInfo {
  docId: string;
  email: string;
  image: string;
  name?: string;
}

export default function UserItem({ userInfo }: { userInfo: UserInfo }) {
  const { user } = useUser();
  const [lastMessage, setLastMessage] = useState<string | null>(null);
  const [lastMessageTime, setLastMessageTime] = useState<string | null>(null);
  const db = getFirestore(app);

  useEffect(() => {
    const messagesRef = collection(db, 'Chat', userInfo.docId, 'Messages');
    const q = query(messagesRef, orderBy('createdAt', 'desc'), limit(1));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const messageData = snapshot.docs[0].data();
        setLastMessage(messageData.text || 'No message');
        setLastMessageTime(messageData.createdAt || '');
      } else {
        setLastMessage('No message');
        setLastMessageTime('');
      }
    });

    return () => unsubscribe();
  }, [userInfo.docId, db]);

  return (
    <Link
      href={{
        pathname: "/(chat)/Chatroom",
        params: { id: userInfo.docId }
      }} style={{marginBottom:20}}
    >
      <View style={styles.container}>
        <Image source={{ uri: userInfo?.image }} style={styles.image} />
        <View style={styles.splitContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.email}>{userInfo?.email}</Text>
            <Text style={styles.lastMessage}>{lastMessage}</Text>
          </View>
          <View style={styles.messageContainer}>
            <Text style={styles.time}>{lastMessageTime ? new Date(lastMessageTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}</Text>
          </View>
        </View>
      </View>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  splitContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 15,
  },
  textContainer: {
    flex: 1,
  },
  messageContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  name: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#222',
  },
  email: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#333',
    marginTop: 4,
  },
  lastMessage: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#555',
    marginTop: 10,
  },
  time: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#777',
    marginTop: 10,
  },
});
