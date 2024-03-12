import React, { useState } from 'react';
import { Text, TextInput, Button, SafeAreaView, View, StyleSheet, FlatList } from 'react-native';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import styles from './styles.tsx';
import exampleData from './userdata/data';
import Home from './components/Home.tsx';
import Sheets from './components/Sheets.tsx';
import Notes from './components/Notes.tsx';
import Groups from './components/Groups.tsx';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <Home></Home>
    </SafeAreaView>
  );
}
