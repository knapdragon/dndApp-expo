import React from 'react';
import { View, Text, Button, Pressable } from 'react-native';
import styles from '../styles.tsx';
import MainMenu from './MainMenu.tsx';

const Home: React.FC = () => {
  return (
      <View style={styles.container}>
        <Text style={styles.title}>Home</Text>
        
        <MainMenu />
        
      </View>
  );
};

export default Home;
