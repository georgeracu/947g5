'use strict';

import renderer from 'react-test-renderer';
import util from '../utils/util';
import React from 'react';

describe('The utility component', () => {
  test('Renders correctly', () => {
    const tree = renderer.create(<util />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
