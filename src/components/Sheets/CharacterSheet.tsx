import React, { useCallback, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { View, Text, SectionList, TouchableOpacity, FlatList } from 'react-native';

// styling
import styles, { Colors } from '../../styles.tsx';
import { TextInput } from 'react-native-paper';
import { Card, Divider, Overlay, SearchBar } from '@rneui/themed';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

// data
import equipmentSRD from '../../assets/srd_compendium/JSON/5e-SRD-Equipment.json';
import { equipmentData } from '../../assets/srd_compendium/JSON/index.tsx';
import sheetsData from '../../userdata/sheetsData.json';

interface SheetProps {
  navigation: any
}

/**
 * Alerts the user with the result of the given item roll.
 * @param item The item for which to roll
 */
function rollDice(item: any, rollType: string) {
  let total = 0;
  const rolls: number[] = [];

  let dieType: string = '';
  let dieQuantity: number = 1;
  // get die number
  if (rollType === 'damage') {
    const toSlice = item.damage.damage_dice.length - 1;
    dieType = item.damage.damage_dice.slice(-toSlice);

    dieQuantity = item.damage.damage_dice.slice(0, 1)
  } else if (rollType === 'accuracy') {
    dieType = '20';
    dieQuantity = 1;
  }

  // roll a given dice type 'quantity' times
  for (let i = 0; i < dieQuantity; i++) {
    let roll = Math.ceil(Math.random() * parseInt(dieType))
    rolls.push(roll)
    total += roll;
  }

  alert(total)
}

export const Character: React.FC<SheetProps> = ({navigation}) => {
  let route: any = useRoute();
  let characterId: number = route.params.characterId;
  const thisSheet = sheetsData[(characterId - 1)];

  /**
   * Updates character statistics based on type, as indicated by their labels.
   * @param type The type of statistic to update
   * @param input The value of the input
   */
  function handleInputChange(type: string, input: string): void {
    switch (type) {
      case 'armour-class': 
        thisSheet.attributes.armourClass = parseInt(input);
      case 'hp-current':
        thisSheet.attributes.hitPointsCurrent = parseInt(input);
        break;
      case 'hp-max':
        thisSheet.attributes.hitPointsMax = parseInt(input);
        break;
      case 'temporary-hitpoints':
        thisSheet.attributes.hitPointsTemporary = parseInt(input);
        break;

      case 'speed':
        thisSheet.attributes.speed = parseInt(input);
        break;
      case 'fly-speed':
        thisSheet.attributes.flySpeed = parseInt(input);
        break;
      case 'swim-speed':
        thisSheet.attributes.swimSpeed = parseInt(input);
        break;
      case 'climb-speed':
        thisSheet.attributes.climbSpeed = parseInt(input);
        break;

      case 'strength':
        thisSheet.attributes.abilities.strength = parseInt(input);
        break;
      case 'dexterity':
        thisSheet.attributes.abilities.dexterity = parseInt(input);
        break;
      case 'constitution':
        thisSheet.attributes.abilities.constitution = parseInt(input);
        break;
      case 'intelligence':
        thisSheet.attributes.abilities.intelligence = parseInt(input);
        break;
      case 'wisdom':
        thisSheet.attributes.abilities.wisdom = parseInt(input);
        break;
      case 'charisma':
        thisSheet.attributes.abilities.charisma = parseInt(input);
        break;
    }
  }

  return (
    <View style={styles.container}>

      <View style={styles.sheetHeader}>
        <Text style={styles.sheetHeaderText}>Stats</Text>
      </View>

      <View style={[styles.evenRowView, {marginTop: 5}]}>
        <View id="armour-class" style={styles.evenColumnView}>
          <Text>Armour Class</Text>
          <TextInput style={styles.smallNumericInputs}
            contentStyle={styles.smallNumericContent}
            defaultValue={thisSheet.attributes.armourClass.toString()}
            onEndEditing={(e) => handleInputChange('armour-class', e.nativeEvent.text)}/>
        </View>
        <View id="hit-points" style={styles.evenColumnView}>
          <Text>Hit Points</Text>
          <TextInput style={styles.smallNumericInputs}
            contentStyle={styles.smallNumericContent}
            defaultValue={thisSheet.attributes.hitPointsMax.toString()}
            onEndEditing={(e) => handleInputChange('hp-current', e.nativeEvent.text)}/>
        </View>
        <View id="temporary-hitpoints" style={styles.evenColumnView}>
        <Text>Temporary HP</Text>
          <TextInput style={styles.smallNumericInputs}
            contentStyle={styles.smallNumericContent}
            defaultValue={thisSheet.attributes.hitPointsTemporary.toString()}
            onEndEditing={(e) => handleInputChange('temporary-hitpoints', e.nativeEvent.text)}/>
        </View>
      </View>

      <Divider color={'#555'} style={{marginVertical: 10, marginHorizontal: 10}}/>
      
      <View style={styles.evenRowView}>
        <View id="speed" style={styles.evenColumnView}>
          <Text>Speed</Text>
          <TextInput style={styles.smallNumericInputs}
            contentStyle={styles.smallNumericContent}
            defaultValue={thisSheet.attributes.speed.toString()}
            onEndEditing={(e) => handleInputChange('speed', e.nativeEvent.text)}/>
        </View>
        <View id="fly-speed" style={styles.evenColumnView}>
          <Text>Fly Speed</Text>
          <TextInput style={styles.smallNumericInputs}
            contentStyle={styles.smallNumericContent}
            defaultValue={thisSheet.attributes.flySpeed.toString()}
            onEndEditing={(e) => handleInputChange('fly-speed', e.nativeEvent.text)}/>
        </View>
        <View id="climb-speed" style={styles.evenColumnView}>
          <Text>Climb Speed</Text>
          <TextInput style={styles.smallNumericInputs}
            contentStyle={styles.smallNumericContent}
            defaultValue={thisSheet.attributes.climbSpeed.toString()}
            onEndEditing={(e) => handleInputChange('swim-speed', e.nativeEvent.text)}/>
        </View>
        <View id="swim-speed" style={styles.evenColumnView}>
          <Text>Swim Speed</Text>   
          <TextInput style={styles.smallNumericInputs}
            contentStyle={styles.smallNumericContent}
            defaultValue={thisSheet.attributes.swimSpeed.toString()}
            onEndEditing={(e) => handleInputChange('climb-speed', e.nativeEvent.text)}/>
        </View>
      </View>

      <Divider color={'#555'} style={{marginVertical: 10, marginHorizontal: 10}}/>
      
      <View id="ability-scores-physical" style={styles.evenRowView}>
        <View id="ability-strength" style={styles.evenColumnView}>
         <Text>Strength</Text>
         <TextInput style={styles.smallNumericInputs}
          contentStyle={styles.smallNumericContent}
          defaultValue={thisSheet.attributes.abilities.strength.toString()}
          onEndEditing={(e) => handleInputChange('strength', e.nativeEvent.text)}/>
        </View>
        <View id="ability-dexterity" style={styles.evenColumnView}>
          <Text>Dexterity</Text>
          <TextInput style={styles.smallNumericInputs}
            contentStyle={styles.smallNumericContent}
            defaultValue={thisSheet.attributes.abilities.dexterity.toString()}
            onEndEditing={(e) => handleInputChange('dexterity', e.nativeEvent.text)}/>
        </View>
        <View id="ability-constitution" style={styles.evenColumnView}>
          <Text>Constitution</Text>
          <TextInput style={styles.smallNumericInputs}
            contentStyle={styles.smallNumericContent}
            defaultValue={thisSheet.attributes.abilities.constitution.toString()}
            onEndEditing={(e) => handleInputChange('constitution', e.nativeEvent.text)}/>
        </View>
      </View>
      <View id="ability-scores-mental" style={[styles.evenRowView, {marginTop: 5}]}>
        <View id="ability-intelligence" style={styles.evenColumnView}>
          <Text>Intelligence</Text>
          <TextInput style={styles.smallNumericInputs}
            contentStyle={styles.smallNumericContent}
            defaultValue={thisSheet.attributes.abilities.intelligence.toString()}
            onEndEditing={(e) => handleInputChange('intelligence', e.nativeEvent.text)}/>
        </View>
        <View id="ability-wisdom" style={styles.evenColumnView}>
          <Text>Wisdom</Text>
          <TextInput style={styles.smallNumericInputs}
            contentStyle={styles.smallNumericContent}
            defaultValue={thisSheet.attributes.abilities.wisdom.toString()}
            onEndEditing={(e) => handleInputChange('wisdom', e.nativeEvent.text)}/>
        </View>
        <View id="ability-charisma" style={styles.evenColumnView}>
          <Text>Charisma</Text>
          <TextInput style={styles.smallNumericInputs}
            contentStyle={styles.smallNumericContent}
            defaultValue={thisSheet.attributes.abilities.charisma.toString()}
            onEndEditing={(e) => handleInputChange('charisma', e.nativeEvent.text)}/>
        </View>
      </View>
    
      <View style={[styles.sheetHeader, {marginTop: 15}]}>
        <Text style={styles.sheetHeaderText}>Details</Text>
      </View>
    </View>
  )
}

export const Actions: React.FC<SheetProps> = ({navigation}) => {
  let route: any = useRoute();
  let characterId: number = route.params.characterId;
  const thisSheet = sheetsData[(characterId - 1)];
  
  type InventoryItem = {
    name: string,
    category: string,
    quantity: number
  }

  const weapons = [];
  // for each weapon in the inventory, add it to the weapons array
  for (let item of thisSheet.inventory.items) {
    if (item.category === 'Weapons') {
      let weaponData = equipmentData.Weapons.filter((weapon) => weapon.name === item.name)[0]
      Object.assign(weaponData, {owned: item.quantity});
      weapons.push(weaponData);
    }
  }
  
  let weaponDesc: string | null = null;
  // check each weapon for a description
  for (let item of weapons) {
    if (Object.hasOwn(item, 'desc')) {
      weaponDesc = item.desc![1];
    }
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.sheetHeader}>
        <Text style={styles.sheetHeaderText}>Weapons</Text>
      </View>

      <FlatList 
        data={weapons}
        keyExtractor={(item) => item.name}
        renderItem={({item}) => (
          <Card>
            <View>
              {/* @ts-expect-error - 'owned' not originally part of a weapon object, but added anyway*/}
              <Text style={{fontSize: 18}}>{item.name}    x{item.owned}</Text>
              <Text style={{fontSize: 13}}>{item.category_range}</Text>

              <View style={{marginTop: 10}} />
              <View style={[styles.evenRowView, {justifyContent: 'flex-start'}]}>
                <Text style={{fontSize: 16}}>To Hit:      1d20</Text>
                <Icon name="dice-multiple" 
                  color={Colors.diceRoller.primary} 
                  size={20} 
                  style={{left: '50%'}}
                  onPress={() => rollDice(item, 'accuracy')}/>
              </View>
              <View style={[styles.evenRowView, {justifyContent: 'flex-start'}]}>
                <Text style={{fontSize: 16}}>Damage:  {item.damage?.damage_dice} {item.damage?.damage_type.name}</Text>
                <Icon name="dice-multiple" 
                  color={Colors.diceRoller.primary} 
                  size={20} 
                  style={{left: '50%'}}
                  onPress={() => rollDice(item, 'damage')}/>
              </View>

              <Text>{weaponDesc !== null && weaponDesc}</Text>
            </View>
          </Card>
        )}
        />

      <View style={[styles.sheetHeader, {marginTop: 15}]}>
        <Text style={styles.sheetHeaderText}>Spells</Text>
      </View>
    </View>
  )
}

