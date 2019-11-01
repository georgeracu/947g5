/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  PermissionsAndroid,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import {getUniqueId} from 'react-native-device-info';
import Geolocation from 'react-native-geolocation-service';
import analytics from '@react-native-firebase/analytics';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import moment from 'moment';
export default class App extends Component {
  constructor(props) {
    super(props);

    /**
     * This state object holds the response from the Geolocation API
     * @type {{timeStamp: string, altitude: number, latitude: number, errorMessage: string, accuracy: number, speed: number, longitude: number}}
     */
    this.state = {
      coords: {},
      errorMessage: 'No location data',
      homeStatus: '',
    };

    this.COORDS_ENDPOINT =
      'https://us-central1-test-947g5.cloudfunctions.net/coords';
    this.deviceId = getUniqueId();
  }

  /**
   * This method updates the state object with the response from the Geolocation API
   * @param response
   */
  handleGeolocationSuccess = async response => {
    // Log this response when the Geolocation has been retrieve
    await analytics().logEvent('onRequestGeolocationSuccess', {
      deviceId: this.deviceId,
      timestamp: Date.now(),
      status: 'Geolocation was retrieved successfully',
    });

    this.setState({
      coords: response.coords,
      errorMessage: '',
      homeStatus: 'Calling home . . .',
    });

    // Log this response when we attempt to call home
    const onCallHomeTime = Date.now();
    await analytics().logEvent('onCallHome', {
      deviceId: this.deviceId,
      timestamp: onCallHomeTime,
      status: 'Calling home',
    });

    let result = await fetch(this.COORDS_ENDPOINT + '/create', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        deviceId: this.deviceId,
        coords: response.coords,
      }),
    });
    let resultJson = await result.json();
    if (resultJson.code > 0) {
      this.setState(
        prevState => (prevState.homeStatus = 'Successfully reached home . . .'),
      );
      // Log this response when we successfully reach home
      await analytics().logEvent('onReachHomeSuccess', {
        deviceId: this.deviceId,
        timestamp: Date.now(),
        duration: moment(onCallHomeTime).fromNow(),
        status: 'Successfully reached home',
      });
    } else {
      this.setState(
        prevState => (prevState.homeStatus = 'Unable to reach home'),
      );
      // Log this response when we are unable to reach home
      await analytics().logEvent('onReachHomeFailure', {
        deviceId: this.deviceId,
        timestamp: Date.now(),
        duration: moment(onCallHomeTime).fromNow(),
        status: 'Unable to reach home',
      });
    }
  };

  /**
   * This method updates the state with the Geolocation error message
   * @param error
   */
  handleGeolocationError = async error => {
    // Log this response when the Geolocation has been retrieve
    await analytics().logEvent('onRequestGeolocationFailure', {
      deviceId: this.deviceId,
      timestamp: Date.now(),
      status: 'Unable to retrieve Geolocation',
    });
    this.setState({
      coords: {},
      errorMessage: error.message,
      homeStatus: 'Unable to call home',
    });
  };

  /**
   * This function checks for Geolocation permission on Android devices from API 21 and above and request it in case it
   * isn't already granted
   * @returns {Promise<void>}
   */
  async checkGeolocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'App needs permission to access your location',
          buttonNeutral: 'Ask me later',
          buttonNegative: 'Cancel',
          buttonPositive: 'Ok',
        },
      );
      if (granted) {
        this.getCurrentGeolocation();
      } else {
        this.handleGeolocationError({
          message: 'There was an error enabling location services',
        });
      }
    } catch (ex) {
      this.handleGeolocationError({
        message: 'Unable to obtain Geolocation permission',
      });
    }
  }

  /**
   * This function uses the Geolocation API to retrieve the coordinates of the Phone's current location
   * @returns An object containing the coords if successful or the error code and message if there was an error
   * If Location can't be accessed, return a string.
   */
  async getCurrentGeolocation() {
    const isLocationGranted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (isLocationGranted) {
      await Geolocation.getCurrentPosition(
        this.handleGeolocationSuccess,
        this.handleGeolocationError,
        {enableHighAccuracy: true, timeout: 1000, maximumAge: 100},
      );
    } else {
      this.handleGeolocationError({message: 'Missing location permissions'});
    }
  }

  async componentDidMount() {
    await this.checkGeolocationPermission();
    await this.getCurrentGeolocation();
    setInterval(() => this.getCurrentGeolocation(), 30000);
  }

  render() {
    return (
      <View style={styles.root}>
        <View style={styles.mapContainer}>
          {this.state.coords.latitude ? (
            <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              region={{
                latitude: this.state.coords.latitude,
                longitude: this.state.coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
              loadingEnabled={true}>
              <Marker
                coordinate={{
                  latitude: this.state.coords.latitude,
                  longitude: this.state.coords.longitude,
                }}
              />
            </MapView>
          ) : null}
        </View>
        <View style={styles.informationInvisibleContainer}>
          <ScrollView style={styles.informationContainer}>
            {this.state.errorMessage ? (
              <Text>Error Message: {this.state.errorMessage}</Text>
            ) : null}
            <Text>Home Status: {this.state.homeStatus}</Text>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  informationInvisibleContainer: {
    position: 'absolute',
    bottom: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  informationContainer: {
    backgroundColor: '#f5f4f2',
    borderRadius: 5,
    elevation: 10,
    padding: 20,
  },
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
