import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles.tsx';
import MainMenu from './MainMenu.tsx';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import notesData from '../userdata/notesData.js';

const Notes: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notes</Text>
      <Menu style={[styles.menu, styles.newMenu]}>
        <MenuTrigger text='New...' />
          <MenuOptions>
            <MenuOption onSelect={() => {}} text='Folder'/>
            <MenuOption onSelect={() => {}} text='Note'/>
          </MenuOptions>
      </Menu>

      <MainMenu />

    </View>
  );
};

export default Notes;
