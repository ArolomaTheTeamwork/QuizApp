import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Switch} from 'react-native';

import FeatherIcon from 'react-native-vector-icons/Feather';
const AllUserLists = ({userDataList, value, onValueChange, editFunction}) => {
  //const [disabled, setDisabled] = useState(false);
  ////handleSwitch
  //const handleSwitch = () => {
  //  alert('FDs');
  //  setDisabled(!disabled);
  //};

  return (
    <>
      {userDataList.map((userData, index) => {
        return (
          <View key={index} style={styles.card}>
            <View style={styles.iconContainer}>
              <View style={styles.cardFooterIcons}>
                <TouchableOpacity onPress={editFunction}>
                  {/*<Text style={styles.cardFooterText}> Edit</Text>*/}
                  <FeatherIcon name="edit" size={25} color="green" />
                </TouchableOpacity>
                {/*<Text style={styles.cardFooterText}>Disable</Text>*/}
                <Switch
                  onValueChange={onValueChange}
                  value={value}
                  //trackColor={{false: '#767577', true: '#81b0ff'}}
                  //thumbColor={disabled ? '#f5dd4b' : '#f4f3f4'}
                  //ios_backgroundColor="#3e3e3e"
                />
              </View>
            </View>
            <View style={styles.cardHeader}>
              <Text style={styles.cardHeaderText}>
                Name: {userData.name ? userData.name : null}
              </Text>
              <Text style={styles.cardHeaderText}>
                Email : {userData.email ? userData.email : null}
              </Text>
              <Text style={styles.cardHeaderText}>
                PhoneNumber : {userData.phoneNo ? userData.phoneNo : null}
              </Text>
              <Text style={styles.cardHeaderText}>
                Role : {userData.role ? userData.role : null}
              </Text>
            </View>
          </View>
        );
      })}
    </>
  );
};

export default AllUserLists;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  card: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 20,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardHeader: {
    flex: 1,
    //flexDirection: 'row',
    justifyContent: 'center',
    //add space from left and right
    //paddingLeft: 10,
    //paddingRight: 10,
    //alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#e6e6e6',
    borderRadius: 10,
  },
  cardHeaderText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  iconContainer: {
    //backgroundColor: 'red',
    flex: 1,
  },
  cardFooterIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardFooterText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});
