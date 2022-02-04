import React, {useState} from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Image,
} from 'react-native';
import {QuestionList} from '..';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const CreateQuestions = () => {
  const [openModal, setopenModal] = useState(false);

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <QuestionList />
      </ScrollView>
      {/* add modal */}

      <Modal visible={openModal} animationType="slide">
        <View style={styles.modal}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.card}>
              <Text style={styles.title}>Create Question</Text>
              {/* responsive Input  */}

              <TextInput
                placeholder="Type Your Questions..."
                style={styles.input}
                multiline={true}
                numberOfLines={4}
              />
              {/* create a button for photo take or upload */}
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.cameraButton}
                  onPress={() => {
                    launchCamera({
                      noData: true,
                      mediaType: 'photo',
                      maxWidth: 500,
                      maxHeight: 500,
                      quality: 0.5,
                    }).then(image => {
                      console.log(image);
                    });
                  }}>
                  <Text style={styles.buttonText}>Take Photo</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cameraButton}
                  onPress={() => {
                    launchImageLibrary({
                      noData: true,
                      mediaType: 'photo',
                      maxWidth: 500,
                      maxHeight: 500,
                      quality: 0.5,
                    }).then(image => {
                      console.log(image);
                    });
                  }}>
                  <Text style={styles.buttonText}>Upload Photo</Text>
                </TouchableOpacity>
              </View>

              {/* create a button for video take or upload */}
              <View style={styles.options}>
                <TextInput placeholder="Option 1" style={styles.option} />
                <TextInput placeholder="Option 2" style={styles.option} />
                <TextInput placeholder="Option 3" style={styles.option} />
                <TextInput placeholder="Option 4" style={styles.option} />
                {/*<TextInput placeholder="Correct Ans" style={styles.option} />*/}
              </View>
              {/* create button for save Question */}
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  alert('wait');
                }}>
                <Text style={styles.buttonText}>Create</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setopenModal(false)}>
              <Text style={styles.closeText}>X</Text>
            </TouchableOpacity>
          </ScrollView>
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

export default CreateQuestions;

const styles = StyleSheet.create({
  float: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ee6e73',
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  //center text
  floatText: {
    fontSize: 40,
    color: '#fff',
    textAlign: 'center',
    paddingTop: 10,
    marginTop: -8,
  },
  modal: {
    //fit for all devices
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  //crox button in modal

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
  closeText: {
    fontSize: 20,
    color: 'red',
  },
  card: {
    width: '95%',
    height: '95%',
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  input: {
    width: '90%',
    height: 100,
    borderColor: '#ee6e73',
    borderWidth: 0.5,
    marginTop: 10,
    borderRadius: 10,
    paddingLeft: 10,
  },
  options: {
    width: '90%',
    // height: 100,
    borderColor: '#ee6e73',
    borderWidth: 0,
    marginTop: 10,
    borderRadius: 10,
    paddingLeft: 1,
  },
  option: {
    width: '100%',
    height: 50,
    borderColor: '#ee6e73',
    borderWidth: 0.5,
    marginTop: 10,
    borderRadius: 10,
    paddingLeft: 10,
  },
  button: {
    width: '90%',
    height: 50,
    borderRadius: 10,
    backgroundColor: '#ee6e73',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
  buttonContainer: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  cameraButton: {
    width: '45%',
    height: 50,
    borderRadius: 10,
    backgroundColor: '#ee6e73',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  image: {
    width: '90%',
    height: 100,
    borderRadius: 10,
    marginTop: 10,
  },
});
