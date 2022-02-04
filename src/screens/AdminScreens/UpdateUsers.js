import React, {useEffect, useState} from 'react';
import * as Animatable from 'react-native-animatable';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';

const UpdateUsers = ({navigation}) => {
  //fix leak memory
  useEffect(() => {
    return () => {
      // console.log('unmount SignupScreen');
    };
  }, []);
  // get userData from async-storage
  const getUserData = async () => {
    const userData = await AsyncStorage.getItem('userData');
    if (userData) {
      const userDataArray = JSON.parse(userData);
      setuserData(userDataArray);
    }
  };

  const [userData, setuserData] = useState([]);

  const handleSubmit = async () => {};

  return (
    //keyboard dismiss
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.animatedText}>Update Users</Text>
        </View>
        <Animatable.View animation="zoomInUp" style={styles.footer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.textInput}>
              <Picker
                selectedValue={userData.role}
                // style={{height: 50, width: '100%'}}
                onValueChange={(itemValue, itemIndex) =>
                  setuserData({...userData, role: itemValue})
                }>
                <Picker.Item label="Select Role" value="" />
                <Picker.Item label="Admin" value="Admin" />
                <Picker.Item label="User" value="User" />
              </Picker>
            </View>
            <View style={styles.textInput}>
              <TextInput
                name="name"
                value={userData.name}
                onChangeText={text => setuserData({...userData, name: text})}
                placeholder="Name"
              />
            </View>
            <View style={styles.textInput}>
              <TextInput
                name="email"
                value={userData.email}
                onChangeText={text => setuserData({...userData, email: text})}
                placeholder="Email"
                keyboardType="email-address"
              />
            </View>
            <View style={styles.textInput}>
              <TextInput
                name="phoneNo"
                value={userData.phoneNo}
                onChangeText={text => setuserData({...userData, phoneNo: text})}
                placeholder="Phone Number"
                keyboardType="number-pad"
                maxLength={10}
              />
            </View>

            <View style={styles.textInput}>
              <TextInput
                name="password"
                onChangeText={text =>
                  setuserData({...userData, password: text})
                }
                value={userData.password}
                placeholder="Password"
                secureTextEntry={true}
              />
            </View>
            <View style={styles.textInput}>
              <TextInput
                name="confirmPassword"
                value={userData.confirmPassword}
                onChangeText={text =>
                  setuserData({...userData, confirmPassword: text})
                }
                placeholder="confirmPassword"
                secureTextEntry={true}
              />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Update Now</Text>
            </TouchableOpacity>
          </ScrollView>
        </Animatable.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default UpdateUsers;
const {height} = Dimensions.get('screen');
const height_logo = height * 0.28;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 2,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  textInput: {
    alignSelf: 'stretch',
    height: 50,
    color: '#fff',
    borderBottomColor: '#009387',
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  button: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#009387',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  animatedText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },

  forgotPassword: {
    color: '#009387',
    fontSize: 15,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
});
