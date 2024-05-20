import { View, Pressable, StyleSheet } from "react-native";
import StyledText from "./StyledText";

const StyledButton = ({ text, pressFn }) => {
  return (
    <View style={styles.fixToText}>
      <Pressable
        onPress={pressFn}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "rgb(210, 230, 255)" : "white",
          },
          styles.wrapperCustom,
        ]}
      >
        <StyledText
          fontSize="subheading"
          fontWeight="bold"
          style={styles.pregunta}
        >
          {text}
        </StyledText>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
    pregunta: {
      marginBottom: 10,
    },
    fixToText: {
      flexDirection: "row",
      justifyContent: "center",
    },
    wrapperCustom: {
      borderRadius: 8,
      borderWidth: 1,
      borderColor: "black",
      padding: 6,
      backgroundColor: "#FAE5D3",
    },
  });
  

export default StyledButton;
