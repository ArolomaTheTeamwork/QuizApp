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

const SignupScreen = ({navigation}) => {
  //fix leak memory
  useEffect(() => {
    return () => {
      // console.log('unmount SignupScreen');
    };
  }, []);

  const [userData, setuserData] = useState([
    {
      name: '',
      email: '',
      phoneNo: '',
      role: '',
      password: '',
      confirmPassword: '',
    },
  ]);

  const handleSubmit = async () => {
    if (userData.name === '') {
      alert('Please enter your name');
    } else if (userData.email === '') {
      alert('Please enter your email');
    } else if (userData.phoneNo === '') {
      alert('Please enter your phone number');
    } else if (userData.password === '') {
      alert('Please enter your password');
    } else if (userData.confirmPassword === '') {
      alert('Please enter your confirm password');
    } else if (userData.password !== userData.confirmPassword) {
      alert('Password does not match');
    } else {
      //check email is already exist
      const userDataFromLocalStorage = await AsyncStorage.getItem('userData');
      if (userDataFromLocalStorage) {
        const userDataArray = JSON.parse(userDataFromLocalStorage);
        const userDataArrayLength = userDataArray.length;
        for (let i = 0; i < userDataArrayLength; i++) {
          if (userDataArray[i].email === userData.email) {
            alert('Email already exist');
            return;
          }
        }
      }
      //store data to AsyncStorage
      const arrayData = [];
      if (
        userData.name &&
        userData.email &&
        userData.phoneNo &&
        userData.password &&
        userData.confirmPassword !== null
      ) {
        const data = {
          id: Date.now().toLocaleString(),
          name: userData.name,
          email: userData.email,
          phoneNo: userData.phoneNo,
          password: userData.password,
          confirmPassword: userData.confirmPassword,
          role: 'Admin',
          isEnable: true,
        };
        arrayData.push(data);
        try {
          AsyncStorage.getItem('userData').then(value => {
            if (value !== null) {
              const d = JSON.parse(value);
              d.push(data);
              AsyncStorage.setItem('userData', JSON.stringify(d)).then(() => {
                //navigation.navigate('LoginScreen');
                //alert(JSON.stringify(d));
                //show  the user anme in alert
                alert(
                  `Dear ${data.name}  your email is  ${data.email}  You can login now`,
                );

                navigation.navigate('LoginScreen');
                setuserData('');
              });
            } else {
              AsyncStorage.setItem('userData', JSON.stringify(arrayData)).then(
                () => {
                  //navigation.navigate('LoginScreen');
                  alert(JSON.stringify(arrayData));
                  navigation.navigate('LoginScreen');
                  setuserData('');
                },
              );
            }
          });
        } catch (err) {
          console.log(err);
        }
      } else {
        alert('somethings is wrong');
      }
    }
  };

  return (
    //keyboard dismiss
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.animatedText}>SignUp Screen</Text>
        </View>
        <Animatable.View animation="zoomInUp" style={styles.footer}>
          <ScrollView showsVerticalScrollIndicator={false}>
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

            {/*<View style={styles.textInput}>
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
            </View>*/}

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
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>

            <View style={styles.btnContainer}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('LoginScreen');
                }}>
                <Text style={styles.forgotPassword}>
                  Already Have an Account ?
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Animatable.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SignupScreen;
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
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  forgotPassword: {
    color: '#009387',
    fontSize: 15,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
});
