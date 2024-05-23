import React, { useContext} from "react";
import {
  StyleSheet,
  View,
} from "react-native";
import { UserContext } from "../context/user";
import Stats from '../components/Stats'
import SettingsMain from '../components/SettingsMain'
import SettingsTriggers from '../components/SettingsTriggers'

const Settings = () => {
  const {
    state: user
  } = useContext(UserContext);
  console.log(user);
  if (user)
    return (
      <View style={styles.container}>
        <View style={styles.margin}>
          <SettingsMain></SettingsMain>
          <SettingsTriggers></SettingsTriggers>
          <Stats></Stats>
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAE5D3",
    justifyContent: "center",
  },
  margin: {
    marginHorizontal: 25,
  }
});

export default Settings;
