import Geolocation from 'react-native-geolocation-service';
import {Alert, PermissionsAndroid, Platform} from 'react-native';
import LocationSwitch from 'react-native-location-switch';

/**
 * This function checks for Geolocation permission on Android devices from API 21 and above and requests it in case it
 * isn't already granted
 * @returns true/false if we have permission granted
 */
async function requestGeolocationPermissionAndroid() {
  try {
    return await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message: 'App needs permission to access your location',
        buttonNeutral: 'Ask me later',
        buttonNegative: 'Deny',
        buttonPositive: 'Ok',
      },
    );
  } catch (ex) {
    Alert.alert(
      'Geolocation Permission',
      'Unable to get Geolocation Permission',
    );
  }
}

/**
 * This function uses the Geolocation API to retrieve the coordinates of the Phone's current location
 * @returns An object containing the coords if successful or the error code and message if there was an error
 * If Location can't be accessed, return a string.
 */
async function getGeolocation(handleSuccess, handleFailure) {
  if (Platform.OS === 'android') {
    const isLocationGranted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (isLocationGranted) {
      console.log('0');
      Geolocation.watchPosition(handleSuccess, handleFailure, {
        enableHighAccuracy: true,
      });
    } else {
      requestGeolocationPermissionAndroid();
    }
  } else if (Platform.OS === 'ios') {
    Geolocation.watchPosition(handleSuccess, handleFailure, {
      enableHighAccuracy: true,
    });
  }
}

/**
 * This function retrieves coordinates to used in displaying in HeatMaps
 * @param endpoint
 * @param geoCoords
 * @param handleStateUpdate
 * @returns {Promise<void>}
 */
async function getHeatMapsCoordinates(endpoint, geoCoords, handleStateUpdate) {
  fetch(endpoint).then(response => {
    const newState = {};
    newState.coords = geoCoords.coords;
    response.json().then(heatMapsCoordinates => {
      newState.heatMapsCoordinates = heatMapsCoordinates;
      handleStateUpdate(newState);
    });
  });
}

/**
 *
 */
function getGeolocationServices(handleSuccess, handleFailure) {
  if (Platform.OS === 'android') {
    const isLocationGranted = requestGeolocationPermissionAndroid();
    if (isLocationGranted) {
      LocationSwitch.isLocationEnabled(
        () => {
          getGeolocation(handleSuccess, handleFailure);
        },
        () => {
          Geolocation.getCurrentPosition(
            () => getGeolocation(handleSuccess, handleFailure),
            () => console.log('This is redundant'),
            {enableHighAccuracy: true, timeout: 1000, maximumAge: 100},
          );
        },
      );
    } else {
      getGeolocationServices(handleSuccess, handleFailure);
    }
  } else {
    Geolocation.getCurrentPosition(
      () => getGeolocation(handleSuccess, handleFailure),
      () => console.log('This is redundant'),
      {enableHighAccuracy: true, timeout: 1000, maximumAge: 100},
    );
  }
}

module.exports = {
  getGeolocationServices,
  getHeatMapsCoordinates,
};
