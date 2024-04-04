import React from 'react';
import { View, Text, Button, Pressable } from 'react-native';
import { Appbar } from 'react-native-paper';
import styles from '../styles.tsx';

interface Props {
  navigation: any,
}

const Home: React.FC<Props> = ({ navigation }) => {
  return (
      <View style={styles.container}>
        <Appbar.Header style={{backgroundColor: '#ccc'}}>
          <Appbar.Content title="Home" />
          <Appbar.Action icon="menu" onPress={() => navigation.navigate('Settings')}/>
        </Appbar.Header>
        
      </View>
  );
};

export default Home;
