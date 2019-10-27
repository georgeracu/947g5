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
import Geolocation from 'react-native-geolocation-service';
import moment from 'moment';
import firestore from '@react-native-firebase/firestore';

export default class App extends Component {
  constructor(props) {
    super(props);

    /**
     * This state object holds the response from the Geolocation API
     * @type {{timeStamp: string, altitude: number, latitude: number, errorMessage: string, accuracy: number, speed: number, longitude: number}}
     */
    this.state = {
      latitude: 0,
      longitude: 0,
      errorMessage: 'No location data',
      speed: 0,
      accuracy: 0,
      altitude: 0,
      timestamp: '',
    };
  }

  /**
   * This method updates the state object with the response from the Geolocation API
   * @param response
   */
  handleGeolocationSuccess = async response => {
    this.setState({
      latitude: response.coords.latitude,
      longitude: response.coords.longitude,
      errorMessage: '',
      speed: response.coords.speed,
      accuracy: response.coords.accuracy,
      altitude: response.coords.altitude,
      timestamp: response.timestamp,
    });

    // //  Send Geolocation details to firebase firestore
    await firestore()
      .collection('coordinates')
      .add({
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        timestamp: Date.now(),
      })
      .then(function(docRef) {
        console.log('Document written with ID: ', docRef.id);
      })
      .catch(function(error) {
        console.error('Error adding document: ', error);
      });
  };

  /**
   * This method updates the state with the Geolocation error message
   * @param error
   */
  handleGeolocationError = error => {
    this.setState({
      latitude: 0,
      longitude: 0,
      errorMessage: error.message,
      speed: 0,
      accuracy: 0,
      altitude: 0,
      timestamp: Date.now(),
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
      console.error(ex);
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

  componentDidMount() {
    this.checkGeolocationPermission();
    this.getCurrentGeolocation();
    setInterval(() => this.getCurrentGeolocation(), 1000);
  }

  render() {
    return (
      <View style={styles.root}>
        <View>
          <View style={styles.coordinatesContainer}>
            <Text style={styles.coordinatesTextTitle}>Latitude</Text>
            <Text style={styles.coordinatesTextValue}>
              {this.state.latitude}
            </Text>
          </View>
          <View style={styles.coordinatesContainer}>
            <Text style={styles.coordinatesTextTitle}>Longitude</Text>
            <Text style={styles.coordinatesTextValue}>
              {this.state.longitude}
            </Text>
          </View>
          <ScrollView style={styles.informationContainer}>
            {this.state.errorMessage ? (
              <Text>Error Message: {this.state.errorMessage}</Text>
            ) : null}
            <Text>Speed: {this.state.speed}</Text>
            <Text>Accuracy: {this.state.accuracy}</Text>
            <Text>Altitude: {this.state.altitude}</Text>
            <Text>
              Timestamp:{' '}
              {moment(this.state.timestamp).format('DD MMM YYYY hh:mm a')}
            </Text>
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
