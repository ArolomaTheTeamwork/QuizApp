import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Modal,
  Animated,
  StyleSheet,
  ScrollView,
} from 'react-native';

import {COLORS, SIZES} from '../../constants';
// import data from '../data/QuizData';
import QuizData from '../../components/QuizData';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const MyQuestions = () => {
  const allQuestions = QuizData;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);
  const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [coundown, setcoundown] = useState(15);

  const validateAnswer = selectedOption => {
    let answer = allQuestions[currentQuestionIndex]['answer'];
    setCurrentOptionSelected(selectedOption);
    setCorrectOption(answer);
    setIsOptionsDisabled(true);
    if (selectedOption == answer) {
      // Set Score
      setScore(score + 1);
    }
    // Show Next Button
    setShowNextButton(true);
  };

  //use Timer

  //useEffect(() => {
  //  const interval = setInterval(() => {
  //    setcoundown(decreaseCoundown => --decreaseCoundown);
  //  }, 1000);
  //  //after 5 seconds stop the timer and when secons question comes again start the timer again
  //  if (coundown === 0) {
  //    setcoundown(15);
  //    setIsOptionsDisabled(false);
  //    setShowNextButton(false);
  //    handleNext();
  //  }
  //  // clear up
  //  return () => clearInterval(interval);
  //  // eslint-disable-next-line
  //}, [coundown]);

  const handleNext = () => {
    if (currentQuestionIndex == allQuestions.length - 1) {
      // Last Question
      // Show Score Modal
      setShowScoreModal(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentOptionSelected(null);
      setCorrectOption(null);
      setIsOptionsDisabled(false);
      setShowNextButton(false);
    }
    Animated.timing(progress, {
      toValue: currentQuestionIndex + 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };
  const restartQuiz = () => {
    setShowScoreModal(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setCurrentOptionSelected(null);
    setCorrectOption(null);
    setIsOptionsDisabled(false);
    setShowNextButton(false);
    Animated.timing(progress, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const renderQuestion = () => {
    return (
      <View style={Styles.questionContainer}>
        {/* Question Counter */}
        <View style={Styles.counter}>
          <Text style={Styles.counterText}>{currentQuestionIndex + 1}</Text>
          <Text style={Styles.counterDiv}>/ {allQuestions.length}</Text>
        </View>

        {/* Question */}
        <Text style={Styles.question}>
          {allQuestions[currentQuestionIndex]?.question}
        </Text>
      </View>
    );
  };
  const renderOptions = () => {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        {/*// show options in  random order*/}

        {allQuestions[currentQuestionIndex]?.options
          .sort(() => Math.random() - 0.5)
          .map(option => (
            <TouchableOpacity
              onPress={() => validateAnswer(option)}
              disabled={isOptionsDisabled}
              key={option}
              style={{
                borderWidth: 3,
                borderColor:
                  option == correctOption
                    ? COLORS.success
                    : option == currentOptionSelected
                    ? COLORS.error
                    : COLORS.secondary + '40',
                backgroundColor:
                  option == correctOption
                    ? COLORS.success + '20'
                    : option == currentOptionSelected
                    ? COLORS.error + '20'
                    : COLORS.secondary + '20',
                height: 60,
                borderRadius: 20,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 20,
                marginVertical: 10,
              }}>
              <Text style={Styles.opt}>{option}</Text>

              {/* Show Check Or Cross Icon based on correct answer*/}
              {option == correctOption ? (
                <View style={Styles.correctOptionstle}>
                  <MaterialCommunityIcons
                    name="check"
                    style={Styles.correctOptionstleIcon}
                  />
                </View>
              ) : option == currentOptionSelected ? (
                <View style={Styles.correctOptionSelectedcss}>
                  <MaterialCommunityIcons
                    name="close"
                    style={Styles.correctOptionstleIcon}
                  />
                </View>
              ) : null}
            </TouchableOpacity>
          ))}
      </ScrollView>
    );
  };
  const renderNextButton = () => {
    if (showNextButton) {
      return (
        <TouchableOpacity onPress={handleNext} style={Styles.nextbtn}>
          <Text style={Styles.nextbtnText}>Next</Text>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };

  const [progress, setProgress] = useState(new Animated.Value(0));
  const progressAnim = progress.interpolate({
    inputRange: [0, allQuestions.length],
    outputRange: ['0%', '100%'],
  });
  const renderProgressBar = () => {
    return (
      <View style={Styles.progress}>
        <Animated.View
          style={[
            Styles.progressAnimated,
            {
              width: progressAnim,
            },
          ]}
        />
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      {/*{
        <View style={Styles.timer}>
          <Text style={Styles.timerText}>
            Automatically Question Skip Within {coundown} Seconds
          </Text>
        </View>
      }*/}
      <View style={Styles.allinLine}>
        {/* ProgressBar */}
        {renderProgressBar()}

        {/* Question */}

        {
          <ScrollView showsVerticalScrollIndicator={false}>
            {renderQuestion()}
          </ScrollView>
        }

        {/* Options */}
        {/*show options in randon order*/}

        {renderOptions()}

        {/* Next Button */}
        {renderNextButton()}

        {/* Score Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={showScoreModal}>
          <View style={Styles.modalViewStyle}>
            <View style={Styles.modalViewStyle2}>
              <Text style={Styles.modalText}>
                {score > allQuestions.length / 2 ? 'Congratulations!' : 'Oops!'}
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  marginVertical: 20,
                }}>
                <Text
                  style={{
                    fontSize: 30,
                    color:
                      score > allQuestions.length / 2
                        ? COLORS.success
                        : COLORS.error,
                  }}>
                  {score}
                </Text>
                <Text style={Styles.quesLength}>/ {allQuestions.length}</Text>
              </View>
              {/* Retry Quiz button */}
              <TouchableOpacity
                onPress={restartQuiz}
                style={Styles.restartQuiz}>
                <Text style={Styles.restartQuizText}>Retry Quiz</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Background Image */}
        {/* <Image
          source={require('../assets/images/DottedBG.png')}
          style={{
            width: SIZES.width,
            height: 130,
            zIndex: -1,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            opacity: 0.5,
          }}
          resizeMode={'contain'}
        /> */}
      </View>
    </SafeAreaView>
  );
};

export default MyQuestions;

//styleShhet
const Styles = StyleSheet.create({
  timer: {
    // show  above the Progressbar in center
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: COLORS.primary,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerText: {
    fontSize: 15,
    color: COLORS.white,
  },
  //question Counter css
  counter: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  counterText: {
    color: COLORS.white,
    fontSize: 20,
    opacity: 0.6,
    marginRight: 2,
  },
  counterDiv: {color: COLORS.white, fontSize: 18, opacity: 0.6},

  questionContainer: {
    marginVertical: 40,
  },

  //question css
  question: {
    color: COLORS.white,
    fontSize: 30,
  },
  opt: {fontSize: 20, color: COLORS.white},
  //option css
  correctOptionstle: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    backgroundColor: COLORS.success,
    justifyContent: 'center',
    alignItems: 'center',
  },
  correctOptionstleIcon: {
    color: COLORS.white,
    fontSize: 20,
  },
  correctOptionSelectedcss: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    backgroundColor: COLORS.error,
    justifyContent: 'center',
    alignItems: 'center',
  },

  //progress bar css
  progress: {
    width: '100%',
    height: 20,
    borderRadius: 20,
    backgroundColor: '#00000020',
  },
  progressAnimated: {
    height: 20,
    borderRadius: 20,
    backgroundColor: COLORS.accent,
  },
  //dfsf
  nextbtn: {
    marginTop: 20,
    width: '100%',
    backgroundColor: COLORS.accent,
    padding: 20,
    borderRadius: 5,
  },
  nextbtnText: {
    textAlign: 'center',
    color: COLORS.white,
    fontSize: 20,
  },
  allinLine: {
    flex: 1,
    paddingVertical: 40,
    paddingHorizontal: 16,
    backgroundColor: COLORS.background,
    position: 'relative',
  },
  //modal view css
  modalViewStyle: {
    flex: 1,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalViewStyle2: {
    backgroundColor: COLORS.white,
    width: '90%',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  modalText: {fontSize: 30, fontWeight: 'bold'},
  quesLength: {
    fontSize: 20,
    color: COLORS.black,
  },
  //restart quiz button css
  restartQuiz: {
    backgroundColor: COLORS.accent,
    padding: 20,
    width: '100%',
    borderRadius: 20,
  },
  restartQuizText: {
    textAlign: 'center',
    color: COLORS.white,
    fontSize: 20,
  },
});
