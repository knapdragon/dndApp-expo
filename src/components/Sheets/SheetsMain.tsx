import React, { useState, useContext } from 'react';
import { View, Text, FlatList, Image, Pressable, TouchableNativeFeedback } from 'react-native';

// Styling
import styles from '../../styles.tsx';
import { Appbar, Menu as PaperMenu, Button, Dialog, PaperProvider, Portal } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Data
import Settings from '../Settings.tsx';
import sheetsData from '../../userdata/sheetsData.json';
import SheetList from './SheetList.tsx';
import CharacterSheet from './CharacterSheet.tsx';
import MainMenu from '../MainMenu.tsx';
import NewMenu from '../NewMenu.tsx';

const Stack = createNativeStackNavigator();  

// Navigation
interface Props {
  navigation: any,
}

const Sheets: React.FC<Props> = ({ navigation }) => {
  const [tabOrigin, setTabOrigin] = useState('Sheets');

  {/* Appbar and related actions */}
  const [mainMenuVisible, setMainMenuVisible] = useState(false);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const closeSettingsDialog = () => {
    setSettingsVisible(false);
  }
  
  const [newMenuVisible, setNewMenuVisible] = useState(false);

  // Rendering FlatList items
  type ItemData = {
    id: number;
    image: string;
    name: string;
    charLvl: number;
    race: string;
    mainClass: string;
    multiClass: Array<String>;
    };
  
  type ItemProps = {
    item: ItemData;
    onPress: () => void; // see handleItemSelect
    onLongPress: () => void; // see handleItemContextMenu
    backgroundColor: string;
    textColor: string;
  };
  
  /**
   * Obtains coordinates of touch events for anchoring context menus.
   * @param event The touch event
   */
  const handleCoords = (event: any) => {
    const [touchEventCoords, setTouchEventCoords] = useState(Array<Number>);
    const coords = [
      event.nativeEvent.locationX, 
      event.nativeEvent.locationY
    ];
    setTouchEventCoords(coords);
  };

  /**
   * An item in the FlatList array
   * @param item The data to use
   * @func onPress Selects & navigates to sheet
   * @func onLongPress Opens context menu
   * @param backgroundColor Background color for the item 
   * @param textColor Text colors for the item
   * @returns <Pressable>
   */
  const Item = ({item, onPress, onLongPress, backgroundColor, textColor}: ItemProps) => (
    <TouchableNativeFeedback onPress={(event) => handleCoords(event)}>
      <Pressable onPress={onPress} onLongPress={onLongPress}
        style={[styles.listItem, {backgroundColor}]}>
        <Text style={[styles.text, {color: textColor}]}>
          {item.name}
        </Text>
        <Text style={[styles.text, {color: textColor}, {fontSize: 14}]}>
          Level {item.charLvl} {item.race} {item.mainClass}{item.multiClass}
        </Text>
      </Pressable>
    </TouchableNativeFeedback>
  );

  const [selectedId, setSelectedId] = useState<string>();
  const handleItemSelect = (item: ItemData) => {
    setSelectedId(item.id.toString())
    var characterSheetData = sheetsData[Number(selectedId)];
    navigation.navigate("CharacterSheet", characterSheetData)
  }

  /**
   * Renders FlatList elements as an Item using ItemData props
   * @param item An element in the FlatList array
   * @returns <Item>
   */
  const renderItem = ({item}: {item: ItemData}) => {
    const backgroundColor = item.id.toString() === selectedId ? '#1F89BD' : '#8AD9FF';
    const color = item.id.toString() === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => handleItemSelect(item)}
        onLongPress={() => handleItemContextMenu(item)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  // State variables for item context menu
  const [itemMenuVisible, setItemMenuVisible] = useState(false);

  /**
   * Handler for long-pressing a character sheet.
   * Offers the options [Delete].
   * @param item A given item in the FlatList array
   * @returns void
   */
  const handleItemContextMenu = (item: ItemData) => {
    setSelectedId(item.id.toString())
    return (
      <PaperMenu
        visible={itemMenuVisible}
        onDismiss={() => setItemMenuVisible(false)}
        anchor={selectedId}>
        <PaperMenu.Item title="Delete" onPress={() => deleteSheetDialog}/>
      </PaperMenu>
    );
  }

  const newSheet = () => {
    
  }

  /**
   * Opens a dialog to confirm the user's intentions to delete the sheet
   * @param item A given item from FlatList array
   * @returns A confirmation dialog to actually delete the sheet data
   */
  const deleteSheetDialog = (item: ItemData) => {
    const [delDialogVisible, setDelDialogVisible] = useState(false);
    const deleteSheet = (item: ItemData) => {
      sheetsData.splice(item.id);
      setDelDialogVisible(false);
    }
    return (
      <Dialog visible={delDialogVisible}>
        <Dialog.Content>
          <Text>Are you sure you want to delete {item.name}?</Text>
        </Dialog.Content>
        
        <Dialog.Actions>
          <Button style={[{flex: 1}, {justifyContent: 'flex-end'}, {backgroundColor: '#f00'}]} 
                  onPress={() => deleteSheet}>
            Yes, delete</Button>

          <Button style={[{flex: 1}, {justifyContent: 'flex-end'}, {backgroundColor: '#aaf'}]}
                  onPress={() => setDelDialogVisible(false)}>
            Cancel</Button>
        </Dialog.Actions>
      </Dialog>
    );
  }

  // Sheets starts
  return (
    <View style={styles.container}>
      <View>
        <Appbar.Header style={{backgroundColor: '#f55'}}>
          <Appbar.Content title="Sheets" titleStyle={{color: '#000'}}/>
              <NewMenu 
                tabOrigin={tabOrigin}
                enabled={newMenuVisible}
                setNewMenuVisible={setNewMenuVisible}
                newItem={newSheet}/>
              <MainMenu 
                tabOrigin={tabOrigin}
                enabled={mainMenuVisible}
                setSettingsVisible={setSettingsVisible}
                setMainMenuVisible={setMainMenuVisible}
                />
        </Appbar.Header>
      </View>
      
      <View style={styles.container}>
        <Stack.Navigator>
          <Stack.Screen name="Sheet" component={SheetList}/>
          {/*
          <FlatList 
            data={sheetsData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            extraData={selectedId}/>
            */}
        </Stack.Navigator>
      </View>

      <PaperProvider>
        <Portal>
          <Settings tabOrigin={tabOrigin} enabled={settingsVisible} closeDialog={closeSettingsDialog}/>
        </Portal>
      </PaperProvider>
    </View>
  );
};

export default Sheets;
