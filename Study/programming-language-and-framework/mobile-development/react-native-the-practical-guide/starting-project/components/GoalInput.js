import {
  Button,
  StyleSheet,
  TextInput,
  View,
  Modal,
  Image,
} from "react-native";

function GoalInput({
  goal,
  addGoalHandler,
  goalInputHandler,
  visible,
  endAddGoalHandler,
}) {
  console.log("GoalInput");
  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.inputContainer}>
        <Image
          style={styles.image}
          source={require("../assets/images/goal.png")}
          // source="/some/path/to/image.png"
        />
        <TextInput
          style={styles.textInput}
          placeholder="Your course goal!"
          onChangeText={goalInputHandler}
          value={goal}
        />
        <View style={styles.actionContainer}>
          <View style={styles.button}>
            <Button title="Add Goal" onPress={addGoalHandler} color="#b180f0" />
          </View>
          <View style={styles.button}>
            <Button
              title="Cancel"
              onPress={endAddGoalHandler}
              color="#f31283"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default GoalInput;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#311b6b",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#e4d0ff",
    backgroundColor: "#e4d0ff",
    width: "70%",
    borderRadius: 6,
    marginRight: 8,
    padding: 16,
    color: "#120438",
  },
  image: {
    width: 100,
    height: 100,
    margin: 20,
  },
  actionContainer: {
    flexDirection: "row",
  },
  button: {
    width: "40%",
    marginHorizontal: 8,
  },
});
