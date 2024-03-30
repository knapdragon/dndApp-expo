import React, {useState} from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import styles from '../../styles.tsx';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainMenu from '../MainMenu.tsx';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import sheetsData from './../../userdata/sheetsData.tsx';

type ItemData = {
	id: number;
	image: Image;
	name: string;
  charLvl: number;
	race: string;
	mainClass: string;
  multiClass: Array<String>;
  };

type ItemProps = {
	item: ItemData;
	onPress: () => navigation.navigate('CharacterSheet', {id: item.id});
	backgroundColor: string;
	textColor: string;
};

const Item = ({item, onPress, backgroundColor, textColor}: ItemProps) => (
	<TouchableOpacity onPress={onPress} style={[styles.listItem, {backgroundColor}]}>
		<Text style={[styles.text, {color: textColor}]}>{item.name}</Text>
    <Text style={[styles.text, {color: textColor}, {fontSize: 14}]}>Level {item.charLvl} {item.race} {item.mainClass}{item.multiClass}</Text>
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
        <View style={[styles.frame, {backgroundColor: '#f55'}]}>
          <Text style={styles.title}>Sheets</Text>

          <Menu style={[styles.menu, styles.newMenu]}>
            <MenuTrigger text='New...' />
              <MenuOptions>
                <MenuOption onSelect={() => {}} text='Sheet'/>
              </MenuOptions>
          </Menu>

          <MainMenu />
        </View>
      </View>

      <FlatList 
        data={sheetsData.sheets}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
		    extraData={selectedId}/>
    </View>
  );
};

export default Sheets;
