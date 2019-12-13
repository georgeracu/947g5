import Geolocation from 'react-native-geolocation-service';
import {Alert, PermissionsAndroid, Platform} from 'react-native';
import log from '../utils/logs';
import constants from '../utils/constants';

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

async function getNearestHouseInfo(endpoint, coords, handleState) {
  fetch(endpoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      longitude: coords.longitude,
      latitude: coords.latitude,
    }),
  })
    .then(response => {
      const newState = {};
      //newState.coords = coords;
      response.json().then(findNearestHouse => {
        newState.closestHouse = findNearestHouse;
        //newState.loading = false;
        if (findNearestHouse == null) {
          Alert.alert('Error', 'No house price available');
        } else {
          const formattedOutput =
            findNearestHouse.PAON.toString() +
            ' ' +
            findNearestHouse.Street +
            '\n' +
            findNearestHouse.TOWN_NAME +
            '\nPrice: ' +
            findNearestHouse.Price.toString();
          Alert.alert('Property info:', formattedOutput);
        }
        handleState(newState);
      });
    })
    .catch(error => {
      Alert.alert('HeatMap', 'Unable to find nearest house');
      // Log this response when the nearest house can't be retrieved
      log.sendLog(
        constants.LOGS_ENDPOINT,
        'onFindNearestHouseFailure',
        error.message,
      );
    });
}

/**
 * This function retrieves coordinates to used in displaying in HeatMaps
 * @param endpoint
 * @param coords
 * @param handleState
 * @returns {Promise<void>}
 */
async function getHeatMapsCoordinates(
  endpoint,
  coords,
  queryRadius,
  handleState,
) {
  fetch(endpoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      longitude: coords.longitude,
      latitude: coords.latitude,
      radius: queryRadius,
    }),
  })
    .then(response => {
      const newState = {};
      newState.coords = coords;
      response.json().then(heatMapsCoordinates => {
        newState.heatMapsCoordinates = heatMapsCoordinates;
        newState.loading = false;
        handleState(newState);
      });
    })
    .catch(error => {
      Alert.alert('HeatMap', 'Unable to load HeatMaps');
      // Log this response when the heatmaps can't be retrieved
      log.sendLog(
        constants.LOGS_ENDPOINT,
        'onLoadHeatMapsFailure',
        error.message,
      );
    });
}

/**
 * This function checks geolocation permission and request it if granted or displays a rationale if not.
 * @param handleSuccess
 * @param handleFailure
 * @returns {Promise<void>}
 */
async function getGeolocationServices(handleSuccess, handleFailure) {
  if (Platform.OS === 'android') {
    const isLocationGranted = await requestGeolocationPermissionAndroid();
    if (isLocationGranted) {
      handleGeolocationOperation(handleSuccess, handleFailure);
    } else {
      getGeolocationServices(handleSuccess, handleFailure);
    }
  } else {
    handleGeolocationOperation(handleSuccess, handleFailure);
  }
}

/**
 * This functions handles the geolocation operation
 * @param handleSuccess
 * @param handleFailure
 */
function handleGeolocationOperation(handleSuccess, handleFailure) {
  Geolocation.getCurrentPosition(
    () => getGeolocation(handleSuccess, handleFailure),
    () =>
      Alert.alert('Location', 'Please allow location access to display Map', [
        {
          text: 'Allow',
          onPress: () => getGeolocationServices(handleSuccess, handleFailure),
        },
        {
          text: 'Deny',
          onPress: () => console.log('Do nothing'),
          style: 'cancel',
        },
      ]),
    {enableHighAccuracy: true, timeout: 1000, maximumAge: 100},
  );
}

module.exports = {
  getGeolocationServices,
  getHeatMapsCoordinates,
  getNearestHouseInfo,
};
