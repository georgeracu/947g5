import analytics from '@react-native-firebase/analytics';

export function logEvent(deviceId, event, timestamp, status, duration = null) {
  if (duration == null) {
    analytics().logEvent(event, {
      deviceId: deviceId,
      timestamp: timestamp,
      status: status,
    });
  } else {
    analytics().logEvent(event, {
      deviceId: deviceId,
      timestamp: timestamp,
      duration: duration,
      status: status,
    });
  }
};
