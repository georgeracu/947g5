'use strict';

import renderer from 'react-test-renderer';
import geolocation from '../geolocation/geolocation';
import React from 'react';

describe('The utility component', () => {
  test('Renders correctly', () => {
    const tree = renderer.create(<geolocation />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
