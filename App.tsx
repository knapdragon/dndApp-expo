import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, TextInput, Button, SafeAreaView, View, StyleSheet, FlatList, Pressable } from 'react-native';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { MenuProvider, Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import styles from './src/styles.tsx';
import MainMenu from './src/components/MainMenu.tsx';
import Home from './src/components/Home.tsx';
import Settings from './src/components/Settings.tsx';
import Sheets from './src/components/Sheets/Sheets.tsx';
import Notes from './src/components/Notes/Notes.tsx';
import Groups from './src/components/Groups/Groups.tsx';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <MenuProvider>
      <NavigationContainer>
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />
            <MainMenu />

            <Tab.Navigator initialRouteName='Home' screenOptions={{headerShown: false}}>
              <Tab.Screen 
                name="Home" 
                component={Home} 
                options={{
                  tabBarActiveBackgroundColor: '#ccc',
                  tabBarInactiveBackgroundColor: '#676767',
                  tabBarActiveTintColor: '#000',
                  tabBarInactiveTintColor: '#fff',
                  tabBarLabelStyle: {fontSize: 14},
                  tabBarIcon: ({}) => (<Icon name="home" color={'black'} size={30}/>)}}/>

              <Tab.Screen 
                name="Sheets" 
                component={Sheets}
                options={{
                  tabBarActiveBackgroundColor: '#fab',
                  tabBarInactiveBackgroundColor: '#f22',
                  tabBarActiveTintColor: '#000',
                  tabBarInactiveTintColor: '#fff',
                  tabBarLabelStyle: {fontSize: 14},
                  tabBarIcon: ({}) => (<Icon name="notebook" color={'red'} size={30}/>)}}/>

              <Tab.Screen 
                name="Notes" 
                component={Notes}
                options={{
                  tabBarActiveBackgroundColor: '#bfb',
                  tabBarInactiveBackgroundColor: '#282',
                  tabBarActiveTintColor: '#000',
                  tabBarInactiveTintColor: '#fff',
                  tabBarLabelStyle: {fontSize: 14},
                    tabBarIcon: ({}) => (<Icon name="note-text" color={'green'} size={30}/>)}}/>

              <Tab.Screen 
                name="Groups" 
                component={Groups}
                options={{
                  tabBarActiveBackgroundColor: '#bbf',
                  tabBarInactiveBackgroundColor: '#228',
                  tabBarActiveTintColor: '#000',
                  tabBarInactiveTintColor: '#fff',
                  tabBarLabelStyle: {fontSize: 14},
                  tabBarIcon: ({}) => (<Icon name="account-group" color={'blue'} size={30}/>)}}/>
            </Tab.Navigator>

        </SafeAreaView>
      </NavigationContainer>
    </MenuProvider>
  );
}
