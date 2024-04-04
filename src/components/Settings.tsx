import React from 'react';
import { View, Text, Button, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Appbar } from 'react-native-paper';
import styles from '../styles.tsx';

interface Props {
  navigation: any,
  previousScreen: string,
}

const Settings: React.FC<Props> = ({ navigation, previousScreen }) => {
  const settingsOptions = [
    {title: 'Theme', subTitle: 'Change the app colour scheme.', onPress: () => {}}
  ];

  return (
      <View style={styles.container}>
        <View> 
          <Appbar.Header style={{backgroundColor: '#ccc'}}>
            <Appbar.BackAction onPress={() => navigation.goBack()}/>
            <Appbar.Content title="Settings" />
          </Appbar.Header>
        </View>

        <View id="settings">
          
        </View>
      </View>
  );
};

export default Settings;
