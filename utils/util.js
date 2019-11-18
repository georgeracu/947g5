import DeviceInfo from 'react-native-device-info';

/**
 * This function sends logs to the backend server
 * @param endpoint
 * @param event
 * @param message
 */
function sendLog(endpoint, event, message = '') {
  fetch(endpoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      deviceId: DeviceInfo.getUniqueId(),
      timestamp: Date.now(),
      event,
      message,
    }),
  });
}

module.exports = {
  sendLog,
};
