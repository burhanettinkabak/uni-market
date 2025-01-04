import { 
  View, 
  Text, 
  TouchableOpacity, 
  Switch, 
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
    padding: 20,
    marginTop: 20,
  },
  section: {
    marginBottom: 20,
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
  },
  formContainer: {
    marginVertical: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  inputField: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 15,
    fontSize: 16,
    padding: 8,
  },
  iconStyle: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  actionButton: {
    backgroundColor: '#0288d1',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  actionButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  switchLabel: {
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#e53935',
    padding: 14,
    borderRadius: 8,
  },
  logoutButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default function ProfileScreen() {
  const { signOut } = useAuth();
  const { user } = useUser();

  const [phoneVisibility, setPhoneVisibility] = useState(false);
  const [emailVisibility, setEmailVisibility] = useState(false);
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [phone, setPhone] = useState('+1234567890');

  const handleLogout = () => {
    signOut();
  };

  const handleEditProfile = () => {
    Alert.alert("Edit Profile", "Navigate to the edit profile screen.");
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: () => Alert.alert("Account deleted.") }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* User Information Section */}
      <View style={styles.section}>
        <Image 
          source={{ uri: user?.imageUrl }} 
          style={styles.profileImage} 
        />
      </View>

      {/* Form Section */}
      <View style={styles.formContainer}>
        <TextInput
          style={styles.inputField}
          value={name}
          onChangeText={setName}
          placeholder="Name"
        />
        <Icon name="person" size={20} color="#00796b" style={styles.iconStyle} />
        
        <TextInput
          style={styles.inputField}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
        />
        <Icon name="email" size={20} color="#00796b" style={styles.iconStyle} />
        
        <TextInput
          style={styles.inputField}
          value={phone}
          onChangeText={setPhone}
          placeholder="Phone"
          keyboardType="phone-pad"
        />
        <Icon name="phone" size={20} color="#00796b" style={styles.iconStyle} />
      </View>

      {/* Profile Actions Section */}
      <TouchableOpacity onPress={handleEditProfile} style={styles.actionButton}>
        <Text style={styles.actionButtonText}>Edit Profile</Text>
      </TouchableOpacity>

      {/* Privacy Settings Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Privacy Settings</Text>
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Show Phone Number</Text>
          <Switch value={phoneVisibility} onValueChange={setPhoneVisibility} />
        </View>
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Show Email</Text>
          <Switch value={emailVisibility} onValueChange={setEmailVisibility} />
        </View>
      </View>

      {/* Account Actions Section */}
      <TouchableOpacity onPress={handleDeleteAccount} style={styles.actionButton}>
        <Text style={styles.actionButtonText}>Delete Account</Text>
      </TouchableOpacity>

      {/* Logout Section */}
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
