'use strict';

export default {
  getUniqueId: jest.fn().mockImplementation(() => 'abc'),
  getIPAddress: jest.fn(),
};
