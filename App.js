import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Question from "./components/questioncomponent/index.js";
import Summary from "./components/summarycomponent/index.js";

const Stack = createStackNavigator();

//quiz questions
const quizData = [
  {
    prompt: "Which of the following are Pikmin colors?",
    type: "multiple-answer",
    choices: ["Red", "Orange", "Purple", "Brown"],
    correct: [0, 2], //red and purple
  },
  {
    prompt: "What is the name of Olimar's dog?",
    type: "multiple-choice",
    choices: ["Algae", "Oatchi", "Moss", "Fido"],
    correct: 2, //moss
  },
  {
    prompt: "The purple Pikmin has the strength of 10 Pikmin.",
    type: "true-false",
    choices: ["True", "False"],
    correct: 0, //true
  },
  {
    prompt: "Glow pikmin are immune to poison.",
    type: "true-false",
    choices: ["True", "False"],
    correct: 1, //false
  },
];

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Question"
        screenOptions={{
          headerShown: true, //show header
        }}
      >
        {/* Question Screen */}
        <Stack.Screen
          name="Question"
          options={{
            headerLeft: null, //get rid of arrow
            title: "Quiz App", //header title
          }}
        >
          {({ navigation, route }) => {
            const currentQuestionIndex =
              route?.params?.currentQuestionIndex ?? 0;
            const userAnswers = route?.params?.userAnswers ?? [];

            return (
              <Question
                navigation={navigation}
                data={quizData}
                currentQuestionIndex={currentQuestionIndex}
                userAnswers={userAnswers}
              />
            );
          }}
        </Stack.Screen>

        {/* Summary Screen */}
        <Stack.Screen
          name="Summary"
          options={{
            headerLeft: null, //get rid of arrow
            title: "Summary", //header title
          }}
        >
          {({ route, navigation }) => {
            if (
              !route.params ||
              !route.params.data ||
              !route.params.userAnswers
            ) {
              return <Text>Error: Missing quiz data or user answers.</Text>; //check for error
            }
            return <Summary navigation={navigation} {...route.params} />;
          }}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
