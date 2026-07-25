import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../App';

jest.mock('../src/navigation/AppNavigator', () => {
  const { View } = require('react-native');
  return function MockAppNavigator() {
    return <View testID="MockAppNavigator" />;
  };
});

jest.mock('../src/screens/SplashScreen', () => {
  const { View } = require('react-native');
  return {
    SplashScreen: function MockSplashScreen() {
      return <View testID="MockSplashScreen" />;
    },
  };
});

test('renders correctly', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<App />);
  });
});
