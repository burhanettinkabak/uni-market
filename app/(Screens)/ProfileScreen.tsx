import { 
  View, 
  Text, 
  TouchableOpacity, 
  Alert, 
  Image, 
  TextInput, 
  StyleSheet, 
  ScrollView 
} from 'react-native';
import React, { useState } from 'react';
import { useAuth } from "@clerk/clerk-expo";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useUser } from '@clerk/clerk-expo';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: '#EFEFF0', 
  },
  section: {
    marginBottom: 15,
    alignItems: 'center',
    marginTop:100,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 65,
    marginBottom: 20,
    
  },
  formContainer: {
    marginVertical: 25,
    padding: 25,
    borderRadius: 20,
    backgroundColor: '#FFFFFF', 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  inputField: {
    borderBottomWidth: 1.5,
    borderBottomColor: '#FFD700', 
    marginBottom: 25,
    fontSize: 17,
    padding: 12,
  },
  iconStyle: {
    position: 'absolute',
    right: 15, 
    top: 15,  
  },
  actionButton: {
    marginTop:100,
    backgroundColor: '#ff0000', 
    padding: 15,
    borderRadius: 10,
    marginBottom: 25,
    alignItems: 'center',
    width:'80%',
    marginLeft:'10%',
    marginRight:'10%',
  },
  actionButtonText: {
    color: 'white', 
    fontSize: 19,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#6747E9', 
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width:'80%',
    marginLeft:'10%',
    marginRight:'10%',

  },
  logoutButtonText: {
    color: '#FFFFFF', 
    fontSize: 19,
    fontWeight: 'bold',
  },
  inputWrapper: {
    position: 'relative',
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
});

export default function ProfileScreen() {
  const { signOut } = useAuth();
  const { user } = useUser();

  const [email, setEmail] = useState(user?.emailAddresses[0]?.emailAddress ?? '');

  const handleLogout = () => {
    signOut();
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Hesabınızı Sil",
      "Hesabınızı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.",
      [
        { text: "İptal", style: "cancel" },
        { text: "Sil", onPress: async () => {
            try {
              await user?.delete();
              Alert.alert("Hesabınız başarıyla silindi");
              handleLogout();
            } catch (error) {
              Alert.alert("Hesabınızı silerken bir hata oluştu. Lütfen tekrar deneyiniz.");
            }
          } 
        }
      ]
    );
  };

  return (
    <View style={{flex:1,padding:10,marginTop:20,marginBottom:90}}>
      <Text style={{fontFamily:'Poppins-SemiBold',color:'#0B0406',fontSize:20,textAlign:'center',marginTop:20,borderBottomWidth:1,borderBottomColor:'#ccc',paddingBottom:10}}>Profil Bilgileri</Text>
      <View style={styles.container}>
      <View style={styles.section}>
        <Image 
          source={{ uri: user?.imageUrl }} 
          style={styles.profileImage} 
        />
        <Text style={{fontFamily:'Poppins-SemiBold',color:'#0B0406',fontSize:18,textAlign:'center',marginTop:20,paddingBottom:10}}>{user?.emailAddresses[0]?.emailAddress}</Text>
      </View>

      <TouchableOpacity onPress={handleDeleteAccount} style={styles.actionButton}>
        <Text style={styles.actionButtonText}>Hesabı Sil</Text>
        <Icon name="delete" size={26} color="white" style={styles.iconStyle} />
      </TouchableOpacity>

      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Çıkış Yap</Text>
          <Icon name="logout" size={26} color="white" style={styles.iconStyle} />
        </TouchableOpacity>
      </View>
    </View>   
  );
}
