import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  FlatList,
  Image,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import { app } from '@/firebaseConfig';
import { collection, getDocs, getFirestore, query, DocumentData, addDoc } from 'firebase/firestore';
import { Formik } from 'formik';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import 'react-native-get-random-values';
import { v4 as uuidv4, validate } from 'uuid';
import * as ImagePicker from 'expo-image-picker';
import { Client, Storage, Permission, Role } from "appwrite";
import Toast from 'react-native-toast-message';
import { useUser } from '@clerk/clerk-expo';
import { format } from 'date-fns';
interface FormValues {
  title: string;
  description: string;
  category: string;
  price: string;
  address: string;
  phone: string;
  image: string;
  createdAt: string;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    marginTop: 40,
  },
  form: {
    padding: 20,
    borderRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 15,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  pickerButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#f0f0f0',
    marginTop: 5,
  },
  pickerButtonText: {
    fontSize: 16,
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  modalItem: {
    padding: 10,
  },
  modalItemText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  map: {
    flex: 1,
  },
  imagePlaceholder: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
   
  },
  imagePlaceholderText: {
    color: '#666',
    fontSize: 16,
  },
  imagePlaceholderImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    objectFit: 'cover',
    resizeMode: 'cover',
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});

export default function AddPostScreen() {
  const currentDate = new Date().toLocaleTimeString();
  const [categoryList, setCategoryList] = useState<DocumentData[]>([]);
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [mapVisible, setMapVisible] = useState(false);
  const [currentAddress, setCurrentAddress] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const {user} = useUser();
  const [loading, setLoading] = useState(false);

  const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('67656cde003ba1a0c595');

  const storage = new Storage(client);

  const [selectedLocation, setSelectedLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });

  const db = getFirestore(app);

  useEffect(() => {
    getCategoryList();
  }, []);

  // Fetch category list from Firestore
  const getCategoryList = async () => {
    setCategoryList([]);
    const categoryQuery = query(collection(db, 'Category'));
    const querySnapshot = await getDocs(categoryQuery);

    querySnapshot.forEach((doc) => {
      setCategoryList((prevList) => [...prevList, doc.data()]);
    });
  };

  // Get Current Location and Address
  const getLocation = async (setFieldValue: (field: string, value: any) => void) => {
    try {
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      let reverseGeocode = await Location.reverseGeocodeAsync({ latitude, longitude });
      if (reverseGeocode.length > 0) {
        const { city, region, street } = reverseGeocode[0];
        const address = `${street}, ${city}, ${region}`;
        setCurrentAddress(address);
        setFieldValue('address', address);
      }
    } catch (error) {
      console.error("Konum alınamadı", error);
    }
  };

  const openPicker = () => setIsPickerVisible(true);
  const closePicker = () => setIsPickerVisible(false);

  const handleMapPress = async (e: { nativeEvent: { coordinate: { latitude: number; longitude: number } } }) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });

    // Perform reverse geocoding to get the city name
    let reverseGeocode = await Location.reverseGeocodeAsync({ latitude, longitude });
    if (reverseGeocode.length > 0) {
      const { city } = reverseGeocode[0];
      setCurrentAddress(city || 'Unknown');
    }
  };

  const handleCitySearch = (data: any, details: any) => {
    const { lat, lng } = details.geometry.location;
    setSelectedLocation({ latitude: lat, longitude: lng });
    setCurrentAddress(data.description);
  };

  const newUUID = uuidv4();
  console.log(newUUID);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'images',
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });

      if (!result.canceled && result.assets.length > 0) {
        const imageAsset = result.assets[0];
        console.log("Selected Image Asset:", imageAsset);
        setImage(imageAsset.uri);
      } else {
        console.log("No image selected");
        Toast.show({
          type: 'info',
          text1: 'Image Selection',
          text2: 'No image was selected.',
        });
      }
    } catch (error) {
      console.error("Image picking failed", error);
      handleError(error);
    }
  };

  const handleError = (error: any) => {
    Toast.show({
      type: 'error',
      text1: 'Yetkilendirme Hatası',
      text2: error.message || 'Bu işlemi gerçekleştirme yetkiniz yok.',
    });
  };

  const onSubmitMethod = async (value: FormValues) => {
    setLoading(true);
    try {
      const docRef = await addDoc(collection(db, 'UserPost'), {
        title: value.title,
        description: value.description,
        category: value.category,
        price: value.price,
        address: currentAddress,
        phone: value.phone,
        image: image,
        username: user?.fullName,
        useremail: user?.emailAddresses[0]?.emailAddress,
        userimage: user?.imageUrl,
        createdAt: format(new Date(), 'MMMM do yyyy, h:mm:ss a'),
      });

      if (docRef.id) {
        setLoading(false);
        Alert.alert("İlan başarıyla oluşturuldu.");
      }
    } catch (error) {
      handleError(error);
    } 
  };

  return (
    <KeyboardAvoidingView behavior='padding' style={{flex:1,marginBottom: 100}}>
      <View style={styles.container}>
        <ScrollView>
          <Formik
            initialValues={{
              title: '',
              description: '',
              category: '',
              price: '',
              address: '',
              phone: '',
              image: '',
              username: '',
              useremail: '',
              userimage: '',
              createdAt: new Date().toISOString(),
            }}
            onSubmit={value => onSubmitMethod(value)}
            validate={values => {
              const errors: any = {};
              if (!values.title) {
                errors.title = 'İlan Adı gerekli';
                console.error(errors.title);
              }
              if (!values.description) {
                errors.description = 'İlan Detayı gerekli';
                console.error(errors.description);
              }
              if (!values.category) {
                errors.category = 'Kategori gerekli';
                console.error(errors.category);
              }
              if (!values.price) {
                errors.price = 'Fiyat gerekli';
                console.error(errors.price);
              }
              if (!currentAddress) {
                errors.address = 'Adres gerekli';
                console.error(errors.address);
              }
              if (!values.phone) {
                errors.phone = 'Telefon gerekli';
                console.error(errors.phone);
              }
              return errors;
            }}
          >
            {({ handleChange, handleSubmit, handleBlur, values, setFieldValue, errors }) => (
              <View style={styles.form}>
                <Text style={styles.title}>Yeni İlan Oluştur</Text>
                <TouchableOpacity onPress={pickImage}>
                  <View style={styles.inputGroup}>
                    <View style={styles.imagePlaceholder}>
                      {image ? (
                        <Image source={{ uri: image }} style={styles.imagePlaceholderImage} />
                      ) : (
                        <Text style={styles.imagePlaceholderText}>Görsel Yükle</Text>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>İlan Adı</Text>
                  <TextInput
                    value={values.title}
                    onChangeText={handleChange('title')}
                    onBlur={handleBlur('title')}
                    style={styles.input}
                  />
                  {errors.title && <Text style={styles.error}>{errors.title}</Text>}
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>İlan Detayı</Text>
                  <TextInput
                    value={values.description}
                    onChangeText={handleChange('description')}
                    onBlur={handleBlur('description')}
                    style={[styles.input, { height: 80, textAlignVertical: 'top' }]}
                    multiline
                  />
                  {errors.description && <Text style={styles.error}>{errors.description}</Text>}
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Kategori Seçiniz</Text>
                  <TouchableOpacity style={styles.pickerButton} onPress={openPicker}>
                    <Text style={styles.pickerButtonText}>
                      {selectedCategory || 'Kategori Seçiniz'}
                    </Text>
                  </TouchableOpacity>
                  {errors.category && <Text style={styles.error}>{errors.category}</Text>}
                </View>

                {/* Category Modal */}
                <Modal visible={isPickerVisible} animationType="fade" transparent={true} onRequestClose={closePicker}>
                  <TouchableWithoutFeedback onPress={closePicker}>
                    <View style={styles.modalOverlay}>
                      <View style={styles.modalContainer}>
                        <FlatList
                          data={categoryList}
                          keyExtractor={(item, index) => index.toString()}
                          renderItem={({ item }) => (
                            <TouchableOpacity
                              style={styles.modalItem}
                              onPress={() => {
                                setSelectedCategory(item?.name || '');
                                setFieldValue('category', item?.name || '');
                                closePicker();
                              }}
                            >
                              <Text style={styles.modalItemText}>{item?.name || 'Unknown'}</Text>
                            </TouchableOpacity>
                          )}
                        />
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                </Modal>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Adres</Text>
                  <TouchableOpacity onPress={() => getLocation(setFieldValue)} style={styles.pickerButton}>
                    <Text style={styles.pickerButtonText}>
                      {currentAddress || 'Mevcut Konumu Kullan'}
                    </Text>
                  </TouchableOpacity>
                  {!currentAddress && errors.address && <Text style={styles.error}>{errors.address}</Text>}
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Fiyat (₺)</Text>
                  <TextInput
                    value={values.price}
                    keyboardType="numeric"
                    onChangeText={handleChange('price')}
                    onBlur={handleBlur('price')}
                    style={styles.input}
                    placeholder="₺"
                  />
                  {errors.price && <Text style={styles.error}>{errors.price}</Text>}
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Telefon</Text>
                  <TextInput
                    value={values.phone}
                    onChangeText={handleChange('phone')}
                    onBlur={handleBlur('phone')}
                    keyboardType="phone-pad"
                    style={styles.input}
                    placeholder="+90"
                  />
                  {errors.phone && <Text style={styles.error}>{errors.phone}</Text>}
                </View>

                <TouchableOpacity style={styles.submitButton} onPress={() => handleSubmit()}>
                  {loading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.submitButtonText}>İlanı Oluştur</Text>}
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}
