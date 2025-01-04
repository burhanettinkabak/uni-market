import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons'; // Changed icon library to MaterialIcons
import InboxScreen from '../(Screens)/InboxScreen';
import HomeScreenNav from './HomeScreenNav';
import MyadsScreen from '../(Screens)/MyadsScreen';
import AddPostScreen from '../(Screens)/AddPostScreen';
import ProfileScreen from '../(Screens)/ProfileScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            position: 'absolute',
            bottom: 15,
            marginHorizontal: 10,
            height: 80,
            backgroundColor: '#0B0406',
            borderRadius: 45,
            borderTopWidth: 0,
            elevation: 3,
          },
          tabBarIconStyle: {
            justifyContent: 'center',
            alignItems: 'center',
            width: 30,
            height: 30,
          
          },
          tabBarItemStyle: {
            marginTop: 20,
            justifyContent: 'center',
            alignItems: 'center',
          },
          
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
            fontFamily: 'Poppins-SemiBold',
            backgroundColor: 'transparent',
          },
          tabBarActiveTintColor:'#6747E9', 
          tabBarInactiveTintColor: 'white',
          tabBarIcon: ({ color, size }) => {
            let iconName;
            let iconSize = 30; // Default icon size
            switch (route.name) {
              case 'Anasayfa':
                iconName = 'home';
                break;
              case 'Sohbetler':
                iconName = 'chat';
                break;
              case 'Sat':
                iconName = 'camera-alt';
                iconSize = 45; // Larger size for 'Sat'
                color = 'white';
                break;
              case 'İlanlarım':
                iconName = 'view-list';
                break;
              case 'Hesap':
                iconName = 'person';
                break;
            }
            return <MaterialIcons name={iconName as keyof typeof MaterialIcons.glyphMap} size={iconSize} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Anasayfa" component={HomeScreenNav} options={{ tabBarLabel: () => null }} />
        <Tab.Screen name="Sohbetler" component={InboxScreen} options={{ tabBarLabel: () => null }} />
        <Tab.Screen
          name="Sat"
          component={AddPostScreen}
          options={{
            tabBarLabel: () => null,
            tabBarIconStyle: {
              marginTop: -40,
              width: 70,
              height: 70,
              borderRadius: 35,
              backgroundColor: '#6747E9',
              borderWidth: 1, // Added border for 'Sat' icon
              borderColor: '#6747E9', // Border color
            },
          }}
        />
        <Tab.Screen name="İlanlarım" component={MyadsScreen} options={{ tabBarLabel: () => null }} />
        <Tab.Screen name="Hesap" component={ProfileScreen} options={{ tabBarLabel: () => null }} />
      </Tab.Navigator>
    </GestureHandlerRootView>
  );
}