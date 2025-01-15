import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import InboxScreen from '../(Screens)/InboxScreen';
import HomeScreenNav from './HomeScreenNav';
import MyadsScreen from '../(Screens)/MyadsScreen';
import AddPostScreen from '../(Screens)/AddPostScreen';
import ProfileScreen from '../(Screens)/ProfileScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            position: 'absolute',
            bottom: 15,
            marginHorizontal:15,
            height: 80, 
            backgroundColor: '#0B0406',
            borderRadius: 40, 
            borderTopWidth: 0,
            elevation: 5,
          },
          tabBarIconStyle: {
            justifyContent: 'center',
            alignItems: 'center',
            width: 45, 
            height: 45,
          },
          tabBarItemStyle: {
            marginTop: 15, 
            justifyContent: 'center',
            alignItems: 'center',
          },
          tabBarLabelStyle: {
            fontSize: 13, 
            fontWeight: 'bold',
            fontFamily: 'Poppins-SemiBold',
            backgroundColor: 'transparent',
          },
          tabBarActiveTintColor: '#6747E9',
          tabBarInactiveTintColor: 'white',
          tabBarIcon: ({ color, size }) => {
            let iconName;
            let iconSize = 35;
            switch (route.name) {
              case 'Home':
                iconName = 'home';
                break;
              case 'Chats':
                iconName = 'chat';
                break;
              case 'AddPost':
                iconName = 'camera-alt';
                iconSize = 50; 
                color = 'white';
                break;
              case 'Myads':
                iconName = 'view-list';
                break;
              case 'Profile':
                iconName = 'person';
                break;
            }
            return <MaterialIcons name={iconName as keyof typeof MaterialIcons.glyphMap} size={iconSize} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreenNav} options={{ tabBarLabel: () => null }} />
        <Tab.Screen name="Chats" component={InboxScreen} options={{ tabBarLabel: () => null }} />
        <Tab.Screen
          name="AddPost"
          component={AddPostScreen}
          options={{
            tabBarLabel: () => null,
            tabBarIconStyle: {
              marginTop: -45, 
              width: 75, 
              height: 75, 
              borderRadius: 42.5, 
              backgroundColor: '#6747E9',
              borderWidth: 2,
              borderColor: '#6747E9',
            },
          }}
        />
        <Tab.Screen name="Myads" component={MyadsScreen} options={{ tabBarLabel: () => null }} />
        <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: () => null }} />
      </Tab.Navigator>
    </GestureHandlerRootView>
  );
}