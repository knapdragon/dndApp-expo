import React, { useState, useContext } from 'react';
import { View, Text, Pressable, FlatList, TouchableOpacity } from 'react-native';
import { Appbar, TextInput } from 'react-native-paper';
import styles from '../../styles.tsx';

interface Props {
  navigation: any,
}

const DiceRoller: React.FC<Props> = ({ navigation }) => {
  const [rollDisplay, setRollDisplay] = useState("");
  const [displayVisible, setDisplayVisible] = useState(false);
  const [dieQuantity, setDieQuantity] = useState(1);
  const [dieMagnitude, setDieMagnitude] = useState(2);

  /**
   * Roll the dice.
   * @param quantity The number of given die to roll
   * @param magnitude The range of the die, e.g. d8
   * @return The dice values rolled as well as the total.
   */
  function rollDice( quantity: number, magnitude: number ) {
    const max = magnitude;

    let total = 0;
    const rolls = [];
    for (let i = 0; i < quantity; i++) {
      let roll = Math.random() * (max) + 1;
      rolls.push(roll)
      total += roll;
    }

    const finalRolls = "You rolled {rolls} for a total of {total}";
    setRollDisplay(finalRolls);
  }

    const diceData = [
    {
        d4: {
            magnitude: 4,
            icon: "../../assets/dice-icons/d4.png",
        },
        d6: {
            magnitude: 6,
            icon: "../../assets/dice-icons/d6.png",
        },
        d8: {
            magnitude: 8,
            icon: "../../assets/dice-icons/d8.png",
        },
        d10: {
            magnitude: 10,
            icon: "../../assets/dice-icons/d10.png",
        },
        d12: {
            magnitude: 12,
            icon: "../../assets/dice-icons/d12.png",
        },
        d20: {
            magnitude: 20,
            icon: "../../assets/dice-icons/d20.png",
        },
        d100: {
            magnitude: 100,
            icon: "../../assets/dice-icons/d100.png",
        },
    }
    ]

    const Item = ({item}) => {
        return (
        <View style={styles.item}>
            {item.icon}
            <TextInput
              keyboardType='numeric' 
              onChangeText={(text) => setDieQuantity(parseInt(text))}
              value={dieQuantity.toString()}
              placeholder='0'
            />
        </View>);
    }
    const DiceTypes = () => (
        <View style={styles.container}>
            <FlatList 
                data={diceData}
                numColumns={2}
                renderItem={Item}
            />
        </View>
    )

  // DiceRoller display starts
  return (
    <View style={styles.container}>
        <View>
            <Appbar.Header style={{backgroundColor: 'purple'}}>
            <Appbar.Content title="Dice Roller" titleStyle={{color: '#fff'}}/>
            </Appbar.Header>
        </View>

        <Text style={[styles.title, {textAlign: 'center'}, {marginTop: 10}]}>
            Choose some dice to roll
        </Text>

        <View style={{flex: 1}}>
            <DiceTypes />
        </View>

        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity
              style={[styles.button, {backgroundColor: 'purple'}]}
              onPress={() => rollDice(dieQuantity, dieMagnitude)}>
                <Text style={{color: 'white'}}>Roll the dice!</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.button, {backgroundColor: 'purple'}, {marginLeft: 30}]}
              onPress={() => setDieQuantity(0)}>
                <Text style={{color: 'white'}}>Clear all</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
};

export default DiceRoller;
