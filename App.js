import React, {Component} from 'react';
import {Alert, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

class App extends Component {
  state = {
    location: null,
  };

  findCoordinates = () => {
    Geolocation.getCurrentPosition(
        position => {
          const location = JSON.stringify(position);

          this.setState({ location });
        },
        error => Alert.alert(error.message),
        {enableHighAccuracy: true, timeout: 1500, maximumAge: 10000},
    );
  };

  render() {
    return (
        <View style={styles.container}>
          <TouchableOpacity onPress={this.findCoordinates}>
            <Text style={styles.welcome}>Find My Coords?</Text>
            <Text>Location: {this.state.location}</Text>
          </TouchableOpacity>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

export default App;
