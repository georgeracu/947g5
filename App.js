import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {Marker, Heatmap, PROVIDER_GOOGLE} from 'react-native-maps';
import geolocation from './geolocation/geolocation';
import log from './utils/logs';
import constants from './utils/constants';
import DHM from './geolocation/DynamicHeatmap';

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

    this.region = {
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
  }

  /**
   * This method updates the state object with the response from the Geolocation API
   * @param geoCoords
   */
  onGeolocationSuccess = async geoCoords => {
    // Log this response when the Geolocation has been retrieved
    log.sendLog(
      constants.LOGS_ENDPOINT,
      'onRequestGeolocationSuccess',
      geoCoords.coords,
    );

    this.setState({
      coords: geoCoords.coords,
      heatMapsCoordinates: [],
    });

    /*geolocation.getHeatMapsCoordinates(
        constants.HEATMAPS_ENDPOINT,
        geoCoords.coords,
        newState => {
          this.setState(newState);
        },
    );*/

    await DHM.dynamicheatmap(
      geoCoords.coords.longitude,
      geoCoords.coords.latitude,
    );
  };

  async showMarkers(region) {
    let zoom = Math.round(Math.log(360 / region.longitudeDelta) / Math.LN2);
    await geolocation.getHeatMapsCoordinates2(
      constants.HEATMAPS_ENDPOINT,
      region.coords,
      zoom,
      newState => {
        this.setState(newState);
      },
    );
  }

  /**
   * This method updates the state with the Geolocation error message
   * @param error
   */
  onGeolocationError = async error => {
    // Log this response when the Geolocation has been retrieved in error
    log.sendLog(
      constants.LOGS_ENDPOINT,
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
                latitudeDelta: this.region.latitudeDelta,
                longitudeDelta: this.region.longitudeDelta,
              }}
              onRegionChangeComplete={region => {
                this.region = region;
                this.showMarkers(region);
              }}
              loadingEnabled={true}>
              <Marker
                coordinate={{
                  latitude: this.state.coords.latitude,
                  longitude: this.state.coords.longitude,
                }}
              />
              {this.state.heatMapsCoordinates.length > 0 ? (
                <Heatmap
                  points={this.state.heatMapsCoordinates}
                  opacity={1}
                  radius={20}
                />
              ) : null}
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
