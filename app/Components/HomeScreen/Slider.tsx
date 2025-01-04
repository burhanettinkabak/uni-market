import React from 'react';
import { View, FlatList, Image, StyleSheet, Dimensions, Text } from 'react-native';

const sliderData = [
  { 
    image: require('../../../assets/images/slider12.png'),
    text: "Uni Market'e Hoş Geldiniz.",
  },
  { 
    image: require('../../../assets/images/slider7.png'),
    text: "Sadece Öğrenciler İçin!",
  },
  { 
    image: require('../../../assets/images/slider11.png'),
    text: "Kampüsünüzdeki Marketi Keşfedin.",
  },
  // Add more images and text as needed
];

export default function Slider() {
  return (
    <View style={styles.container}>
      <FlatList
        data={sliderData}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            <Image source={item.image} style={styles.image} resizeMode="cover" />
            <View style={styles.textOverlay}>
              <Text style={styles.overlayText}>{item.text}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => `slider-image-${index}`}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  imageContainer: {
    marginHorizontal: 20,
    borderRadius: 10,
    overflow: 'hidden', // Ensures the overlay respects the image's border radius
   
  },
  image: {
    width: Dimensions.get('window').width * 0.9,
    height: 180,
  },
  textOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Semi-transparent background for better text readability
  },
  overlayText: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
});
