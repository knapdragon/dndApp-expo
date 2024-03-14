import React from 'react';
import { View, Text, FlatList } from 'react-native';
import styles from '../styles.tsx';
import MainMenu from './MainMenu.tsx';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import groupsData from '../userdata/groupsData.js';

const Groups: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Social Groups</Text>
      <Menu style={[styles.menu, styles.newMenu]}>
        <MenuTrigger text='New...' />
          <MenuOptions>
            <MenuOption onSelect={() => {}} text='Group'/>
          </MenuOptions>
      </Menu>

      <MainMenu />

      <FlatList 
        data={groupsData.groups}
        renderItem={({item}) => (
          <View>
            <Text>{item.title} {item.currentPlayers}/{item.maxPlayers}</Text>
            {item.image}
            <Text>{item.labels}</Text>
            <Text>{item.description}</Text>
          </View>
          )}
          keyExtractor={(item) => item.id.toString()}/>
    </View>
  );
};

export default Groups;
