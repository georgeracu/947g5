'use strict';

jest.mock('react-native-maps', () => {
  const {View} = require('react-native');
  const MockMapView = (props: any) => {
    return <View>{props.children}</View>;
  };
  const MockMarker = (props: any) => {
    return <View>{props.children}</View>;
  };
  return {
    __esModule: true,
    default: MockMapView,
    Marker: MockMarker,
  };
});

import 'react-native';
import React from 'react';
import App from '../App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('The main page component', () => {
  test('Matches the snapshot when has permissions', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('Matches the snapshot when is missing permissions', () => {
    jest.mock('react-native', () => ({
      PermissionsAndroid: {
        askAsync: jest.fn(),
      },
    }));
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
