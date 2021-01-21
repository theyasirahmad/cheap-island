import React, { useState } from 'react';
import ToggleSwitch from 'toggle-switch-react-native';
import { Colors } from '../constants/theme'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const SettingOption = ({ optionTxt, baseline, value, setToggle }) => {
  // const [toggle, setToggle] = useState(value);
  return (
    <View style={[styles.container, { borderBottomWidth: baseline ? 1 : 0 }]}>
      <Text style={{ color: 'grey' }}>{optionTxt}</Text>
      <ToggleSwitch
        isOn={value}
        onColor={Colors.LinearBlue1}
        offColor="#bbb"
        // label="Example label"
        labelStyle={{ color: 'black', fontWeight: '900' }}
        size="medium"
        onToggle={() => {
          setToggle(!value);
        }}
      />
    </View>
  );
};

export default SettingOption;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    height: 50,
    marginHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
});
