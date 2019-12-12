import React, {Component} from 'react';
import {
  View,
  Text,
  ListView,
  StyleSheet,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';
import MapView, {Marker, Heatmap, PROVIDER_GOOGLE} from 'react-native-maps';
import geolocation from './geolocation/geolocation';
import log from './utils/logs';
import constants from './utils/constants';

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
      loading: true,
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

    this.heatMapWrapper(geoCoords.coords);
  };

  heatMapWrapper = async coordinates => {
    this.setState({loading: true});
    await geolocation.getHeatMapsCoordinates(
      constants.HEATMAPS_ENDPOINT,
      coordinates,
      newState => {
        this.setState(newState);
        console.log('loading: ' + this.state.loading);
      },
    );
  };

  showLoading() {
    return (
      this.state.loading && (
        <View pointerEvents={'none'} style={styles.loading}>
          <ActivityIndicator />
        </View>
      )
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
    await geolocation.getGeolocationServices(
      this.onGeolocationSuccess,
      this.onGeolocationError,
    );
  }

  render() {
    return (
      <View
        style={styles.root}
        pointerEvents={this.state.loading ? 'none' : 'auto'}>
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
              onRegionChangeComplete={region => (this.region = region)}
              loadingEnabled={true}
              onPress={e => this.heatMapWrapper(e.nativeEvent.coordinate)}>
              <Marker
                coordinate={{
                  latitude: this.state.coords.latitude,
                  longitude: this.state.coords.longitude,
                }}>
                <View style={styles.radius}>
                  <View style={styles.marker} />
                </View>
              </Marker>
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
        {this.showLoading()}
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
  radius: {
    height: 30,
    width: 30,
    borderRadius: 30 / 2,
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0, 112, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  marker: {
    height: 20,
    width: 20,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 20 / 2,
    overflow: 'hidden',
    backgroundColor: '#007AFF',
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
