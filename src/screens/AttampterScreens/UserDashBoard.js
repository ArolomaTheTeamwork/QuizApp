import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const userDashBoard = ({navigation}) => {
  return (
    <View style={styles.container}>
      {/*<Text style={styles.usernameStyle}>WElCOME NAME</Text>*/}
      <ScrollView>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('MyQuestions');
              }}>
              <Text style={styles.cardHeaderText}>Attempt Quiz </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/*<View style={styles.card}>
          <View style={styles.cardHeader}>
            <TouchableOpacity>
              <Text style={styles.cardHeaderText}>more</Text>
            </TouchableOpacity>
          </View>
        </View>*/}
      </ScrollView>
      {/*create a card*/}
    </View>
  );
};

export default userDashBoard;

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
    margin: 10,
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
});
