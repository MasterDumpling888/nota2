import React from 'react';
import { Text } from 'react-native';

// Mocking the Ionicons component to return a simple Text component
export default ({ name, size, color }) => (
  <Text>{`Ionicon: ${name}, size: ${size}, color: ${color}`}</Text>
);