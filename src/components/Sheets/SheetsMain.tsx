import React, {useState} from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { Appbar, Menu as PaperMenu, Button } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import styles from '../../styles.tsx';
import sheetsData from '../../userdata/sheetsData.tsx';
import Settings from '../Settings.tsx';

const Stack = createNativeStackNavigator();

// Rendering FlatList items
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
	onPress: () => void; // navigation.navigate('CharacterSheet', {id: item.id});
	backgroundColor: string;
	textColor: string;
};

const Item = ({item, onPress, backgroundColor, textColor}: ItemProps) => (
	<TouchableOpacity onPress={onPress} style={[styles.listItem, {backgroundColor}]}>
    <Text style={[styles.text, {color: textColor}]}>
      {item.name}
    </Text>
    <Text style={[styles.text, {color: textColor}, {fontSize: 14}]}>
      Level {item.charLvl} {item.race} {item.mainClass}{item.multiClass}
    </Text>
    <Button
      icon="dots-vertical"
      style={[{width: '10%'}, {justifyContent: 'flex-end'}]}> </Button>
	</TouchableOpacity>
);

// Navigation
interface Props {
  navigation: any,
}

const Sheets: React.FC<Props> = ({ navigation }) => {

  // Appbar and related actions
  const [newMenuVisible, setNewMenuVisible] = useState(false);
  const openNewMenu = () => setNewMenuVisible(true);
  const closeNewMenu = () => setNewMenuVisible(false);

  const [mainMenuVisible, setMainMenuVisible] = useState(false);
  const openMainMenu = () => setMainMenuVisible(true);
  const closeMainMenu = () => setMainMenuVisible(false);

  // Rendering FlatList items
  const [selectedId, setSelectedId] = useState<string>();
  const handleItemSelect = (item: ItemData) => {
    setSelectedId(item.id.toString())
    navigation.navigate("CharacterSheet")
  }

  const renderItem = ({item}: {item: ItemData}) => {
    const backgroundColor = item.id.toString() === selectedId ? '#1F89BD' : '#8AD9FF';
    const color = item.id.toString() === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => handleItemSelect(item)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  // Sheets starts
  return (
    <View style={styles.container}>
      <View>
        <Appbar.Header style={{backgroundColor: '#f55'}}>
          <Appbar.Content title="Sheets" titleStyle={{color: '#000'}} />

          {/* 'New' menu */}
          <PaperMenu
            visible={newMenuVisible}
            onDismiss={closeNewMenu}
            anchor={
            <Appbar.Action
              color='black'
              icon="plus-outline" 
              onPress={() => openNewMenu}/>
            }>
            <PaperMenu.Item title="Note"/>
            <PaperMenu.Item title="Folder" />
          </PaperMenu>

            {/* Settings menu */}
          <PaperMenu
            visible={mainMenuVisible}
            onDismiss={closeMainMenu}
            anchor={
              <Appbar.Action 
              color='black' 
              icon="menu" 
              onPress={() => openMainMenu}/>
            }>
            <PaperMenu.Item 
              title="Settings" 
              onPress={() => navigation.navigate('Settings')}/>
          </PaperMenu>
        </Appbar.Header> 
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
