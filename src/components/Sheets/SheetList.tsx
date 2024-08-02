import React, { useCallback, useState } from 'react';
import { Text, FlatList, TouchableNativeFeedback, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// styling
import styles from '../../styles';
import { Menu as PaperMenu, Button, Dialog } from 'react-native-paper';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

// data
import { Character } from './CharacterSheet';
import { Actions } from './CharacterSheet';
import { Inventory } from './CharacterSheet';
import sheetsData from '../../userdata/sheetsData.json';
import CharacterSheetType from '../../userdata/sheetsDataType';

interface Props {
  navigation: any
}

const Tab = createMaterialTopTabNavigator();

export const SheetNavigation: React.FC<Props> = ({}) => {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        style={{padding: -30, borderBottomWidth: 1, borderBottomColor: 'silver'}}
        initialRouteName='Character' 
        backBehavior={'history'}>
        <Tab.Screen 
          name="Character"    // @ts-expect-error (affects next line)
          component={Character}
          options={{
            lazy: true,
            tabBarPressColor: '#ccf',
            tabBarIcon: ({}) => (<Icon name="account" color={'blue'} size={20}/>)}}/>

        <Tab.Screen 
          name="Actions"      // @ts-expect-error (affects next line)
          component={Actions}
          options={{
            lazy: true,
            tabBarPressColor: '#fcc',
            tabBarIndicatorStyle: {backgroundColor: '#f00'},
            tabBarIcon: ({}) => (<Icon name="sword-cross" color={'red'} size={20}/>)}}/>

        <Tab.Screen 
          name="Inventory"    // @ts-expect-error (affects next line)
          component={Inventory}
          options={{
            lazy: true,
            tabBarPressColor: '#cfc',
            tabBarIndicatorStyle: {backgroundColor: '#090'},
            tabBarIcon: ({}) => (<Icon name="sack" color={'green'} size={20}/>)}}/>
      </Tab.Navigator>
    </NavigationContainer>
  )
}

const SheetList: React.FC<Props> = ({ navigation }) => {
  const [sheetDialogVisible, setSheetDialogVisible] = useState(false);
  const [charSheet, setCharSheet] = useState<any>([]);

  // Rendering FlatList items
  type ItemData = CharacterSheetType;
  
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
  function handleCoords(event: any): void {
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
      <TouchableOpacity onPress={onPress} onLongPress={onLongPress}
        style={[styles.listItem, {backgroundColor}]}>
        <Text style={[styles.text, {color: textColor}]}>
          {item.name}
        </Text>
        <Text style={[styles.text, {color: textColor}, {fontSize: 14}]}>
          Level {item.characterLevel} {item.race} {item.mainClass}{item.multiClass?.length > 0 ? ' / ' + item.multiClass : null}
        </Text>
      </TouchableOpacity>
    </TouchableNativeFeedback>
  );

  const [selectedId, setSelectedId] = useState<string>();
  const handleItemSelect = useCallback((item: ItemData) => {
    setSelectedId(item.id.toString())
    var characterSheetData = sheetsData[Number(selectedId) - 1];
    setCharSheet(characterSheetData);

    setSheetDialogVisible(true);
  }, [Item]);

  /**
   * Renders FlatList elements as an Item using ItemData props
   * @param item An element in the FlatList array
   * @returns <Item>
   */
  const renderItem = ({item}: {item: ItemData}) => {
    const backgroundColor = item.id.toString() === selectedId ? '#777' : '#eee';
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
  function handleItemContextMenu(item: ItemData) {
    setSelectedId(item.id.toString())
    setItemMenuVisible(true);
    return (
      <PaperMenu
        visible={true}
        onDismiss={() => setItemMenuVisible(false)}
        anchor={selectedId}>
        <PaperMenu.Item title="Delete" onPress={() => deleteSheetDialog}/>
      </PaperMenu>
    );
  }

  /**
   * Opens a dialog to confirm the user's intentions to delete the sheet
   * @param item A given item from FlatList array
   * @returns A confirmation dialog to actually delete the sheet data
   */
  function deleteSheetDialog(item: ItemData) {
    const [delDialogVisible, setDelDialogVisible] = useState(false);
    function deleteSheet(item: ItemData) {
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
  
    return (
      <>
        <FlatList 
          // @ts-expect-error
          data={sheetsData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          extraData={selectedId}
          style={{backgroundColor: '#fff'}}/>

        <Dialog visible={sheetDialogVisible} style={{backgroundColor: '#fff', marginBottom: 130, height: '100%'}}>
          <Dialog.Title>{charSheet?.name}</Dialog.Title>
          <Text style={{marginHorizontal: 25, marginTop: -15}}>
            Level {charSheet?.characterLevel} {charSheet?.race} {charSheet?.mainClass}{charSheet?.multiClass}
          </Text>
          <View style={{marginTop: 15, borderBottomWidth: 1, borderBottomColor: 'gray'}} />

          <Dialog.Content>
            <Dialog.ScrollArea style={{height: '80%'}}>
                <FlatList 
                  style={{marginHorizontal: -48, marginBottom: -40}}
                  data={[]}
                  renderItem={null}
                  ListFooterComponent={<SheetNavigation navigation={navigation}/>}
                  />
            </Dialog.ScrollArea>
          </Dialog.Content>

          <View style={{flexDirection: 'row', alignItems: 'center', borderTopWidth: 1, borderTopColor: 'gray', marginTop: '-10%'}}>
            <Dialog.Actions>
              <Button onPress={() => setSheetDialogVisible(false)}>Close</Button>
            </Dialog.Actions>
          </View>
        </Dialog>
      </>
    )
}

export default SheetList;