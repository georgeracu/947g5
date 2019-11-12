/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {PermissionsAndroid, StyleSheet, View} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import Geolocation from 'react-native-geolocation-service';
import analytics from '@react-native-firebase/analytics';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import moment from 'moment';
import ms from 'milliseconds';
import NotificationPopup from 'react-native-push-notification-popup';
export default class App extends Component {
  constructor(props) {
    super(props);

    /**
     * This state object holds the response from the Geolocation API
     * @type {{timeStamp: string, altitude: number, latitude: number, errorMessage: string, accuracy: number, speed: number, longitude: number}}
     */
    this.state = {
      coords: {},
    };

    this.COORDS_ENDPOINT =
      'https://us-central1-test-947g5.cloudfunctions.net/coords';
    this.CONFIGS = 'https://us-central1-test-947g5.cloudfunctions.net/configs';
    this.deviceId = DeviceInfo.getUniqueId();
  }

  /**
   * Get geolocation configurations
   * @returns {Promise<void>}
   */
  getGeolocationConfigFrequency = async () => {
    let result = await fetch(this.CONFIGS + '/geoConfig');
    let resultJson = await result.json();
    const DEFAULT_FREQUENCY = 30000;
    const geolocationFrequency = resultJson.geolocationFrequency;
    const geolocationFrequencyType = resultJson.geolocationFrequencyType;
    return geolocationFrequencyType[0] === 'seconds'
      ? ms.seconds(geolocationFrequency)
      : geolocationFrequencyType[1] === 'minutes'
      ? ms.minutes(geolocationFrequency)
      : geolocationFrequencyType[2] === 'hours'
      ? ms.hours(geolocationFrequency)
      : DEFAULT_FREQUENCY;
  };

  logEvent = (event, timestamp, status) => {
    analytics().logEvent(event, {
      deviceId: this.deviceId,
      timestamp: timestamp,
      status: status,
    });
  };

  /**
   * This method updates the state object with the response from the Geolocation API
   * @param response
   */
  handleGeolocationSuccess = async response => {
    // Log this response when the Geolocation has been retrieved
    await this.logEvent(
      'onRequestGeolocationSuccess',
      Date.now(),
      'Geolocation was retrieved successfully',
    );

    this.setState({
      coords: response.coords,
    });

    // Display notification when we start Calling home
    this.popup.show({
      title: 'Home Status',
      body: 'Calling home . . .',
      slideOutTime: 5000,
    });

    // Log this response when we attempt to call home
    const onCallHomeTime = Date.now();
    await this.logEvent('onCallHome', onCallHomeTime, 'Calling');

    let result = await fetch(this.COORDS_ENDPOINT + '/create', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        timestamp: Date.now(),
        deviceId: this.deviceId,
        coords: response.coords,
      }),
    });
    let resultJson = await result.json();
    if (resultJson.code > 0) {
      // Display notification when wew successfully reach home
      this.popup.show({
        title: 'Home Status',
        body: 'Successfully reached home . . .',
        slideOutTime: 5000,
      });
      // Log this response when we successfully reach home
      await analytics().logEvent('onReachHomeSuccess', {
        deviceId: this.deviceId,
        timestamp: Date.now(),
        duration: moment(onCallHomeTime).fromNow(),
        status: 'Successfully reached home',
      });
    } else {
      // Display notification when we are unable to reach home
      this.popup.show({
        title: 'Home Status',
        body: 'Unable to reach home',
        slideOutTime: 5000,
      });
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
    // Log this response when the Geolocation has been retrieved
    await this.logEvent(
      'onRequestGeolocationFailure',
      Date.now(),
      'Unable to retrieve Geolocation',
    );

    // Display notification when unable to get current location home
    this.popup.show({
      title: 'Geolocation Status',
      body: 'Unable to detect location . . . re-trying location',
      slideOutTime: 5000,
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
    let geolocationFrequency = await this.getGeolocationConfigFrequency();
    setInterval(() => this.getCurrentGeolocation(), geolocationFrequency);
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
        <NotificationPopup ref={ref => (this.popup = ref)} />
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
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
