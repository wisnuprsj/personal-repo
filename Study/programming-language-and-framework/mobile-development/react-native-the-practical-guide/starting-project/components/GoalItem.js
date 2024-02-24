import { StyleSheet, Text, View, Pressable } from "react-native";

function GoalItem({ itemData, deleteGoal }) {
  return (
    // <Pressable onPress={() => deleteGoal(itemData.item.id)}>
    <Pressable
      android_ripple={{ color: "#dddddd" }}
      onPress={deleteGoal.bind(this, itemData.item.id)}
      style={({ pressed }) => pressed && styles.pressedItem}
    >
      <View style={styles.goalItem}>
        <Text style={styles.goalText}>{itemData.item.text}</Text>
      </View>
    </Pressable>
  );
}

export default GoalItem;

const styles = StyleSheet.create({
  goalItem: {
    margin: 8,
    borderRadius: 6,
    backgroundColor: "#5e0acc",
  },
  pressedItem: {
    opacity: 0.5,
  },
  goalText: {
    color: "white",
    padding: 8,
  },
});
