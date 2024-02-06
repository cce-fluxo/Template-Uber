import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { colors } from '../../constants/theme';
import { Feather } from '@expo/vector-icons';

const FaqAccordion = ({ text, title }) => {
  const [showText, setShowText] = useState(false);

  return (
    <TouchableOpacity onPress={() => setShowText(!showText)}>
      {!showText ? (
        <View style={styles.notOpenContainer}>
          <View style={{ width: '80%' }}>
            <Text style={styles.title}>{title}</Text>
          </View>
          <View style={{ paddingLeft: 10 }}>
            <Feather name="chevron-down" size={20} color={colors.primary} />
          </View>
        </View>
      ) : (
        <View style={styles.openContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <View style={{ width: '80%' }}>
              <Text style={styles.title}>{title}</Text>
            </View>
            <View style={{ paddingLeft: 10, alignSelf: 'center' }}>
              <Feather name="chevron-right" size={20} color={colors.primary} />
            </View>
          </View>
          <View
            style={{
              justifyContent: 'flex-start',
              width: '100%',
              paddingTop: 5,
            }}
          >
            <Text style={styles.text}>{text}</Text>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  notOpenContainer: {
    minHeight: '5%',
    width: '100%',
    borderBottomColor: colors.font + 20,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  openContainer: {
    minHeight: '5%',
    width: '100%',
    borderBottomColor: colors.font + 20,
    borderBottomWidth: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  title: {
    marginTop: 10,
    color: colors.font,
    fontWeight: '600',
    fontSize: 16,
  },
  text: {
    color: colors.font,
    width: '80%',
    textAlign: 'left',
  },
});

export default FaqAccordion;
