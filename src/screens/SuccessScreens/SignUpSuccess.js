import React, {useEffect} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const SignUpSuccess = () => {
  //useData state to store data
  const [data, setData] = React.useState('');
  //useEffect to get data from async storage

  useEffect(() => {
    const mydata = async () => {
      const value = await AsyncStorage.getItem('userData');
      if (value !== null) {
        console.log('value', value);
      }
    };
    mydata();
  }, []);
  return (
    <View>
      <Text>{JSON.stringify(data)}</Text>
    </View>
  );
};

export default SignUpSuccess;

const styles = StyleSheet.create({});
