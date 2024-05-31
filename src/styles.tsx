import { StyleSheet } from 'react-native';

const styles = {
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
    textAlign: 'left' as 'left',
    fontSize: 32,
    color: "#000",
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
    textAlign: 'center' as 'center', 
    alignItems: 'center' as 'center',
    justifyContent: 'center' as 'center',
  },

  mainMenu: {
    top: -49,
    left: 310,
  },

  dialog: {
    justifyContent: 'center' as 'center',
  },

  newMenu: {
    left: 230,
  },

  listItem: {
    padding: 15,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },

  // Home
  HomeGrid: {
    marginTop: 50,
    flex: 1, 
    flexDirection: 'column', 
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  GridItem: {
    backgroundColor: 'lightgrey',
    flex: 1,
  },

  // Sheets

  // Notes
  card: {
    backgroundColor: '#eee',
    borderColor: '#aaa',
    borderWidth: 1,
  },

  // Groups
  modalText: {
      flex: 0,
      justifyContent: 'flex-start' as 'flex-start',
      alignItems: 'center' as 'center',
      alignText: 'center' as 'center',
    },

  // DiceRoller.tsx
  item: {
    flex: 1,
    maxWidth: {},
    alignItems: 'center'
  }

};

export default styles;