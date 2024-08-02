import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { Appbar, Dialog, Portal, TextInput } from 'react-native-paper';

// styling
import styles, { Colors } from '../../styles.tsx';
import { Divider } from '@rneui/themed';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

// data
import Settings from '../Settings.tsx';
import MainMenu from '../MainMenu.tsx';
import NewMenu from '../NewMenu.tsx';
import diceData from '../../userdata/diceData.json';

interface Props {
  navigation: any,
}

interface IQuantityButtonProps {
  dieType: string,
  isCustom: boolean,
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
  const [newDiceDialogVisible, setNewDiceDialogVisible] = useState(false);
  function openNewDiceDialog(): void {
    setNewDiceDialogVisible(true);
    setNewMenuVisible(false);
  }
  function closeNewDiceDialog(): void {
    setNewDiceDialogVisible(false);
    setNewMenuVisible(false);
  }

  // @ts-expect-error
  const NewDiceDialog = ({ newDiceDialogVisible }) => {
    const dialogVisible = newDiceDialogVisible;
    const [dieSides, setDieSides] = useState(0);

    function createDie(): void {
      if (dieSides === null || dieSides === 0) {
        alert('No sides were specified');
      }
      let newDie = {
        name: 'd'+dieSides,
        sides: dieSides
      }
      diceData.push(newDie);
      setCustomDieQuantities({ ...customDieQuantities, [newDie.name]: 0 });
      setNewDiceDialogVisible(false);
    }

    return (
    <Portal>
      <Dialog visible={dialogVisible} onDismiss={closeNewDiceDialog}>
        <Dialog.Title>New Dice</Dialog.Title>
        <Dialog.Content>
          <Text>The number of sides on the dice:</Text>
          <TextInput
            style={styles.smallNumericInputs}
            contentStyle={styles.smallNumericContent}
            onEndEditing={(e) => setDieSides(parseInt(e.nativeEvent.text))}
            keyboardType='numeric'/>
        </Dialog.Content>
        <Dialog.Actions>
          <TouchableOpacity onPress={createDie} style={[styles.diceButton, {backgroundColor: Colors.common.buttonApplyCreate}]}>
            <Text>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={closeNewDiceDialog}>
            <Text>Close</Text>
          </TouchableOpacity>
        </Dialog.Actions>
        </Dialog>
    </Portal>
   )
  };

  // DiceRoller-specific state
  const [rollDisplay, setRollDisplay] = useState("");
  const [rollDisplayVisible, setRollDisplayVisible] = useState(false);
  function openRollDisplay(): void  { setRollDisplayVisible(true);  }
  function closeRollDisplay(): void { setRollDisplayVisible(false); }

  // default die quantities
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
  const [total, setTotal] = useState<number>(0);

  // reduces diceData to an object where each item is of { name: 0 }
  const customDice = diceData.reduce((acc, die) => ({...acc, [die.name]: 0}), {}); // acc is necessary to function, but is seemingly unused
  const [customDieQuantities, setCustomDieQuantities] = useState<{[key: string]: number}>(customDice);

  const QuantityButtons: React.FC<IQuantityButtonProps> = ({dieType, isCustom}) => {
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => decrementDieQuantity(dieType, isCustom)}>
          <Icon name="minus-circle-outline" size={30} color='red'/>
        </TouchableOpacity>
        
        <Text style={{marginHorizontal: 10, fontSize: 20}}>
          {isCustom ? customDieQuantities[dieType] : dieQuantities[dieType]}
        </Text>

