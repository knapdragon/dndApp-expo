import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Appbar, Dialog, Portal, TextInput } from 'react-native-paper';

// styling
import styles, { Colors } from '../../styles.tsx';
import { Divider } from '@rneui/themed';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

// data
import Settings from '../Settings.tsx';
import MainMenu from '../MainMenu.tsx';
import NewMenu from '../NewMenu.tsx';

interface Props {
  navigation: any,
}

interface IQuantityButtonProps {
  dieType: string,
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

  // DiceRoller-specific state
  const [rollDisplay, setRollDisplay] = useState("");
  const [rollDisplayVisible, setRollDisplayVisible] = useState(false);
  function openRollDisplay(): void  { setRollDisplayVisible(true);  }
  function closeRollDisplay(): void { setRollDisplayVisible(false); }

  const [dieQuantities, setDieQuantities] = useState<{[key: string]: number}>({
    d4:   0,
    d6:   0,
    d8:   0,
    d10:  0,
    d12:  0,
    d20:  0,
  });

  const [buffPerDice, setBuffPerDice] = useState<number>(0);
  const [buffAfterTotal, setBuffAfterTotal] = useState<number>(0);

  const QuantityButtons: React.FC<IQuantityButtonProps> = ({dieType}) => {
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => decrementDieQuantity(dieType)}>
          <Icon name="minus-circle-outline" size={30} color='red'/>
        </TouchableOpacity>
        
        <Text style={{marginHorizontal: 10, fontSize: 20}}>{dieQuantities[dieType]}</Text>

