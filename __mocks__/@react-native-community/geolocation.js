'use strict';

export default {
  addListener: jest.fn(),
  getCurrentPosition: jest.fn().mockImplementation(success =>
    Promise.resolve(
      success({
        coords: {
          latitude: 51.1,
          longitude: 45.3,
          speed: 2,
          accuracy: 1,
          altitude: 3,
        },
        timestamp: 1571959741000,
      }),
    ),
  ),
  removeListeners: jest.fn(),
  requestAuthorization: jest.fn(),
  setConfiguration: jest.fn(),
  startObserving: jest.fn(),
  stopObserving: jest.fn(),
};
