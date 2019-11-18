import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid, Platform} from 'react-native';

/**
 * This function checks for Geolocation permission on Android devices from API 21 and above and requests it in case it
 * isn't already granted
 * @returns true/false if we have permission granted
 */
async function checkGeolocationPermissionGoogle() {
  try {
    const isLocationAlreadyGranted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (!isLocationAlreadyGranted) {
      return await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'App needs permission to access your location',
          buttonNeutral: 'Ask me later',
          buttonNegative: 'Cancel',
          buttonPositive: 'Ok',
        },
      );
    }
  } catch (ex) {
    throw 'Unable to obtain Geolocation permission';
  }
}

/**
 * This function uses the Geolocation API to retrieve the coordinates of the Phone's current location
 * @returns An object containing the coords if successful or the error code and message if there was an error
 * If Location can't be accessed, return a string.
 */
async function getCurrentGeolocation(handleSuccess, handleFailure) {
  if (Platform.OS === 'android') {
    const isLocationGranted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (isLocationGranted) {
      Geolocation.watchPosition(handleSuccess, handleFailure, {
        enableHighAccuracy: true,
      });
    } else {
      checkGeolocationPermissionGoogle();
    }
  } else if (Platform.OS === 'ios') {
    Geolocation.watchPosition(handleSuccess, handleFailure, {
      enableHighAccuracy: true,
    });
  }
}

module.exports = {
  checkGeolocationPermissionGoogle,
  getCurrentGeolocation,
};
