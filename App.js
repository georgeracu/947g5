/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, PermissionsAndroid} from 'react-native';

/**
 * This function checks for Geolocation permission on Android devices from API 21 and above and request it in case it
 * isn't already granted
 * @returns {Promise<void>}
 */
async function checkGeolocationPermission() {
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
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Location permission has been granted');
    } else {
      console.log('Location permission waS denied');
    }
  } catch (ex) {
    console.log(ex);
  }
}

class App extends Component {
  async componentDidMount() {
    // Check for Geolocation permission and request if not already granted
    await checkGeolocationPermission();
  }

  render() {
    return (
      <View style={styles.root}>
        <View style={styles.coordinatesContainer}>
          <Text style={styles.coordinatesTextTitle}>Longitude</Text>
          <Text style={styles.coordinatesTextValue}>20</Text>
        </View>

        <View style={styles.coordinatesContainer}>
          <Text style={styles.coordinatesTextTitle}>Latitude</Text>
          <Text style={styles.coordinatesTextValue}>40</Text>
        </View>

        <View style={styles.informationContainer}>
          <Text>This is a dummy text for the GPS function . . .</Text>
        </View>

        <View style={styles.button}>
          <Text style={styles.buttonText}>Turn on GPS</Text>
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
    height: 120,
    justifyContent: 'space-between',
    margin: 10,
    padding: 20,
  },
  coordinatesTextTitle: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: 'bold',
  },
  coordinatesTextValue: {
    color: '#FFFFFF',
    fontSize: 25,
  },
  informationContainer: {
    backgroundColor: '#f5f4f2',
    height: 120,
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 5,
    margin: 10,
    padding: 20,
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

export default App;
