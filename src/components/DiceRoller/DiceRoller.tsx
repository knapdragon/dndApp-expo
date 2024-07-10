import React, { useState, useRef, useCallback } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, TouchableNativeFeedback } from 'react-native';
import { Appbar, PaperProvider, Portal, TextInput } from 'react-native-paper';

// styling
import styles from '../../styles.tsx';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

// data
import Settings from '../Settings.tsx';
import MainMenu from '../MainMenu.tsx';
import NewMenu from '../NewMenu.tsx';

interface Props {
  navigation: any,
}

const DiceRoller: React.FC<Props> = ({ navigation }) => {
  {/* Appbar and related actions */}
  const tabOrigin = 'DiceRoller';

  const [mainMenuVisible, setMainMenuVisible] = useState(false);
  const [settingsVisible, setSettingsVisible] = useState(false);
  function closeSettingsDialog(): void {
    setSettingsVisible(false);
  }
  const [newMenuVisible, setNewMenuVisible] = useState(false);
  function createDie() {
    alert("Button pressed!");
  }

  // DiceRoller-specific states
  const [rollDisplay, setRollDisplay] = useState("");
  const [displayVisible, setDisplayVisible] = useState(false);
  const [dieQuantity, setDieQuantity] = useState(0);
  const [dieQuantities, setDieQuantities] = useState([
    0,  //  d4
    0,  //  d6
    0,  //  d8
    0,  //  d10
    0,  //  d12
    0,  //  d20
    0,  //  d100
  ]);

  const [dieMagnitude, setDieMagnitude] = useState(2);

  function incrementDieQuantity(dieType: number): void {
    const newDieQuantities = dieQuantities.map((value, index) => {
      if (index === dieType) {
        return value + 1;
      } else {
        return value;
      }
    })
    setDieQuantities(newDieQuantities);
    alert(dieQuantities[0])
  }

  function decrementDieQuantity(dieType: number): void {

  }

  /**
   * Roll the dice.
   * @param quantity The number of given die to roll
   * @param magnitude The range of the die, e.g. d8
   * @return The dice values rolled as well as the total.
   */
  function rollDice( quantity: number, magnitude: number ) {
    const max = magnitude;

    let total = 0;
    const rolls = Array<Number>();
    for (let i = 0; i < quantity; i++) {
      let roll = Math.round((Math.random() * (max) + 1));
      rolls.push(roll)
      total += roll;
    }
    alert(rolls);

    const finalRolls = "You rolled " + rolls.toString() + " for a total of " + total.toString();
    setRollDisplay(finalRolls);
  }

  // DiceRoller display starts
  return (
    <View style={styles.container}>
      <View>
        <Appbar.Header style={{backgroundColor: '#ff70ff'}}>
        <Appbar.Content title="Dice Roller"/>
          <NewMenu 
            tabOrigin={tabOrigin}
            enabled={newMenuVisible}
            setNewMenuVisible={setNewMenuVisible}
            newItem={createDie}
            />
          <MainMenu 
            tabOrigin={tabOrigin}
            enabled={mainMenuVisible}
            setSettingsVisible={setSettingsVisible}
            setMainMenuVisible={setMainMenuVisible}
            />
        </Appbar.Header>
      </View>

      <Text style={[styles.title, {textAlign: 'center'}, {marginTop: 10}, {marginLeft: -5}]}>
        Choose some dice to roll
      </Text>

      <View style={{flex: 1}}>
        <View style={styles.diceDisplay}>
          <Icon name="dice-d4-outline"  size={40}/>
          <Icon name="dice-d6-outline"  size={40}/>
          <Icon name="dice-d8-outline"  size={40}/>
          <Icon name="dice-d10-outline" size={40}/>
          <Icon name="dice-d12-outline" size={40}/>
          <Icon name="dice-d20-outline" size={40}/>
        </View>
        <View style={styles.diceSelect}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => null}>
              <Icon name="minus-circle-outline" size={30} color='red'/>
            </TouchableOpacity>
            
            <Text style={{marginHorizontal: 10, fontSize: 20}}>{dieQuantities[0]}</Text>

            <TouchableOpacity onPress={() => null}>
              <Icon name="plus-circle" size={30} color='green'/>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={{flex: 0.1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: '#ff70ff'}]}
          onPress={() => rollDice(dieQuantity, dieMagnitude)}>
            <Text>Roll the dice!</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.button, {backgroundColor: '#ff70ff'}, {marginLeft: 30}]}
          onPress={() => setDieQuantity(0)}>
            <Text>Clear all</Text>
        </TouchableOpacity>
      </View>

      <View style={{flex: 0}}>
        {settingsVisible ? 
          <Settings tabOrigin={tabOrigin} enabled={settingsVisible} closeDialog={closeSettingsDialog}/>
        : null}
      </View>
    </View>
  );
};

export default DiceRoller;
