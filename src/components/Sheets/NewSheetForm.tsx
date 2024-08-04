import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SectionList, ScrollView, FlatList } from 'react-native';

// styling
import styles, { Colors } from '../../styles.tsx';
import { Checkbox, Dialog, Portal, TextInput } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { Divider } from '@rneui/themed';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

// data
import racesSRD from '../../assets/srd_compendium/JSON/5e-SRD-Races.json';
import subracesSRD from '../../assets/srd_compendium/JSON/5e-SRD-Subraces.json';
import racesCustom from '../../userdata/compendium_custom/races_custom.js';
import classesSRD from '../../assets/srd_compendium/JSON/5e-SRD-Classes.json';
import subclassesSRD from '../../assets/srd_compendium/JSON/5e-SRD-Subclasses.json';
import classesCustom from '../../userdata/compendium_custom/classes_custom.js';
import skillsSRD from '../../assets/srd_compendium/JSON/5e-SRD-Skills.json';

interface Props {
  enabled: boolean,
  data: any,
  closeForm: () => void,
}

interface IQuantityButtonProps {
  ability: string,
}

const NewSheetForm: React.FC<Props> = ({enabled, data, closeForm}) => {
  const [formTab, setFormTab] = useState<number>(1);

  const sheetsData = data;
  const [name, setName] = useState("");
  const [race, setRace] = useState("Human");
  const [subrace, setSubrace] = useState("");
  let validSubraces = subracesSRD.filter((subrace: any) => subrace.race.name === race);
  const [validSubraceNames, setValidSubraceNames] = useState<Array<string>>(
    validSubraces.map((subrace: any) => subrace.name)
  )
  const [mainClass, setMainClass] = useState("");
  const [abilityScores, setAbilityScores] = useState<{[key: string]: number}>({
    str: 10,
    dex: 10,
    con: 10,
    int: 10,
    wis: 10,
    cha: 10
  });
  const scoresInfo = "Standard array offers the following scores: \n[15, 14, 13, 12, 10, 8].\nYou can set each ability to one score in the array.\n\nYou can alternatively use point buy or randomise your score.\nRandomisation uses 4d6 and drops the lowest."

  let fullSkills = skillsSRD.map((skill: any) => skill.name);
  const [skillProficiencies, setSkillProficiencies] = useState<Map<string, boolean>>(() => {
    const map = new Map();
    for (const skill of fullSkills) {
      map.set(skill, false)
    }
    return map;
  });
  const [recommendedProficiencies, setRecommendedProficiencies] = useState<string | undefined>("")

  let formHeight = 550;
  if (formTab === 1 && validSubraceNames.length > 0) {
    formHeight = 630
  } else if (formTab === 1 && validSubraceNames.length === 0) {
    formHeight = 550
  } else if (formTab === 2) {
    formHeight = 700
  }

  let actionsTopPosition = 120;
  if (formTab === 1 && validSubraceNames.length > 0) {
    actionsTopPosition = 125
  } else if (formTab === 1 && validSubraceNames.length === 0) {
    actionsTopPosition = 125
  } else if (formTab === 2) {
    actionsTopPosition = 240
  }

  const QuantityButtons: React.FC<IQuantityButtonProps> = ({ability}) => {
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => decrementAbilityScore(ability)}>
          <Icon name="minus-circle-outline" size={30} color='red'/>
        </TouchableOpacity>
        
        <Text style={{marginHorizontal: 10, fontSize: 20}}>{abilityScores[ability]}</Text>

        <TouchableOpacity onPress={() => incrementAbilityScore(ability)}>
          <Icon name="plus-circle" size={30} color='green'/>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => rollForAbilityScore(ability)} style={{left: 10}}>
          <Icon name="dice-multiple" size={30} color={Colors.diceRoller.primary}/>
        </TouchableOpacity>
      </View>
    )
  }

  function incrementAbilityScore(ability: string): void {
    let newAbilityScores = {...abilityScores};      // make shallow copy
    newAbilityScores[ability] += 1;                 // increment
    setAbilityScores(newAbilityScores);             // update state
  }

  function decrementAbilityScore(ability: string): void {
    let newAbilityScores = {...abilityScores};      // make shallow copy
    if (newAbilityScores[ability] !== 0) {          // must be greater than 0
      newAbilityScores[ability] -= 1;               // decrement
    }
    setAbilityScores(newAbilityScores);             // update state
  }

  /**
   * Sets an ability score to the result of rolling 4d6 then dropping the lowest.
   * @param ability The ability being randomised
   */
  function rollForAbilityScore(ability: string): void {
    let rolls = [];
    for (let i = 0; i < 4; i++) {                    // roll 4 times
      rolls.push(Math.ceil(Math.random() * 6));      // d6s are rolled
    }
    rolls.sort((a, b) => a - b).splice(0, 1);        // sort by ascending, drop lowest
    let newScore = rolls.reduce((a, b) => a + b, 0); // sum all rolls
    let newAbilityScores = {...abilityScores};       // copy scores
    newAbilityScores[ability] = newScore;            // set ability score 
    setAbilityScores(newAbilityScores);              // ability scores state updates
  }

  /**
  * Sets state to the input based on type
  * @param type The property type of the sheet, e.g. name or race
  * @param input The text of the input, e.g. 'This is a test sheet'
  */
  function handleFormInput(type: string, input: string): void {
    switch (type) {
      case 'name':
        setName(input);
        break;
      case 'race':
        setRace(input);
        updateAvailableSubraces(input);
        break;
      case 'subrace':
        setSubrace(input);
        break;
      case 'mainClass':
        setMainClass(input);
        updateRecommendedProficiences(input);
        break;
    }
  }

  /**
   * Callback function allowing the subrace dropdown to properly show after selecting a race once.
   * @param raceForSubraces The race selected
   */
  function updateAvailableSubraces(raceForSubraces: string): void {
    validSubraces = subracesSRD.filter((subrace) => subrace.race.name === raceForSubraces);
    setValidSubraceNames(validSubraces.map((subrace) => subrace.name));
  }

  /**
   * Callback function that properly updates the recommended proficiencies after selecting a class.
   * @param classForProficiencies The class selected
   */
  function updateRecommendedProficiences(classForProficiencies: string): void {
    const map = new Map();
    setRecommendedProficiencies(classesSRD.find((c) => c.name === classForProficiencies)?.proficiency_choices[0].desc)
  }

  /**
   * Sets a skill proficiency to true or false.
   * @param proficiency The proficiency to toggle
   */
  function toggleProficiency(proficiency: string): void {
    let newSkillProficiencies = new Map([...skillProficiencies]);
    newSkillProficiencies.set(proficiency, !newSkillProficiencies.get(proficiency));
    setSkillProficiencies(newSkillProficiencies);
  }

  /**
   * Creates a new sheet in the sheetsData array with the form inputs.
   * @param name The character's name
   * @param race The character's race
   * @param mainClass The character's class
   */
  function newSheet(name: string, race: string, mainClass: string): void {
    const newSheetId = sheetsData.length + 1;

    const newSheet = {
      id: newSheetId.toString(),
      name: name,
      subrace: subrace,
      race: race,
      characterLevel: 1,
      mainClass: mainClass,
    };

    const newTestSheet = {
      id: newSheetId.toString(),
      name: 'Test Sheet ' + newSheetId,
      subrace: '',
      race: 'Human',
      characterLevel: 1,
      mainClass: 'cleric',
    };

    sheetsData.push(newSheet);
    closeForm();
  }

  return (
    <Portal>
      <Dialog visible={enabled} 
        style={[styles.newSheetContainer, {height: formHeight}]}>
        {formTab === 1 && (
          <>
            <Dialog.Title style={styles.newSheetTitle}>
              {/* User chooses a name */}
              <View style={{flex: 0}}>
                <Text style={{fontSize: 20}}>Character Name</Text>
                <TextInput id='character-name' style={[styles.formInputs]}
                  mode={'outlined'}
                  autoFocus={true}
                  onEndEditing={(e) => handleFormInput('name', e.nativeEvent.text)}/>
              </View>
            </Dialog.Title>

          <Divider inset={true} insetType={'middle'} color={'#555'} style={{marginVertical: 5}}/>
          <Dialog.Content style={styles.newSheetContent}>
            {/* User selects a race */}
            <View style={{flex: 0}}>  
              <Text style={styles.text}>Select a race</Text>
              <Picker id="character-race"
                selectedValue={race} 
                onValueChange={selectedRace => handleFormInput('race', selectedRace)}>
                {racesSRD.map((item => (
                  <Picker.Item label={item.name} value={item.name} />
                )))}
              </Picker>
            </View>

            <Divider inset={true} insetType={'middle'} color={'#555'} style={{marginVertical: 5}}/>

            {/* User selects their subrace, if applicable */}
            {validSubraceNames.length !== 0 && (
              <>
              <View style={{flex: 0}}>  
                <Text style={styles.text}>Select subrace</Text>
                <Picker id="character-subrace"
                  selectedValue={subrace} 
                  onValueChange={selectedRace => handleFormInput('subrace', selectedRace)}>
                  {validSubraceNames.map((item => (
                    <Picker.Item label={item} value={item}/>
                  )))}
                </Picker>
              </View>
              <Divider inset={true} insetType={'middle'} color={'#555'} style={{marginVertical: 5}}/>
              </>
            )}

            {/* User sets their ability scores */}
            <View style={{flex: 0}}>  
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.text}>Select your ability scores</Text>
                <TouchableOpacity onPress={() => alert(scoresInfo)} style={[styles.informationButton, {top: 3, left: 80}]}>
                  <Text style={{fontSize: 18, textAlign: 'center'}}>?</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.abilityScoreDisplay}>
                <Text style={styles.text}>Strength</Text>
                <Text style={styles.text}>Dexterity</Text>
                <Text style={styles.text}>Constitution</Text>
                <Text style={styles.text}>Intelligence</Text>
                <Text style={styles.text}>Wisdom</Text>
                <Text style={styles.text}>Charisma</Text>
              </View>
              <View style={styles.abilityScoreSelect}>
                <QuantityButtons ability={'str'}/>
                <QuantityButtons ability={'dex'}/>
                <QuantityButtons ability={'con'}/>
                <QuantityButtons ability={'int'}/>
                <QuantityButtons ability={'wis'}/>
                <QuantityButtons ability={'cha'}/>
              </View>
            </View>
          </Dialog.Content>

          <Dialog.Actions>
            <View style={{flexDirection: 'row', justifyContent: 'center', gap: 40, top: actionsTopPosition}}>
              <TouchableOpacity
                style={[styles.newSheetButton, {paddingHorizontal: 10, backgroundColor: Colors.common.buttonApplyCreate}]} 
                onPress={() => setFormTab(formTab + 1)}>
                <Text style={{textAlign: 'center'}}>Next -&gt;</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.newSheetButton} 
                onPress={closeForm}>
                <Text style={{textAlign: 'center'}}>Close</Text>
              </TouchableOpacity>
            </View>
          </Dialog.Actions>
        </>
        )}

        {formTab === 2 && (
          <>
          <Dialog.Content style={[styles.newSheetContent, {top: 20}]}>
            {/* User selects a class */}
            <View style={{flex: 0}}>  
              <Text style={styles.text}>Choose a class</Text>
              <Picker 
                selectedValue={mainClass} 
                onValueChange={selectedClass => handleFormInput('mainClass', selectedClass)}>
                {classesSRD.map((item => (
                  <Picker.Item label={item.name} value={item.name} />
                )))}
              </Picker>
            </View>

            <Divider inset={true} insetType={'middle'} color={'#555'} style={{marginBottom: 5}}/>

            {/* User selects their skill proficiencies */}
            <View style={{flex: 0}}>  
              <Text style={{top: 5, fontSize: 14}}>
                {recommendedProficiencies?.length === 0 ? 'Choose your proficiencies' : recommendedProficiencies}
              </Text>
              <View style={styles.proficienciesDisplay}>
                <FlatList
                  contentContainerStyle={{gap: 5}}
                  keyExtractor={(skill) => skill.name}
                  numColumns={2}
                  data={skillsSRD}
                  renderItem={(skill) => 
                    (
                      <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 10}}>
                        <Text style={{fontSize: 14}}>{skill.item.name}</Text>
                        <Checkbox 
                          status={skillProficiencies.get(skill.item.name) ? 'checked' : 'unchecked'} 
                          onPress={() => toggleProficiency(skill.item.name)}/>
                      </View>
                    )}
                  />
              </View>
            </View>
          </Dialog.Content>

          <Dialog.Actions>
            <View style={{flexDirection: 'row', justifyContent: 'center', gap: 40, top: actionsTopPosition}}>
            <TouchableOpacity
                style={[styles.newSheetButton, {right: 70, paddingHorizontal: 10}]} 
                onPress={() => setFormTab(formTab - 1)}>
                <Text style={{textAlign: 'center'}}>&lt;- Previous</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.newSheetButton, {paddingHorizontal: 10, backgroundColor: Colors.common.buttonApplyCreate}]} 
                onPress={() => newSheet(name, race, mainClass)}>
                <Text style={{textAlign: 'center'}}>Create</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.newSheetButton} 
                onPress={closeForm}>
                <Text style={{textAlign: 'center'}}>Close</Text>
              </TouchableOpacity>
            </View>
          </Dialog.Actions>
          </>
        )}
        
      </Dialog>
    </Portal>
  );
};

export default NewSheetForm;
