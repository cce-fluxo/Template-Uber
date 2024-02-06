import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  ImageBackgroundBase,
} from 'react-native';

import { colors } from '../../../constants/theme';

export default function ArticlesCard({
  articlesInformation /*, setModalVisible, setModalInformation*/,
}) {
  /*
    function handleCard (){
        setModalVisible(true);
        setModalInformation(feedInformation);
    }

    */

  return (
    <>
      <TouchableOpacity style={styles.greatBox} /*onPress={handleCard}*/>
        <ImageBackground
          source={articlesInformation.articlesImageSource}
          style={styles.imageBack}
          blurRadius={5}
          resizeMode="cover"
          opacity={0.4}
          borderRadius={10}
        >
          <Text style={styles.title}>
            {articlesInformation.articlesPostTitle}
          </Text>
        </ImageBackground>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  greatBox: {
    width: 220,
    marginLeft: 20,
    borderRadius: 10,
  },
  container: {
    width: 220,
    height: 220,
    width: '100%',
    backgroundColor: colors.primary,
    borderRadius: 10,
    flexDirection: 'column-reverse',
    opacity: 0,
  },
  title: {
    marginTop: 0,
    fontSize: 18,
    fontWeight: '500',
    color: colors.background,
    marginBottom: 8,
    marginLeft: 10,
    marginRight: 10,
  },
  imageBack: {
    flexDirection: 'column-reverse',
    width: 220,
    height: 220,
    borderRadius: 10,
    backgroundColor: colors.primary,
  },
});
