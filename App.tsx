import React, { useState } from 'react';
import { Text, TextInput, Button, SafeAreaView, View, StyleSheet, FlatList, Pressable } from 'react-native';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import styles from './styles.tsx';
import exampleData from './userdata/data';
import Home from './components/Home.tsx';
import Settings from './components/Settings.tsx';
import Sheets from './components/Sheets.tsx';
import Notes from './components/Notes.tsx';
import Groups from './components/Groups.tsx';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <SafeAreaView style={styles.container}>
          <StatusBar style="auto" />

          <Tab.Navigator>
            <Tab.Screen name="Home" component={Home}/>
            <Tab.Screen name="Sheets" component={Sheets}/>
            <Tab.Screen name="Notes" component={Notes}/>
            <Tab.Screen name="Groups" component={Groups}/>
          </Tab.Navigator>
    </SafeAreaView>
    </NavigationContainer>
  );
}
