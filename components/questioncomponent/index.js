import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ButtonGroup } from "react-native-elements";

const Question = ({ navigation, data, currentQuestionIndex, userAnswers }) => {
  const currentQuestion = data[currentQuestionIndex];
  const [selectedIndexes, setSelectedIndexes] = useState([]);

  useEffect(() => {
    setSelectedIndexes([]); //reset the selection for each question
  }, [currentQuestionIndex]);

  const handleAnswer = (index) => {
    if (
      currentQuestion.type === "multiple-answer" ||
      currentQuestionIndex === 0
    ) {
      //multiple answer
      let updatedIndexes = selectedIndexes.includes(index)
        ? selectedIndexes.filter((i) => i !== index) //remove if already selected
        : [...selectedIndexes, index]; //add if not selected

      setSelectedIndexes(updatedIndexes);
      const updatedAnswers = [...userAnswers];
      updatedAnswers[currentQuestionIndex] = updatedIndexes;
      navigation.setParams({ userAnswers: updatedAnswers });
    } else {
      //single-choice questions
      setSelectedIndexes([index]);
      const updatedAnswers = [...userAnswers];
      updatedAnswers[currentQuestionIndex] = index;
      navigation.setParams({ userAnswers: updatedAnswers });
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex === data.length - 1) {
      navigation.navigate("Summary", { data, userAnswers });
    } else {
      navigation.navigate("Question", {
        currentQuestionIndex: currentQuestionIndex + 1,
        userAnswers,
      });
    }
  };

  const renderTouchableOpacityChoices = () => {
    return currentQuestion.choices.map((choice, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => handleAnswer(index)}
        style={[
          styles.choiceButton,
          selectedIndexes.includes(index) && styles.selectedChoiceButton,
        ]}
      >
        <Text
          style={[
            styles.choiceText,
            selectedIndexes.includes(index) && styles.selectedChoiceText,
          ]}
        >
          {choice}
        </Text>
      </TouchableOpacity>
    ));
  };
  //use buttongroup
  const renderButtonGroup = () => {
    return (
      <View style={styles.buttonGroupContainer}>
        {currentQuestion.choices.map((choice, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleAnswer(index)}
            style={[
              styles.buttonGroupButton,
              selectedIndexes.includes(index) &&
                styles.selectedButtonGroupButton,
            ]}
          >
            <Text
              style={[
                styles.buttonGroupText,
                selectedIndexes.includes(index) &&
                  styles.selectedButtonGroupText,
              ]}
            >
              {choice}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  if (!currentQuestion || !currentQuestion.choices) {
    return <Text>Error: Question data not found</Text>; //check for errors
  }

  return (
    <View style={styles.container}>
      <Text style={styles.prompt}>{currentQuestion.prompt}</Text>
      {/*render conditionally based on index of question*/}
      {currentQuestionIndex === 0
        ? renderTouchableOpacityChoices()
        : renderButtonGroup()}
      <TouchableOpacity onPress={handleNextQuestion} style={styles.nextButton}>
        <Text style={styles.nextButtonText}>
          {currentQuestionIndex === data.length - 1 ? "Finish Quiz" : "Next"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

//styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  prompt: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  choicesContainer: {
    marginBottom: 20,
  },
  choiceButton: {
    padding: 15,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#8b44db",
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
    alignItems: "center",
  },
  selectedChoiceButton: {
    backgroundColor: "#8b44db",
  },
  choiceText: {
    fontSize: 16,
    color: "#8b44db",
  },
  selectedChoiceText: {
    color: "#fff",
  },
  nextButton: {
    marginTop: 20,
    backgroundColor: "#8b44db",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonGroupContainer: {
    flexDirection: "column", //vertical buttons
    marginVertical: 10,
  },

  buttonGroupButton: {
    borderWidth: 1,
    borderColor: "#8b44db",
    borderRadius: 5,
    marginBottom: 10, //space between buttons
    backgroundColor: "#fff",
    paddingVertical: 15,
  },

  selectedButtonGroupButton: {
    backgroundColor: "#8b44db", //button bg color purple
  },

  buttonGroupText: {
    fontSize: 16,
    color: "#8b44db",
    textAlign: "center",
  },

  selectedButtonGroupText: {
    color: "#fff",
  },
});

export default Question;
