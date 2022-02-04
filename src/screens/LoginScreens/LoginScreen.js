import React, {useEffect, useState} from 'react';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

const LoginScreen = ({navigation}) => {
  const [loginData, setloginData] = useState({
    email: '',
    password: '',
  });
  const [localStorageData, setlocalStorageData] = useState([]);

  useEffect(() => {
    getUserData();
    //AsyncStorage.clear();
  }, [loginData]);
  // get userData from async-storage
  const getUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData !== null) {
        setlocalStorageData(JSON.parse(userData));
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(JSON.stringify(localStorageData));

  const handleSubmit = () => {
    if (loginData.email === '') {
      alert('Please enter your email');
    } else if (loginData.password === '') {
      alert('Please enter your password');
    } else {
      // if user is null
      if (localStorageData.length === 0) {
        alert(
          ` This Email ${loginData.email} Is Not Registered Please Register To Continue.`,
        );
        setloginData('');
      } else {
        //check user is exist or not
        const userDataArrayLength = localStorageData.length;
        for (let i = 0; i < userDataArrayLength; i++) {
          if (
            localStorageData[i].email === loginData.email &&
            localStorageData[i].password === loginData.password
          ) {
            //check user Type
            if (localStorageData[i].role === 'Admin') {
              navigation.navigate('AdminDashBoard');
              setloginData('');
            } else {
              navigation.navigate('UserDashBoard');
              setloginData('');
            }

            // save current user data to AsyncStorage
            AsyncStorage.setItem(
              '@currentUser',
              JSON.stringify(localStorageData[i]),
              //show current user in console
              //console.log(JSON.stringify(localStorageData[i])),
              //alert(JSON.stringify(localStorageData[i])),
            );

            return;
          }
        }
        alert(' invalid email or password');
      }
    }
  };

  return (
    //keyboard dismiss
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.animatedText}>Login Screen</Text>
        </View>
        <Animatable.View animation="zoomIn" style={styles.footer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.textInput}>
              <TextInput
                onChangeText={text => setloginData({...loginData, email: text})}
                value={loginData.email}
                placeholder="Email"
                keyboardType="email-address"
              />
            </View>
            <View style={styles.textInput}>
              <TextInput
                onChangeText={text =>
                  setloginData({...loginData, password: text})
                }
                value={loginData.password}
                placeholder="Password"
                secureTextEntry={true}
              />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <View style={styles.btnContainer}>
              <TouchableOpacity disabled>
                {/*here forget password color is white thats why its disabled*/}
                <Text style={{color: 'white'}}>Forgot Password?</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('SignupScreen');
                }}>
                <Text style={styles.forgotPassword}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Animatable.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;
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
