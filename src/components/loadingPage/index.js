import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { colors } from '../../constants/theme';

export default function LoadingPage() {
  return (
    <Container>
      <ActivityIndicator size="small" color={colors.primary} />
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
});
