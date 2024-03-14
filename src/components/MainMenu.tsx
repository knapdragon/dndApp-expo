import React from 'react';
import { View } from 'react-native';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import styles from '../styles';

const MainMenu: React.FC = () => {
  return (
    <View>
      <Menu style={[styles.menu, styles.mainMenu]}>
        <MenuTrigger text='Options' />
          <MenuOptions>
            <MenuOption onSelect={() => {}} />
            <MenuOption onSelect={() => {}} />
            <MenuOption onSelect={() => {}} text='Settings'/>
          </MenuOptions>
      </Menu>
    </View>
  );
};

export default MainMenu;