        <TouchableOpacity onPress={() => incrementDieQuantity(dieType)}>
          <Icon name="plus-circle" size={30} color='green'/>
        </TouchableOpacity>
      </View>
    )
  }

  function incrementDieQuantity(dieType: string): void {
    let newDieQuantities = {...dieQuantities};
    newDieQuantities[dieType] += 1;
    setDieQuantities(newDieQuantities);
  }

  function decrementDieQuantity(dieType: string): void {
    let newDieQuantities = {...dieQuantities};
    if (newDieQuantities[dieType] !== 0) {
      newDieQuantities[dieType] -= 1;
    }
    setDieQuantities(newDieQuantities);
  }

  function clearDiceQuantities(): void {
    setDieQuantities({
      d4:   0,
      d6:   0,
      d8:   0,
      d10:  0,
      d12:  0,
      d20:  0,
    });
  }

  function dieQuantitiesIsEmpty() {
    let isEmpty;
    for (const [key, value] of Object.entries(dieQuantities)) {
      if (value !== 0) {
        isEmpty = false;
        break;
      } else {
        isEmpty = true;
      }
    }
    return (isEmpty);
  }

  function handleBuffInput(type: string, input: string): void {
    const buff = parseInt(input);
    if (type === 'perDice') {
      setBuffPerDice(buff);
    } else if (type === 'afterTotal') {
      setBuffAfterTotal(buff);
    }
  }

  /**
   * Roll the dice.
   * @param quantity The number of given die to roll
   * @param magnitude The range of the die, e.g. d8
   * @return The dice values rolled as well as the total.
   */
  function rollDice(buffPerDice: number, buffAfterTotal: number) {
    let total = 0;
    const rolls = Array<Number>();
    for (const [type, quantity] of Object.entries(dieQuantities)) {
      if (quantity > 0) {
        // get die number
        let dieType = type.length === 2 ? type.slice(-1) : type.slice(-2);

        // roll a given dice type 'quantity' times
        for (let i = 0; i < quantity; i++) {
          let roll = Math.ceil(Math.random() * parseInt(dieType)) + buffPerDice;
          rolls.push(roll)
          total += roll;
        }
      }
    }
    total += buffAfterTotal;

    if ( dieQuantitiesIsEmpty() ) {
      const finalRolls = "No dice are selected!";
      setRollDisplay(finalRolls);
    } else {
      const finalRolls = "You rolled " + rolls.toString() + " for a total of " + total.toString();
      setRollDisplay(finalRolls);
    }
    openRollDisplay();
  }

  const DiceDisplay: React.FC = () => {
    const d4s  = dieQuantities.d4;
    const d6s  = dieQuantities.d6;
    const d8s  = dieQuantities.d8;
    const d10s = dieQuantities.d10;
    const d12s = dieQuantities.d12;
    const d20s = dieQuantities.d20;

     // check if any dice are selected
    let quantitiesIsEmpty = dieQuantitiesIsEmpty()

    return (
      <Text style={styles.rollingDisplay}>
        {quantitiesIsEmpty ? null : "Rolling: "}
        {d4s  !== 0 && d4s+'d4'}{d4s !== 0 && buffPerDice !== 0 && "+" + buffPerDice} {}
        {d6s  !== 0 && d6s+'d6'}{d6s !== 0 && buffPerDice !== 0 && "+" + buffPerDice} {}
        {d8s  !== 0 && d8s+'d8'}{d8s !== 0 && buffPerDice !== 0 && "+" + buffPerDice} {}
        {d10s !== 0 && d10s+'d10'}{d10s !== 0 && buffPerDice !== 0 && "+" + buffPerDice} {}
        {d12s !== 0 && d12s+'d12'}{d12s !== 0 && buffPerDice !== 0 && "+" + buffPerDice} {}
        {d20s !== 0 && d20s+'d20'}{d20s !== 0 && buffPerDice !== 0 && "+" + buffPerDice} {}
        {buffAfterTotal !== 0 && "+" + buffAfterTotal}
      </Text>
    )
  }

  const RollDisplay: React.FC = () => {
    return (
      <Portal>
        <Dialog visible={rollDisplayVisible} onDismiss={closeRollDisplay}>
          <Dialog.Title>Roll Results</Dialog.Title>
          <Dialog.Content>
            <Text>{rollDisplay}</Text>

            {/* Display buffs & total - not currently showing? */}
            <View style={styles.diceDialogImportantArea}>
              <View style={styles.diceDialogImportantEach}>
                <Text>Added per dice</Text>
                <TextInput style={[styles.buffInput, {paddingLeft: 5}]} disabled={true} />
              </View>
              <View style={styles.diceDialogImportantEach}>
                <Text>Added after total</Text>
                <TextInput style={[styles.buffInput, {paddingLeft: 5}]} disabled={true} />
              </View>
            </View>
          </Dialog.Content>
          
          <Dialog.Actions>
          <TouchableOpacity onPress={() => rollDice(buffPerDice, buffAfterTotal)}
              style={[styles.dialogButton, {right: 10, backgroundColor: Colors.diceRoller.primary}]}>
              <Text>Reroll!</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={closeRollDisplay}>
              <Text>Close</Text>
            </TouchableOpacity>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    )
  }

  // Main display starts
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

      <Text style={[styles.title, {textAlign: 'center', marginTop: 10}]}>
        Choose some dice to roll
      </Text>

      {/* Default dice options */}
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
          <QuantityButtons dieType={'d4'}/>
          <QuantityButtons dieType={'d6'}/>
          <QuantityButtons dieType={'d8'}/>
          <QuantityButtons dieType={'d10'}/>
          <QuantityButtons dieType={'d12'}/>
          <QuantityButtons dieType={'d20'}/>
        </View>
      
        <Divider width={1} color={'#777'} style={{top: '40%'}}/>

      { /* Custom dice options */}
        <Text style={[styles.title, {textAlign: 'center', top: 250}]}>
          Custom dice options
        </Text>
        <View style={styles.diceDisplay}>

        </View>
        <View style={styles.diceSelect}>

        </View>

        {/* Buffs - per dice or added to the total */}
        <View style={styles.buffsArea}>
          <View style={styles.buffsEach}>
            <Text>Add per dice</Text>
            <TextInput style={[styles.buffInput, {paddingLeft: 5}]}
              keyboardType={'numeric'}
              onEndEditing={(e) => handleBuffInput('perDice', e.nativeEvent.text)}/>
          </View>
          <View style={styles.buffsEach}>
            <Text>Add after total</Text>
            <TextInput style={[styles.buffInput, {paddingLeft: 5}]}
              keyboardType={'numeric'}
              onEndEditing={(e) => handleBuffInput('afterTotal', e.nativeEvent.text)}/>
          </View>
        </View>
        {/* Show total dice the user is rolling */}
        <DiceDisplay />
      </View>
      
      {/* Shows individual and total roll results */}
      <RollDisplay /> 
      
      <View style={styles.diceActions}>
        <TouchableOpacity
          style={[styles.diceButton, {backgroundColor: '#ff70ff'}]}
          onPress={() => rollDice(buffPerDice, buffAfterTotal)}>
            <Text>Roll the dice!</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.diceButton, {backgroundColor: '#ff70ff'}, {marginLeft: 30}]}
          onPress={() => clearDiceQuantities()}>
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
