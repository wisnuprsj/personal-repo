import { View, Text } from "react-native";

function PrimaryButton(props) {
  return (
    <View>
      <Text>{props.children}</Text>
    </View>
  );
}

export default PrimaryButton;
