import { View, Pressable, StyleSheet } from "react-native";
import StyledText from "./StyledText";

const StyledButton = ({ text, pressFn }) => {
  return (
    <View style={styles.fixToText}>
      <Pressable
        onPress={pressFn}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "rgb(210, 230, 255)" : "#D3EEF9",
          },
          styles.wrapperCustom,
        ]}
      >
        <StyledText fontSize="subheading" fontWeight="bold">
          {text}
        </StyledText>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  fixToText: {
    flexDirection: "row",
    justifyContent: "center",
  },
  wrapperCustom: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    elevation: 5,
    // backgroundColor: "#FAE5D3",
  },
});

export default StyledButton;
