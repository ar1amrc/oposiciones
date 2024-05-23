import React, { useContext, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import {
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import StyledText from "../components/StyledText";
import { UserContext } from "../context/user";

function SettingsTriggers() {
  const {
    state: user,
    updateVibracionesUser,
    updateNotificacionesUser ,
  } = useContext(UserContext);

  const toogleNotify = () => {
    if (user.notificaciones == 1) {
        updateNotificacionesUser(0);
    } else {
        updateNotificacionesUser(1);
    }
  }
  const toogleVibrate = () => {
    if (user.vibraciones == 1) {
      updateVibracionesUser(0);
    } else {
        updateVibracionesUser(1);
    }
  }

  return (
    <View style={styles.buttons}>
      <View style={{ alignItems: "center" }}>
        <Pressable onPress={toogleNotify}>
          {user.notificaciones == 1 && (
            <Ionicons name="notifications-outline" size={24} color="black" />
          )}
          {user.notificaciones == 0 && (
            <Ionicons
              name="notifications-off-outline"
              size={24}
              color="black"
            />
          )}
        </Pressable>
        <StyledText fontSize="subheading" fontWeight="bold">
          Notificaciones
        </StyledText>
      </View>
      <View style={{ alignItems: "center" }}>
        <Pressable onPress={toogleVibrate}>
          {user.vibraciones == 1 && (
            <MaterialCommunityIcons name="vibrate" size={24} color="black" />
          )}
          {user.vibraciones == 0 && (
            <MaterialCommunityIcons
              name="vibrate-off"
              size={24}
              color="black"
            />
          )}
        </Pressable>
        <StyledText fontSize="subheading" fontWeight="bold">
          Vibración
        </StyledText>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
    marginTop: 20,
  },
});
export default SettingsTriggers;
