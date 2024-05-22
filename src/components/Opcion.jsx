import { Pressable, StyleSheet } from "react-native";
import StyledText from "./StyledText";
import theme from "../theme";
import { useState } from "react";

const Opcion = ({
  llave,
  opcion,
  isSelected,
  add,
  color,
  disabled = false,
}) => {
  return (
    <Pressable
      key={llave}
      onPress={() => add(llave)}
      style={[
        styles.container,
        disabled ? color(llave) : isSelected == llave ? styles.selected : styles.white
      ]}
      disabled={disabled}
    >
      <StyledText style={styles.texto}>{`${llave}. ${opcion}`}</StyledText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderRadius: 21,
    marginBottom: 10,
    elevation: 3
  },
  texto: {
    paddingHorizontal: 10,
  },
  white: {
    backgroundColor: theme.colors.lightWhite,
  },
  selected: {
    backgroundColor: "#5DADE2",
  },
});

export default Opcion;