        <TouchableOpacity onPress={() => incrementDieQuantity(dieType, isCustom)}>
          <Icon name="plus-circle" size={30} color='green'/>
        </TouchableOpacity>
      </View>
    )
  }

  /**
   * Increments dieQuantities and customDieQuantities by 1.
   * @param dieType The type of die to be incremented
   * @param isCustom Whether the die type is a custom die or not.
   */
  function incrementDieQuantity(dieType: string, isCustom: boolean): void {
    if (!isCustom) {
      let newDieQuantities = {...dieQuantities};
      newDieQuantities[dieType] += 1;
      setDieQuantities(newDieQuantities);
    } else {
      let newCustomDieQuantities = {...customDieQuantities};
      newCustomDieQuantities[dieType] += 1;
      setCustomDieQuantities(newCustomDieQuantities);
    }
  }

  /**
   * Decrements dieQuantities and customDieQuantities by 1.
   * @param dieType The type of die to be decremented
   * @param isCustom Whether the die type is a custom die or not.
   */
  function decrementDieQuantity(dieType: string, isCustom: boolean): void {
    if (!isCustom) {
      let newDieQuantities = {...dieQuantities};
      if (newDieQuantities[dieType] !== 0) {
        newDieQuantities[dieType] -= 1;
      }
      setDieQuantities(newDieQuantities);
    } else {
      let newCustomDieQuantities = {...customDieQuantities};
      newCustomDieQuantities[dieType] -= 1;
      setCustomDieQuantities(newCustomDieQuantities);
    }
  }

  /**
   * Sets all values of dieQuantities and customDieQuantities to 0.
   */
  function clearDiceQuantities(): void {
    setDieQuantities({
      d4:   0,
      d6:   0,
      d8:   0,
      d10:  0,
      d12:  0,
      d20:  0,
    });
    for (const [key, value] of Object.entries(customDieQuantities)) {
      setCustomDieQuantities({...customDieQuantities, [key]: 0});
    }
  }

  /**
   * Checks dieQuantities and customDieQuantities for zeroes or non-zeroes.
   * @returns true if all dieQuantities are 0, false if any are non-zero
   */
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
    for (const [key, value] of Object.entries(customDieQuantities)) {
      if (value !== 0) {
        isEmpty = false;
        break;
      } else {
        isEmpty = true;
      }
    }
    return (isEmpty);
  }

  /**
   * Callback for when the buff input is submitted via the tick on the device keyboard
   * If the input is not submitted this way, it will not update the state properly
   * @param type 'perDice' or 'afterTotal'
   * @param input The value of the textinput
   */
  function handleBuffInput(type: string, input: string): void {
    const buff = parseInt(input);
    if (type === 'perDice') {
      setBuffPerDice(buff);
    } else if (type === 'afterTotal') {
      setBuffAfterTotal(buff);
    }
  }

  /**
   * Create random numbers based on the types of dice selected and the quantity specified.
   * @param buffPerDice The amount to add to each dice roll.
   * @param buffAfterTotal The amount to add after dice rolls are totaled.
   */
  function rollDice(buffPerDice: number, buffAfterTotal: number) {
    let total = 0;
    const rolls: number[] = [];

    // classic rolls
    for (const [type, quantity] of Object.entries(dieQuantities)) {
      if (quantity > 0) {
        // get die number
        let toSlice = type.length - 1;
        let dieType = type.slice(-toSlice);

        // roll a given dice type 'quantity' times
        for (let i = 0; i < quantity; i++) {
          let roll = Math.ceil(Math.random() * parseInt(dieType)) + buffPerDice;
          rolls.push(roll)
          total += roll;
        }
      }
    }

    // custom dice rolls
    for (const [type, quantity] of Object.entries(customDieQuantities)) {
      if (quantity > 0) {
        // get die number
        let toSlice = type.length - 1;
        let dieType = type.slice(-toSlice);

        // roll a given dice type 'quantity' times
        for (let i = 0; i < quantity; i++) {
          let roll = Math.ceil(Math.random() * parseInt(dieType)) + buffPerDice;
          rolls.push(roll)
          total += roll;
        }
      }
    }

    total += buffAfterTotal;

    // if no dice are selected, say so | otherwise, show the total
    if ( dieQuantitiesIsEmpty() ) {
      const finalRolls = "No dice are selected!";
      setRollDisplay(finalRolls);
      setTotal(0);
    } else {
      const finalRolls = "You rolled " + rolls.join(", ")
      setRollDisplay(finalRolls);
      setTotal(total);
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
      <Text style={styles.currentDiceDisplay}>
        {quantitiesIsEmpty ? null : "Rolling: "}
        {d4s  !== 0 && d4s+'d4'}{d4s !== 0 && buffPerDice !== 0 && "+" + buffPerDice*d4s} {}
        {d6s  !== 0 && d6s+'d6'}{d6s !== 0 && buffPerDice !== 0 && "+" + buffPerDice*d6s} {}
        {d8s  !== 0 && d8s+'d8'}{d8s !== 0 && buffPerDice !== 0 && "+" + buffPerDice*d8s} {}
        {d10s !== 0 && d10s+'d10'}{d10s !== 0 && buffPerDice !== 0 && "+" + buffPerDice*d10s} {}
        {d12s !== 0 && d12s+'d12'}{d12s !== 0 && buffPerDice !== 0 && "+" + buffPerDice*d12s} {}
        {d20s !== 0 && d20s+'d20'}{d20s !== 0 && buffPerDice !== 0 && "+" + buffPerDice*d20s} {}
        {buffAfterTotal !== 0 && "+" + buffAfterTotal}
      </Text>
    )
  }

  const CustomDiceDisplay: React.FC = () => {
    const [allDice, setAllDice] = useState<string[]>([]);
    for (const [key, value] of Object.entries(customDieQuantities)) {
      let text = value + key  // e.g. 4d24
      allDice.push(text);
    }

     // check if any dice are selected
    let quantitiesIsEmpty = dieQuantitiesIsEmpty()

    return (
      <Text style={[styles.currentDiceDisplay, {top: 540}]}>
        {quantitiesIsEmpty ? null : "Rolling: "}
        {allDice.join('  ')}
      </Text>
    )
  }

  const RollDisplay: React.FC = () => {
    return (
      <Portal>
        <Dialog visible={rollDisplayVisible} onDismiss={closeRollDisplay}>
          <Dialog.Title>Roll Results</Dialog.Title>
          <Dialog.Content style={{height: 125}}>
            <Text>{rollDisplay}</Text>

            {/* Display buffs & total */}
            <View style={styles.diceDialogImportantArea}>
              <View style={styles.diceDialogImportantEach}>
                <Text>Added per dice</Text>
                <Text style={{fontSize: 20, textAlign: 'center'}}>{buffPerDice}</Text>
              </View>
              <View style={styles.diceDialogImportantEach}>
                <Text>Total</Text>
                <Text style={{fontSize: 20, textAlign: 'center'}}>{total}</Text>
              </View>
              <View style={styles.diceDialogImportantEach}>
                <Text>Added after total</Text>
                <Text style={{fontSize: 20, textAlign: 'center'}}>{buffAfterTotal}</Text>
              </View>
              
            </View>
          </Dialog.Content>
          
          <Dialog.Actions style={{marginTop: 10}}>
          <TouchableOpacity onPress={() => rollDice(buffPerDice, buffAfterTotal)}
              style={[styles.dialogButton, {right: 10, backgroundColor: Colors.diceRoller.buttons}]}>
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
            newItem={openNewDiceDialog}
            />
          <MainMenu 
            tabOrigin={tabOrigin}
            enabled={mainMenuVisible}
            setSettingsVisible={setSettingsVisible}
            setMainMenuVisible={setMainMenuVisible}
            />
        </Appbar.Header>
      </View>

      <NewDiceDialog newDiceDialogVisible={newDiceDialogVisible}/>

      <Text style={[styles.title, {textAlign: 'center', marginTop: 10}]}>
        Choose some dice to roll
      </Text>

      {/* Default dice options */}
      <View style={{flex: 1}}> 
        <View style={styles.diceIcons}>
          <Icon name="dice-d4-outline"  size={40}/>
          <Icon name="dice-d6-outline"  size={40}/>
          <Icon name="dice-d8-outline"  size={40}/>
          <Icon name="dice-d10-outline" size={40}/>
          <Icon name="dice-d12-outline" size={40}/>
          <Icon name="dice-d20-outline" size={40}/>
        </View>
        <View style={styles.diceSelect}>
          <QuantityButtons dieType={'d4'} isCustom={false}/>
          <QuantityButtons dieType={'d6'} isCustom={false}/>
          <QuantityButtons dieType={'d8'} isCustom={false}/>
          <QuantityButtons dieType={'d10'} isCustom={false}/>
          <QuantityButtons dieType={'d12'} isCustom={false}/>
          <QuantityButtons dieType={'d20'} isCustom={false}/>
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

        <Divider width={1} color={'#777'} style={{top: '40%'}}/>

      { /* Custom dice options */}
        <Text style={[styles.title, {textAlign: 'center', top: 250}]}>
          Custom dice options
        </Text>
        <FlatList
          style={{marginHorizontal: 30, top: 260}}
          contentContainerStyle={{gap: 10, alignItems: 'center'}}
          keyExtractor={(item) => item.name}
          numColumns={3}
          data={diceData}
          renderItem={(item) => 
            (
            <>
              <View style={{marginHorizontal: 10, alignItems: 'center'}}>
                <Text>{item.item.name}</Text>
                <QuantityButtons dieType={item.item.name} isCustom={true}/>
              </View>
            </>
            )}
          />        

        {/* Show total dice the user is rolling */}
        <CustomDiceDisplay />
        <DiceDisplay />
      </View>
      
      {/* Shows individual and total roll results */}
      <RollDisplay /> 
      
      <View style={styles.diceActions}>
        <TouchableOpacity
          style={[styles.diceButton, {backgroundColor: Colors.diceRoller.buttons}]}
          onPress={() => rollDice(buffPerDice, buffAfterTotal)}>
            <Text>Roll the dice!</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.diceButton, {backgroundColor: Colors.diceRoller.buttons}, {marginLeft: 30}]}
          onPress={() => clearDiceQuantities()}>
            <Text>Clear dice</Text>
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
