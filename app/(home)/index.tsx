import React from 'react';
import { Text, View, StyleSheet, Image, FlatList } from 'react-native';
import { SignedIn, SignedOut, useClerk, useUser } from '@clerk/clerk-expo';
import { Link, Redirect, router } from 'expo-router';
import TabNavigation from '../(Navigations)/TabNavigation';
import { StatusBar } from 'expo-status-bar';
// Hexagon Component
const Hexagon = ({ imageSource }: { imageSource: number }) => (
  <View style={styles.hexagon}>
    <View style={styles.hexagonInner}>
      <Image source={imageSource} style={styles.image} />
    </View>
    <View style={styles.hexagonBefore} />
    <View style={styles.hexagonAfter} />
  </View>
);

// Main Page Component
export default function Page() {
  const { user } = useUser();
  const { signOut } = useClerk();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace('/');
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <SignedIn>
        <TabNavigation/>
      </SignedIn>

      <SignedOut>
        <View style={styles.content}>
          {/* Hexagon Grid */}
          <HexagonGrid />

          {/* Welcome Section */}
          <WelcomeSection />
        </View>
      </SignedOut>
    </View>
  );
}

// Hexagon Grid Component
const HexagonGrid = () => (
  <View style={styles.gridContainerWrapper}>
    <View style={styles.gridContainer}>
      <Hexagon imageSource={require('../../assets/images/headphones.png')} />
      <Hexagon imageSource={require('../../assets/images/phone.png')} />
      <Hexagon imageSource={require('../../assets/images/watch.png')} />
    </View>
    <View style={styles.gridContainer}>
      <Hexagon imageSource={require('../../assets/images/coat.png')} />
      <Hexagon imageSource={require('../../assets/images/shoes.png')} />
    </View>
    <View style={styles.gridContainer}>
      <Hexagon imageSource={require('../../assets/images/kettle.png')} />
      <Hexagon imageSource={require('../../assets/images/airfryer.png')} />
      <Hexagon imageSource={require('../../assets/images/robot.png')} />
    </View>
  </View>
);

// Welcome Section Component
const WelcomeSection = () => (
  <View style={styles.welcomeSection}>
    <View style={styles.welcomeTextContainer}>
      <Text style={styles.welcomeText1}>
        Al, Sat, Öğrenciler için Tek Bir Yerde!
      </Text>
      <Text style={styles.welcomeText2}>
        Kampüs Pazarın, öğrencilerin ihtiyaçlarını karşılayıp kullanmadıkları
        eşyaları kolayca paylaşabileceği güvenli ve ücretsiz bir platformdur.
      </Text>
    </View>
    <View style={styles.authLinks}>
      <Link href="/(auth)/sign-in" style={styles.authButton1}>
        <Text style={styles.authButtonText1}>Giriş Yap</Text>
      </Link>
      <Link href="/(auth)/sign-up" style={styles.authButton}>
        <Text style={styles.authButtonText}>Kayıt Ol</Text>
      </Link>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    paddingTop: 100,
    paddingHorizontal: 10,
  },
  gridContainerWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 30,
  },
  hexagon: {
    width: 100,
    height: 90,
    margin: 10,
  },
  hexagonInner: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  hexagonBefore: {
    position: 'absolute',
    top: -27.5,
    left: 0,
    borderStyle: 'solid',
    borderBottomWidth: 27.5,
    borderBottomColor: '#6747E9',
    borderLeftWidth: 50,
    borderLeftColor: 'transparent',
    borderRightWidth: 50,
    borderRightColor: 'transparent',
  },
  hexagonAfter: {
    position: 'absolute',
    bottom: -27.5,
    left: 0,
    borderStyle: 'solid',
    borderTopWidth: 27.5,
    borderTopColor: '#FFD42D',
    borderLeftWidth: 50,
    borderLeftColor: 'transparent',
    borderRightWidth: 50,
    borderRightColor: 'transparent',
  },
  welcomeSection: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
  },
  welcomeTextContainer: {
    marginBottom: 20,
  },
  welcomeText1: {
    fontSize: 30,
    color: '#393E52',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily:'Poppins-SemiBold',
  },
  welcomeText2: {
    fontSize: 16,
    color: '#393E52',
    textAlign: 'left',
    lineHeight: 20,
    marginTop:30,
    fontFamily:'Poppins-Regular',
  },
  authLinks: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop:30,
  },
  authButton: {
    backgroundColor: '#6747E9',
    paddingVertical: 15,
    paddingHorizontal: 35,
    borderRadius: 30,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,

  },
  authButton1: {
    backgroundColor: '#FFD42D',
    paddingVertical: 15,
    paddingHorizontal: 35,
    borderRadius: 30,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  authButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily:'Poppins-SemiBold',
  },
  authButtonText1: {
    color: '#393E52',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily:'Poppins-SemiBold',
  },
});
