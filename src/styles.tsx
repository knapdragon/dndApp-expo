import { Dimensions, StyleSheet } from 'react-native';

export const Colors = {
  common: {
    background: '#fff',
    backgroundDarkMode: '#555',
    text: '#000',
    textDarkMode: '#fff',

    buttonApplyCreate: '#3b3',
    buttonDelete: '#f55',
  },

  sheets: {
    primary: '#f55',
  },

  notes: {
    primary: '#4a4',
  },

  groups: {
    primary: '#6496e8',
  },

  diceRoller: {
    primary: '#ff70ff',
    buttons: '#f5a2f5',
  },
}

const styles = StyleSheet.create({

  // General purpose
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  frame: {
    marginTop: -10,
  },

  evenRowView: {
    display: 'flex',
    flexDirection: 'row', 
    justifyContent: 'space-evenly',
  },

  evenColumnView: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 2,
  },

  title: {
    marginTop: 28,
    marginLeft: 15,
    textAlign: 'left',
    fontSize: 24,
    color: "#000",
  },

  titleAlt: {
    fontSize: 24,
    textAlign: 'center',
  },

  text: {
    fontSize: 20,
  },

  menu: {
    left: 330,
    top: -30,
    alignItems: 'center',
    backgroundColor: '#ddd',
    width: 60,
  },

  menuItem: {
    textAlign: 'center', 
    alignItems: 'center',
    justifyContent: 'center',
  },

  mainMenu: {
    top: -49,
    left: 310,
  },

  dialog: {
    justifyContent: 'center',
  },

  newMenu: {
    left: 230,
  },

  informationButton: {
    width: 28,
    height: 28,
    padding: 3,
    backgroundColor: '#87CEEB',
    borderWidth: 0.1,
    borderRadius: 50,
  },

  smallNumericInputs: {
    width: 50,
    height: 40,
    textAlignVertical: 'center',
  },

  smallNumericContent: {
    textAlign: 'center', 
    paddingLeft: 0,
  },

  // Home
  diceColumn: {
    position: 'absolute',
    right: 50,
    bottom: 30,
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'flex-end',
    flexDirection: 'column',
  },

  diceColumn2: {
    position: 'absolute',
    right: 10,
    bottom: 30,
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'flex-end',
    flexDirection: 'column',
  },

  // Sheets
  listItem: {
    padding: 15,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },

  newSheetContainer: {
    flex: 0,
    height: "40%",
    backgroundColor: '#fff',  
  },

  newSheetTitle: {
    top: 0,
  },

  newSheetContent: {
    top: 0,
  },

  newSheetButton: {
    bottom: "0%",
    padding: 10,
    borderRadius: 15,
  },

  abilityScoreDisplay: {
    position: 'absolute',
    top: 40,
    left: '10%',
    flex: 0.5, 
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    gap: 14,
  },

  abilityScoreSelect: {
    position: 'absolute',
    top: 40,
    right: '10%',
    flex: 0.5, 
    justifyContent: 'space-evenly', 
    alignItems: 'center',
    flexDirection: 'column',
    gap: 10,
  },

  proficienciesDisplay: {
    position: 'absolute',
    top: 40,
    left: '5%',
    gap: 5,
  },

  // CharacterSheet
  

  // Notes
  card: {
    backgroundColor: '#eee',
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 0,
  },

  dialogButton: {
    flexDirection: 'row',
    borderRadius: 20,
    padding: 10,
  },

  newNoteContainer: {
    flex: 0,
    height: "60%",
    backgroundColor: '#fff',  
  },

  newNoteTitle: {
    top: 0,
  },

  newNoteContent: {
    top: 0,
  },

  newNoteColour: {
    // unused, for now
  },

  newNoteActions:  {
    
  },

  newNoteButton: {
    bottom: "0%",
    padding: 10,
    borderRadius: 15,
  },

  // Groups
  modalText: {
      flex: 0,
      justifyContent: 'flex-start',
      alignItems: 'center',
      textAlign: 'center',
    },
  
  modalTitle: {
    bottom: 90,
  },

  modalLabels: {
    left: 15, 
    bottom: 110,
    alignItems: 'flex-start',
  },

  modalPlayers: {
    right: 30,
    bottom: 115,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  modalDescription: {
    left: 20,
    bottom: 65,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },

  modalButton: {
    top: 50,
    alignSelf: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor:'#6496e8',
    width: '13%',
  },

  // NewGroupForm
  newGroupContainer: {
    flex: 1,
    marginTop: -50, 
    backgroundColor: '#eee', 
    borderTopWidth: 2, 
    borderTopColor: '#555',
  },

  formInputs: {
    width: 350,
    height: 40,
    top: 5,
    textAlignVertical: 'center',
  },

  newGroupTitle: {
    position: 'absolute',
    top: -120,
    left: 30,
  },

  newGroupLabels: {
    top: -40,
    left: 30,
  },

  newGroupPlayers: {
    top: -20,
    left: 30,
  },

  newGroupTagline: {
    top: 5,
    left: 30,
  },

  newGroupDescription: {
    top: 25,
    left: 30,
  },

  newGroupAuthor: {
    top: 45,
    left: 30,
  },

  newGroupButton: {
    bottom: -100,
    alignSelf: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor:'#6496e8',
    width: '13%',
  },

  // DiceRoller.tsx
  diceIcons: {
    position: 'absolute',
    top: 10,
    left: '30%',
    flex: 0.5, 
    justifyContent: 'space-evenly', 
    alignItems: 'center',
    flexDirection: 'column',
  },

  diceSelect: {
    position: 'absolute',
    top: 15,
    right: '30%',
    flex: 0.5, 
    justifyContent: 'space-evenly', 
    alignItems: 'center',
    flexDirection: 'column',
    gap: 10,
  },

  buffsArea: {
    position: 'absolute', 
    top: -420,
    left: '75%',
    gap: 20, 
    flexDirection: 'column',
    alignItems: 'center',
  },

  buffsEach: {
    top: 470, 
    alignItems: 'center', 
    gap: 5
  },
  
  buffInput: {
    width: 50, 
    height: 50,
  },

  currentDiceDisplay: {
    fontWeight: 'bold', 
    textAlign: 'center',
    top: 560, 
    flexDirection: 'row', 
    flexWrap: 'wrap'
  },

  diceActions: {
    bottom: '5%',
    flex: 0.1, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center'
  },

  diceButton: {
    padding: 10,
    borderRadius: 10,
  },

  diceDialogImportantArea: {
    top: 30,
    justifyContent: 'space-between', 
    flexDirection: 'row',
  },

  diceDialogImportantEach: {
    top: 0,
    gap: 5,
    backgroundColor: Colors.diceRoller.buttons,
    borderRadius: 20,
    padding: 8,
  },

});

export default styles;