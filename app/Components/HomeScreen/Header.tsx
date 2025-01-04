import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, StatusBar } from 'react-native';
import { useUser } from '@clerk/clerk-expo';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    paddingHorizontal: 10,
  },
  logoText: {
    fontFamily: 'Bellafair-Regular',
    color: '#FFD42D',
    fontWeight: 'bold',
    fontSize: 30,
    flex: 1,
  },
  logoImage: {
    width: 180,
    height: 60,
    marginRight: 10,
  },
  locationInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    backgroundColor: 'white',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  locationInput: {
    flex: 1,
    paddingHorizontal: 20,
    fontSize: 14,
    color: '#0B0406',
    fontFamily: 'Poppins-Regular',
  },
  locationIcon: {
    padding: 5,
    marginRight: 10,
  },
  searchContainer: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    height: 40,
    paddingHorizontal: 10,
    
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#0B0406',
    fontFamily: 'Poppins-Regular',
  },
  searchIcon: {
    padding: 5,
    
  },
});

export default function Header() {
  const { user } = useUser();
  const [searchText, setSearchText] = useState('');
  const [location, setLocation] = useState('');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <Image source={require('../../../assets/images/logo8.png')} style={styles.logoImage} />
        <View style={styles.locationInputContainer}>
          <TextInput
            style={styles.locationInput}
            placeholder="Şehir, İlçe..."
            placeholderTextColor="#0B0406"
            value={location}
            onChangeText={setLocation}
          />
          <TouchableOpacity style={styles.locationIcon} accessibilityLabel="Set Location">
            <Ionicons name="location" size={24} color="#0B0406" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Section */}
      <View style={styles.searchContainer}>
        <TouchableOpacity style={styles.searchIcon} accessibilityLabel="Search">
          <Ionicons name="search" size={20} color="#0B0406" />
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="Araba, Telefon, Kitap ve Daha Fazlası..."
          placeholderTextColor="#0B0406"
          value={searchText}
          onChangeText={setSearchText}
        />
        
      </View>
    </View>
  );
}
