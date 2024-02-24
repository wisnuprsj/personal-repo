import { StyleSheet, View, FlatList, Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [goal, setGoal] = useState("");
  const [goalList, setGoalList] = useState([]);

  function startAddGoalHandler() {
    setModalIsVisible(true);
  }

  function endAddGoalHandler() {
    setModalIsVisible(false);
  }

  function goalInputHandler(enteredText) {
    setGoal(enteredText);
  }

  function addGoalHandler() {
    setGoalList((prevGoals) => [
      ...prevGoals,
      { text: goal, id: Math.random().toString() },
    ]);
    setGoal("");
  }

  function deleteGoalHandler(id) {
    setGoalList((prevState) => prevState.filter((goal) => goal.id != id));
  }

  return (
    // <View style={styles.container}>
    //   <View>
    //     <Text style={styles.dummyText}>Another piece of text!</Text>
    //   </View>
    //   <Text style={styles.dummyText}>Hello World!</Text>
    //   <Button title="tap me" />
    // </View>
    <>
      <StatusBar style="light" />
      <View style={styles.appContainer}>
        <Button
          title="Add New Goal"
          color="#a065ec"
          onPress={startAddGoalHandler}
        />
        <GoalInput
          goal={goal}
          addGoalHandler={addGoalHandler}
          goalInputHandler={goalInputHandler}
          endAddGoalHandler={endAddGoalHandler}
          visible={modalIsVisible}
        />
        <View style={styles.goalsContainer}>
          <FlatList
            data={goalList}
            renderItem={(itemData) => {
              return (
                <GoalItem itemData={itemData} deleteGoal={deleteGoalHandler} />
              );
            }}
            keyExtractor={(item, index) => {
              return item.id;
            }}
            alwaysBounceVertical={false}
          />
          {/* <ScrollView>
          {goalList.map((goal, index) => (
            <View style={styles.goalItem} key={index}>
              <Text style={styles.goalText}>{goal}</Text>
            </View>
          ))}
        </ScrollView> */}
        </View>
      </View>
    </>

    // learn flexbox
    // <View
    //   style={{
    //     padding: 50,
    //     flexDirection: "row",
    //     width: "80%",
    //     height: 300,
    //     justifyContent: "space-between",
    //     alignItems: "center",
    //   }}
    // >
    //   <View
    //     style={{
    //       backgroundColor: "red",
    //       flex: 1,
    //       justifyContent: "center",
    //       alignItems: "center",
    //     }}
    //   >
    //     <Text>1</Text>
    //   </View>
    //   <View
    //     style={{
    //       backgroundColor: "blue",
    //       flex: 1,
    //       justifyContent: "center",
    //       alignItems: "center",
    //     }}
    //   >
    //     <Text>2</Text>
    //   </View>
    //   <View
    //     style={{
    //       backgroundColor: "green",
    //       flex: 1,
    //       justifyContent: "center",
    //       alignItems: "center",
    //     }}
    //   >
    //     <Text>3</Text>
    //   </View>
    // </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    // backgroundColor: "#1e085a",
  },
  goalsContainer: {
    flex: 6,
  },

  // container: {
  //   flex: 1,
  //   backgroundColor: "#fff",
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  // dummyText: {
  //   margin: 16,
  //   padding: 10,
  //   borderWidth: 2,
  //   borderColor: "red",
  // },
});
