import React, {useEffect, useState} from 'react';
import { View, Text, FlatList, Image, Pressable, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from '../../styles.tsx';
import MainMenu from '../MainMenu.tsx';
import sheetsData from '../../userdata/sheetsData.js';
import racesSRD from './../../assets/srd_compendium/JSON/5e-SRD-Races.json';
import racesCustom from './../../userdata/compendium_custom/races_custom.js';
import classesSRD from './../../assets/srd_compendium/JSON/5e-SRD-Classes.json';
import classesCustom from './../../userdata/compendium_custom/classes_custom.js';

const NewSheetForm: React.FC = () => {
  const [name, setName] = useState("");
  const [race, setRace] = useState("");
  const [mainClass, setMainClass] = useState("");

  return (
    <View style={styles.container}>
      <View style={[styles.frame, {backgroundColor: "#fab"}]}>
        <Text style={styles.title}>New Character Sheet</Text>
        <MainMenu />
      </View>
      <View id="form">
        {/* User chooses a name */}
        <Text style={styles.text}>Character Name</Text>
        <TextInput onBlur={(text) => this.setName(text)}
        />  

        {/* User selects a race */}
        <Text style={styles.text}>Choose a race</Text>
        <Picker selectedValue={race} onValueChange={selectedRace => setRace(selectedRace)}>
          {racesSRD.map((item => (
            <Picker.Item label={item.index} value={item.name} />
          )))}
        </Picker>
        {/* Display race, description, & basic stats */}
        <Text style={styles.text}>{race}</Text>
        <View>
          <Text>{racesSRD[racesSRD.indexOf(racesSRD.find((r) => r.name === race))]}</Text>
        </View>

        {/* User selects a class */}
        <Text style={styles.text}>Choose a class</Text>
        <Picker selectedValue={mainClass} onValueChange={selectedClass => setMainClass(selectedClass)}>
          {classesSRD.map((item => (
            <Picker.Item label={item.index} value={item.name} />
          )))}
        </Picker>
        {/* Display class, description, & basic stats */}
        <Text style={styles.text}>{mainClass}</Text>
        <View>
          <Text>{classesSRD.find((c) => c.name === mainClass)}</Text>
        </View>
      </View>
    </View>
  );
};

export default NewSheetForm;
