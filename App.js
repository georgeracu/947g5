import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {Marker, Heatmap, PROVIDER_GOOGLE} from 'react-native-maps';
import geolocation from './geolocation/geolocation';
import util from './utils/util';

export default class App extends Component {
  constructor(props) {
    super(props);

    /**
     * This state object holds the response from the Geolocation API
     * @type {{timeStamp: string, altitude: number, latitude: number, errorMessage: string, accuracy: number, speed: number, longitude: number}}
     */
    this.state = {
      coords: {},
      heatMapsCoordinates: [],
    };
    this.LOGS_ENDPOINT =
      'https://us-central1-test-947g5.cloudfunctions.net/logs/log';
    this.HEATMAPS_COORDINATES_ENDPOINT =
      'https://us-central1-test-947g5.cloudfunctions.net/heatMapsCoordinates/heatmaps-coordinates';
  }

  /**
   * This method updates the state object with the response from the Geolocation API
   * @param geoCoords
   */
  onGeolocationSuccess = async geoCoords => {
    console.log('1');
    // Log this response when the Geolocation has been retrieved
    util.sendLog(
      this.LOGS_ENDPOINT,
      'onRequestGeolocationSuccess',
      geoCoords.coords,
    );

    geolocation.getHeatMapsCoordinates(
      this.HEATMAPS_COORDINATES_ENDPOINT,
      geoCoords,
      newState => {
        this.setState(newState);
      },
    );
  };

  /**
   * This method updates the state with the Geolocation error message
   * @param error
   */
  onGeolocationError = async error => {
    // Log this response when the Geolocation has been retrieved in error
    util.sendLog(
      this.LOGS_ENDPOINT,
      'onRequestGeolocationFailure',
      error.message,
    );
  };

  async componentDidMount(): void {
    geolocation.getGeolocationServices(
      this.onGeolocationSuccess,
      this.onGeolocationError,
    );
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
              <Heatmap
                points={this.state.heatMapsCoordinates}
                opacity={1}
                radius={20}
              />
            </MapView>
          ) : null}
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
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
