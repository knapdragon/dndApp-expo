import React, { useState } from 'react';
import { Text, View, Modal, Pressable } from 'react-native';
import { Button, Switch } from 'react-native-paper';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import styles from '../styles';

const MainMenu: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const toggleTheme = () => {

  }
  
  return (
    <View>
      <Menu style={[styles.menu, styles.mainMenu]}>
        <MenuTrigger text='Options' />
          <MenuOptions>
            <MenuOption onSelect={() => {}} />
            <MenuOption onSelect={() => {}} />
            <MenuOption onSelect={() => {setModalVisible(true)}} text='Settings'/>
          </MenuOptions>
      </Menu>

      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible)
        }}>
          <View style={styles.container}>
            <Text style={styles.text}>Settings</Text>

            <Button onPress={() => setModalVisible(false)} children={"Close"}/> 

            <Text style={{fontSize: 12}}>Theme</Text>
            <Switch
              onValueChange={toggleTheme}/>
          </View>
      </Modal>
    </View>
  );
};

export default MainMenu;
