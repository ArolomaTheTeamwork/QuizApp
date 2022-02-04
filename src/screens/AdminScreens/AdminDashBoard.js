import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AllUserLists from './AllUserLists';

// get UserData from async-storage
const getUserData = async () => {
  try {
    const userData = await AsyncStorage.getItem('userData');
    if (userData !== null) {
      return JSON.parse(userData);
    }
  } catch (error) {
    console.log(error);
  }
};

const AdminDashBoard = ({navigation}) => {
  // get userData from async-storage
  const [serverData, setServerData] = useState([]);

  const [openModal, setopenModal] = useState(false);

  useEffect(() => {
    getUserData().then(data => {
      setServerData(data);
    });
  }, [serverData]);
  // block user
  const [blockUserData, setBlockUserData] = useState([]);
  // unblock user
  const [unblockUserData, setUnblockUserData] = useState([]);
  const editHandler = () => {
    //setopenModal(true);
    navigation.navigate('UpdateUsers');
  };
  return (
    <>
      <ScrollView>
        <AllUserLists userDataList={serverData} editFunction={editHandler} />
      </ScrollView>
      <Modal visible={openModal} animationType="slide">
        <View style={styles.container}>
          {/*<Text style={styles.usernameStyle}>WElCOME NAME</Text>*/}

          <ScrollView>
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('CreateUserScreen');
                  }}>
                  <Text style={styles.cardHeaderText}>Create Users</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('CreateQuestions');
                  }}>
                  <Text style={styles.cardHeaderText}>Add Questions</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setopenModal(false)}>
              <Text style={styles.closeText}>X</Text>
            </TouchableOpacity>
          </ScrollView>

          {/*create a card*/}
        </View>
      </Modal>
      <TouchableOpacity
        style={styles.float}
        onPress={() => {
          setopenModal(true);
        }}>
        <Text style={styles.floatText}>+</Text>
      </TouchableOpacity>
    </>
  );
};

export default AdminDashBoard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  card: {
    //responsive card
    //width: '100%',
    //height: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e6e6e6',
    margin: 50,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,

    //responsive card
  },
  usernameStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
  },
  cardHeader: {
    //responsive card
    width: '100%',
    //responsive card
  },
  cardHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
  },
  float: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ee6e73',
    position: 'absolute',
    bottom: 10,

    right: 10,
  },
  floatText: {
    fontSize: 40,
    color: '#fff',
    textAlign: 'center',
    paddingTop: 10,
    marginTop: -8,
  },
  modal: {
    //fit for all devices
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  modalButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 50,
    height: 50,
    backgroundColor: '#ee6e73',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
