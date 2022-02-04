import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Alert, Text, TouchableOpacity} from 'react-native';
import {
  AdminDashBoard,
  CreateQuestions,
  CreateUserScreen,
  HomeScreen,
  LoginScreen,
  MyQuestions,
  SignupScreen,
  UpdateUsers,
  UserDashBoard,
} from '../screens';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const Stack = createNativeStackNavigator();
import AsyncStorage from '@react-native-async-storage/async-storage';
//clear userData from AsyncStorage

const StackRoutes = () => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        // options={{headerShown: false}}
      />

      <Stack.Screen
        name="CreateQuestions"
        component={CreateQuestions}
        // options={{headerShown: false}}
      />
      <Stack.Screen
        name="MyQuestions"
        component={MyQuestions}
        // options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignupScreen"
        component={SignupScreen}
        // options={{headerShown: false}}
      />
      <Stack.Screen
        name="AdminDashBoard"
        component={AdminDashBoard}
        //add log out button in right
        options={({navigation}) => ({
          title: 'Admin DashBoard',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                //ask to logout
                Alert.alert(
                  'Logout',
                  'Are you sure you want to logout?',
                  [
                    {
                      text: 'NO',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {
                      text: 'YES',
                      onPress: async () => {
                        navigation.navigate('LoginScreen');
                        await AsyncStorage.removeItem('@currentUser');
                        console.log('user Logout done');
                      },
                    },
                  ],
                  {cancelable: false},
                );
              }}>
              <MaterialIcons name="exit-to-app" size={30} color="red" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="CreateUserScreen"
        component={CreateUserScreen}
        // options={{headerShown: false}}
      />
      <Stack.Screen
        name="UserDashBoard"
        component={UserDashBoard}
        options={({navigation}) => ({
          title: 'User DashBoard',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                //ask to logout
                Alert.alert(
                  'Logout',
                  'Are you sure you want to logout?',
                  [
                    {
                      text: 'NO',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {
                      text: 'YES',
                      onPress: async () => {
                        navigation.navigate('HomeScreen');
                        await AsyncStorage.removeItem('@currentUser');
                        console.log('user Logout done');
                      },
                    },
                  ],
                  {cancelable: false},
                );
              }}>
              <MaterialIcons name="exit-to-app" size={30} color="red" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="UpdateUsers"
        component={UpdateUsers}
        // options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default StackRoutes;
