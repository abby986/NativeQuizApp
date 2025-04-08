import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const isAnswerCorrect = (correctAnswer, userAnswer) => {
  if (Array.isArray(correctAnswer) && Array.isArray(userAnswer)) {
    return (
      correctAnswer.length === userAnswer.length &&
      correctAnswer.sort().join(",") === userAnswer.sort().join(",")
    );
  }
  return correctAnswer === userAnswer; //single choice or t/f questions
};

const Summary = ({ data, userAnswers, navigation }) => {
  let score = 0;
  data.forEach((question, index) => {
    if (isAnswerCorrect(question.correct, userAnswers[index])) {
      score++;
    }
  });

  const handleRestartQuiz = () => {
    //restart quiz and go back to first question
    navigation.navigate("Question", {
      currentQuestionIndex: 0, //go to first question
      userAnswers: [], //reset the answers on restart
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz Summary</Text>
      <Text style={styles.score}>
        You scored {score} out of {data.length}
      </Text>

      {data.map((question, index) => (
        <View key={index} style={styles.questionContainer}>
          <Text style={styles.question}>{question.prompt}</Text>
          <Text style={styles.userAnswer}>
            Your Answer:{" "}
            {Array.isArray(userAnswers[index])
              ? userAnswers[index].map((i) => question.choices[i]).join(", ")
              : question.choices[userAnswers[index]]}
          </Text>
          <Text
            style={[
              styles.result,
              isAnswerCorrect(question.correct, userAnswers[index])
                ? styles.correct
                : styles.incorrect,
            ]}
          >
            {isAnswerCorrect(question.correct, userAnswers[index])
              ? "Correct"
              : "Incorrect"}
          </Text>
        </View>
      ))}

      {/* Restart Quiz Button */}
      <TouchableOpacity
        onPress={handleRestartQuiz}
        style={styles.restartButton}
      >
        <Text style={styles.restartButtonText}>Restart Quiz</Text>
      </TouchableOpacity>
    </View>
  );
};
//styles
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  score: { fontSize: 18, textAlign: "center", marginBottom: 20 },
  questionContainer: { marginBottom: 20 },
  question: { fontSize: 18, fontWeight: "bold" },
  userAnswer: { fontSize: 16, marginVertical: 5 },
  result: { fontSize: 16, fontWeight: "bold" },
  correct: { color: "green" },
  incorrect: { color: "red" },
  restartButton: {
    marginTop: 20,
    backgroundColor: "#8b44db",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  restartButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default Summary;
