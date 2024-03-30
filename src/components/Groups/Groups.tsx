import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import styles from '../../styles.tsx';
import MainMenu from '../MainMenu.tsx';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import groupsData from './../../userdata/groupsData.tsx';

type ItemData = {
	id: number,
  title: string,
  image: Image,
  labels: Array<String>,
  currentPlayers: number,
  maxPlayers: number,
  description: string,
  };

type ItemProps = {
	item: ItemData;
	onPress: () => void;
	backgroundColor: string;
	textColor: string;
};

const Item = ({item, onPress, backgroundColor, textColor}: ItemProps) => (
	<TouchableOpacity onPress={onPress} style={[styles.listItem, {backgroundColor}]}>
		<Text style={[styles.text, {color: textColor}]}>
      {item.title} {item.currentPlayers}/{item.maxPlayers}
    </Text>
    <Text style={[styles.text, {color: textColor}, {fontSize: 13}, {paddingBottom: 5}]}>
      {item.labels.join(", ")}
    </Text>
    <Text style={[styles.text, {color: textColor}, {fontSize: 14}]}>
      {item.description}
    </Text>
	</TouchableOpacity>
);

const Groups: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>();
  const renderItem = ({item}: {item: ItemData}) => {
    const backgroundColor = item.id.toString() === selectedId ? '#6e3b6e' : '#f9c2ff';
    const color = item.id.toString() === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id.toString())}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };
  
  return (
    <View style={styles.container}>
      <View style={[styles.frame, {backgroundColor: '#228'}]}> 
        <Text style={[styles.title, {color: '#fff'}]}>Social Groups</Text>
        <Menu style={[styles.menu, styles.newMenu]}>
          <MenuTrigger text='New...' />
            <MenuOptions>
              <MenuOption onSelect={() => {}} text='Group'/>
            </MenuOptions>
        </Menu>

        <MainMenu />
      </View>

      <FlatList 
        data={groupsData.groups}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
		    extraData={selectedId}/>
    </View>
  );
};

export default Groups;
