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
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {getUniqueId} from 'react-native-device-info';
import Geolocation from 'react-native-geolocation-service';
import analytics from '@react-native-firebase/analytics';
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
    await analytics().logEvent('onRequestGeolocation', {
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
      await analytics().logEvent('onReachHome', {
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
      await analytics().logEvent('onReachHome', {
        deviceId: this.deviceId,
        timestamp: Date.now(),
        duration: moment(onCallHomeTime).fromNow(),
        status: 'Unable to reached home',
      });
    }
  };

  /**
   * This method updates the state with the Geolocation error message
   * @param error
   */
  handleGeolocationError = error => {
    this.setState({
      coords: {},
      errorMessage: error.message,
      homeStatus: 'Unable to call home',
    });
  };

  /**
   * This method is used to explicitly turn on the Phones GPS
   * @private
   */
  _onPressButton = async () => {
    await this.checkGeolocationPermission();
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
    setInterval(() => this.getCurrentGeolocation(), 60000);
  }

  render() {
    return (
      <View style={styles.root}>
        <View>
          <View style={styles.coordinatesContainer}>
            <Text style={styles.coordinatesTextTitle}>Latitude</Text>
            <Text style={styles.coordinatesTextValue}>
              {this.state.coords.latitude}
            </Text>
          </View>
          <View style={styles.coordinatesContainer}>
            <Text style={styles.coordinatesTextTitle}>Longitude</Text>
            <Text style={styles.coordinatesTextValue}>
              {this.state.coords.longitude}
            </Text>
          </View>
          <ScrollView style={styles.informationContainer}>
            {this.state.errorMessage ? (
              <Text>Error Message: {this.state.errorMessage}</Text>
            ) : null}
            <Text>Speed: {this.state.coords.speed}</Text>
            <Text>Accuracy: {this.state.coords.accuracy}</Text>
            <Text>Altitude: {this.state.coords.altitude}</Text>
            <Text>
              Timestamp:{' '}
              {moment(this.state.coords.timestamp).format(
                'DD MMM YYYY hh:mm a',
              )}
            </Text>
            <Text>Home Status: {this.state.homeStatus}</Text>
          </ScrollView>
          {this.state.errorMessage ? (
            <TouchableOpacity
              style={styles.button}
              onPress={this._onPressButton}>
              <Text style={styles.buttonText}>Turn on GPS</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    padding: 10,
  },
  coordinatesContainer: {
    alignItems: 'center',
    backgroundColor: '#349beb',
    borderRadius: 5,
    elevation: 10,
    flexDirection: 'row',
    height: 70,
    justifyContent: 'space-between',
    margin: 8,
    padding: 20,
  },
  coordinatesTextTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  coordinatesTextValue: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  informationContainer: {
    backgroundColor: '#f5f4f2',
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    padding: 15,
  },
  button: {
    backgroundColor: '#349beb',
    borderRadius: 5,
    elevation: 10,
    height: 50,
    padding: 20,
    margin: 10,
    width: 150,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
