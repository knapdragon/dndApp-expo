import React, {useState} from 'react';
import { Text, FlatList, Pressable, TouchableNativeFeedback } from 'react-native';
import { Menu as PaperMenu, Button, Dialog } from 'react-native-paper';

// styling
import styles from '../../styles';

// data
import sheetsData from '../../userdata/sheetsData.json';

interface Props {
  navigation: any
}

const SheetList: React.FC<Props> = ({ navigation }) => {
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
  function handleItemSelect(item: ItemData): void {
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
    return (
      <PaperMenu
        visible={itemMenuVisible}
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
      <FlatList 
        data={sheetsData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        extraData={selectedId}
        style={{backgroundColor: '#fff'}}/>
    )
}

export default SheetList;