export const Inventory: React.FC<SheetProps> = ({navigation}) => {
  let route: any = useRoute();
  let characterId: number = route.params.characterId;
  const thisSheet = sheetsData[(characterId - 1)];

  type InventoryItem = {
    name: string,
    category: string,
    quantity: number,
  }
  const [inventory, setInventory] = useState<InventoryItem[]>(thisSheet.inventory.items);

  function inspectItem(item: InventoryItem): void {
    let category = item.category;
    // @ts-ignore - currently prints the whole category???
    //let itemInformation = equipmentData[category].find((item) => item.name === item.name);
    //alert(JSON.stringify(itemInformation)); // temporary measures

    console.log(item.category)
    console.log(item.quantity)
  }

  function addItemToInventory(itemToAdd: any): void {
    const itemData = itemToAdd; // additional item data may be useful
    let newItem = {
      name: itemData.name,    // use item's existing name
      category: itemData.equipment_category.name,  // use item's existing category
      quantity: itemData.quantity !== undefined ? itemData.quantity : 1
    };

    let itemDidExist = false;
    // if item exists in inventory, increment quantity
    for (let item of inventory) {
      if (item.name === newItem.name) {
        item.quantity += 1;
        itemDidExist = true;
        setInventory([...inventory]);
      }
    }
    // if no such item was found, add it to the inventory
    if (!itemDidExist) {
      setInventory([...inventory, newItem]);
    }
  }

  // SearchOverlay states & component
  const [overlayVisible, setOverlayVisible] = useState(false);
  function toggleOverlay() {
    setOverlayVisible(!overlayVisible)
  }
  
  const SearchOverlay = () => {
    let sections = []

    for (let i = 0; i < equipmentData.Categories.length; i++) {
      let itemsInCategory = equipmentSRD.filter((item) => item.equipment_category.name === equipmentData.Categories[i]);
      sections.push({title: equipmentData.Categories[i], data: itemsInCategory});
    }

    const allItems: any[] = [];
    for (let item of equipmentSRD) {
      allItems.push(item);
    }

    const [search, setSearch] = useState('');
    let filteredSections: any[] = [...sections];
    const handleSearchChange = useCallback((searchInput: string) => {
      setSearch(searchInput)

      // The following does not properly filter
      {/*
      if (searchInput !== '') {
        filteredSections = sections.filter((section) => {
          return section.data.some((item) => {
            return item.name.toLowerCase().includes(searchInput.toLowerCase())
          })
        })
      }
      */}
    }, [setSearch, ]);
    
    return (
      <>
        <Overlay 
          isVisible={overlayVisible}
          overlayStyle={{width: 400, height: 700, borderRadius: 20}}>
          <SearchBar 
            showLoading={true}
            containerStyle={{borderRadius: 10}}
            placeholder="Searching for an item..."
            onChangeText={(text) => handleSearchChange(text)}
            value={search}/>

          <Divider color={'#555'} style={{marginVertical: 10, marginHorizontal: 10}}/>

          <SectionList
            style={{marginBottom: 10}}
            sections={sections}
            keyExtractor={(item) => item.name}
            stickySectionHeadersEnabled={true}
            renderSectionHeader={({section: {title}}) => (
              <View style={{backgroundColor: '#fff'}}>
                <Text style={{fontSize: 18}}>{title}</Text>
                <Divider color={'#555'} style={{marginVertical: 3}}/>
              </View>
            )}
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => addItemToInventory(item)}>
                <View style={{marginHorizontal: 10, justifyContent: 'space-between'}}>
                  <Text style={{fontSize: 16}}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            )}
            renderSectionFooter={() => <View style={{marginBottom: 10}}/>}
            ItemSeparatorComponent={() => <Divider color={'#555'} style={{marginVertical: 3}}/>}
          />

          <TouchableOpacity onPress={() => toggleOverlay()}
            style={styles.closeSearch}>
            <Text style={{textAlign: 'center', fontSize: 16}}>Close</Text>
          </TouchableOpacity>
        </Overlay>
      </>
    )
  }

  {/* 
  const inventorySections = equipmentData['Categories'].map((category: string) => ({
    // section title is the category name
    key: category, 
    // section data is the list of items in that category, filtered from inventory 
    data: inventory.filter((item) => item.information.equipment_category.name === category),
  }));
  */}

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => toggleOverlay()}
        style={{padding: 10, backgroundColor: '#eee', flexDirection: 'row'}}>
          <Icon name="plus" size={20} color='#888'/>
          <Text style={{marginLeft: 5}}>Add item</Text>
      </TouchableOpacity>

      <FlatList 
        data={inventory}
        keyExtractor={(item) => item.name}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => inspectItem(item)}>
            <View style={[styles.evenRowView, {marginHorizontal: 10, justifyContent: 'space-between'}]}>
              <Text style={{fontSize: 16}}>{item.name}</Text>
              <Text style={{fontSize: 16, textAlign: 'right'}}>{item.quantity}</Text>
            </View>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <Divider color={'#555'} style={{marginVertical: 3}}/>}
        />

        <SearchOverlay />
      {/*
      <SectionList
        sections={[inventorySections]}
        keyExtractor={(item) => item.name}
        stickySectionHeadersEnabled={true}
        renderSectionHeader={({section}) => (
          <Text style={styles.text}>{section['key']}</Text>
        )}
        renderItem={({item}) => (
          <Text>{item['name']}</Text>
        )}
        />
      */}
        
    </View>
  )
}