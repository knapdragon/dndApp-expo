import React, { useState } from 'react';
import { View, Text, SectionList, TouchableOpacity, FlatList } from 'react-native';

// styling
import styles from '../../styles.tsx';
import { TextInput } from 'react-native-paper';
import { Divider } from '@rneui/themed';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

// data
import { equipmentData } from '../../assets/srd_compendium/JSON/index.tsx';
import sheetsData from '../../userdata/sheetsData.json';

interface Props {
  navigation: any,
  characterId: string,
}

export const Character: React.FC<Props> = ({navigation}) => {
  
  return (
    <View style={styles.container}>
      <View style={[styles.evenRowView, {marginTop: 5}]}>
        <View id="armour-class" style={styles.evenColumnView}>
          <Text>Armour Class</Text>
          <TextInput style={styles.smallNumericInputs}
            contentStyle={styles.smallNumericContent}
            placeholder="10"/>
        </View>
        <View id="hit-points" style={styles.evenColumnView}>
          <Text>Hit Points</Text>
          <TextInput style={styles.smallNumericInputs}
            contentStyle={styles.smallNumericContent}
            placeholder="1"/>
        </View>
        <View id="temporary-hitpoints" style={styles.evenColumnView}>
        <Text>Temporary HP</Text>
          <TextInput style={styles.smallNumericInputs}
            contentStyle={styles.smallNumericContent}
            placeholder="0"/>
        </View>
      </View>

      <Divider color={'#555'} style={{marginVertical: 10, marginHorizontal: 10}}/>
      
      <View style={styles.evenRowView}>
        <View id="speed" style={styles.evenColumnView}>
          <Text>Speed</Text>
          <TextInput style={styles.smallNumericInputs}
            contentStyle={styles.smallNumericContent}
            placeholder="30"/>
        </View>
        <View id="fly-speed" style={styles.evenColumnView}>
          <Text>Fly Speed</Text>
          <TextInput style={styles.smallNumericInputs}
            contentStyle={styles.smallNumericContent}
            placeholder="0"/>
        </View>
        <View id="climb-speed" style={styles.evenColumnView}>
          <Text>Climb Speed</Text>
          <TextInput style={styles.smallNumericInputs}
            contentStyle={styles.smallNumericContent}
            placeholder="0"/>
        </View>
        <View id="swim-speed" style={styles.evenColumnView}>
          <Text>Swim Speed</Text>   
          <TextInput style={styles.smallNumericInputs}
            contentStyle={styles.smallNumericContent}
            placeholder="0"/>
        </View>
      </View>

      <Divider color={'#555'} style={{marginVertical: 10, marginHorizontal: 10}}/>
      
      <View id="ability-scores-physical" style={styles.evenRowView}>
        <View id="ability-strength" style={styles.evenColumnView}>
         <Text>Strength</Text>
         <TextInput style={styles.smallNumericInputs}
          contentStyle={styles.smallNumericContent}
          placeholder="0"/>
        </View>
        <View id="ability-dexterity" style={styles.evenColumnView}>
          <Text>Dexterity</Text>
          <TextInput style={styles.smallNumericInputs}
            contentStyle={styles.smallNumericContent}
            placeholder="0"/>
        </View>
        <View id="ability-constitution" style={styles.evenColumnView}>
          <Text>Constitution</Text>
          <TextInput style={styles.smallNumericInputs}
            contentStyle={styles.smallNumericContent}
            placeholder="0"/>
        </View>
      </View>
      <View id="ability-scores-mental" style={[styles.evenRowView, {marginTop: 5}]}>
        <View id="ability-intelligence" style={styles.evenColumnView}>
          <Text>Intelligence</Text>
          <TextInput style={styles.smallNumericInputs}
            contentStyle={styles.smallNumericContent}
            placeholder="0"/>
        </View>
        <View id="ability-wisdom" style={styles.evenColumnView}>
          <Text>Wisdom</Text>
          <TextInput style={styles.smallNumericInputs}
            contentStyle={styles.smallNumericContent}
            placeholder="0"/>
        </View>
        <View id="ability-charisma" style={styles.evenColumnView}>
          <Text>Charisma</Text>
          <TextInput style={styles.smallNumericInputs}
            contentStyle={styles.smallNumericContent}
            placeholder="0"/>
        </View>
      </View>

      <Divider color={'#555'} style={{marginVertical: 10, marginHorizontal: 10}}/>
    
    </View>
  )
}

export const Actions: React.FC<Props> = ({navigation}) => {
  
  return (
    <View style={styles.container}>
      
    </View>
  )
}

export const Inventory: React.FC<Props> = ({navigation}) => {
  type InventoryItem = {
    name: string,
    category: string,
    quantity: number,
  }
  const [inventory, setInventory] = useState<InventoryItem[]>(sheetsData[1].inventory.items);

  function inspectItem(item: InventoryItem): void {
    let category = item.category;
    // @ts-ignore - currently prints the whole category???
    let itemInformation = equipmentData[category].find((item) => item.name === item.name);
    alert(JSON.stringify(itemInformation)); // temporary measures
  }

  function addItemToInventory(): void {
    // TODO: have the item to add be selectable from a list from the SRD options,
    // or even customisable (perhaps later)
    let newItem = {
      name: 'Test Item',
      category: 'Weapons',
      quantity: 1,
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
      <TouchableOpacity onPress={() => addItemToInventory()}
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