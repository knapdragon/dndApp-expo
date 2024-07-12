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
  diceDisplay: {
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
    top: 10,
    right: '30%',
    flex: 0.5, 
    justifyContent: 'space-evenly', 
    alignItems: 'center',
    flexDirection: 'column',
  },

  button: {
    padding: 10,
    borderRadius: 10,
  },

});

export default styles;