import React, {useState} from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import styles from '../styles.tsx';
import MainMenu from './MainMenu.tsx';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import sheetsData from '../userdata/sheetsData.js';

type ItemData = {
	id: number;
	image: Image;
	title: string;
	race: string;
	class: string;
  };

type ItemProps = {
	item: ItemData;
	onPress: () => void;
	backgroundColor: string;
	textColor: string;
};

const Item = ({item, onPress, backgroundColor, textColor}: ItemProps) => (
	<TouchableOpacity onPress={onPress} style={[styles.listItem, {backgroundColor}]}>
		<Text style={[styles.text, {color: textColor}]}>{item.title}</Text>
	</TouchableOpacity>
);


const Sheets: React.FC = () => {
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

  // Sheets starts
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Sheets</Text>
        <Menu style={[styles.menu, styles.newMenu]}>
          <MenuTrigger text='New...' />
            <MenuOptions>
              <MenuOption onSelect={() => {}} text='Sheet'/>
            </MenuOptions>
        </Menu>
        <MainMenu />
      </View>

      <FlatList 
        data={sheetsData.sheets}
        renderItem={renderItem}
		
		/*
		renderItem={({item}) => (
          <View>
            {item.image}
			<Text>{item.title}, {item.race} {item.class}</Text>
          </View>
		)} */

          keyExtractor={(item) => item.id.toString()}
		  extraData={selectedId}/>
    </View>
  );
};

export default Sheets;
