/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  Button,
  CameraRoll,
  Image,
  ImagePickerIOS,
  StyleSheet,
  Text,
  View
} from 'react-native';

type Props = {};
export default class App extends Component<Props> {
  state = { photos: [], image: null }
  
  _handleButtonPress = () => {
    CameraRoll.getPhotos({
      first: 20,
      assetType: 'Photos',
    })
    .then(r => {
      this.setState({ photos: r.edges });
    })
    .catch((err) => {
        //Error Loading Images
    });
  };

  pickImage = () => {
    // openSelectDialog(config, successCallback, errorCallback);
    ImagePickerIOS.openSelectDialog(
      {},
      (imageUri) => { this.setState({ image: imageUri }); },
      (error)    => { console.error(error); }
    );
  };

  render() {
    return (
      <View style={styles.container}>
        { this.state.image ? <Image style={{height: 100, width: 100}} source={{uri: this.state.image}} /> : null }
        {/* { this.state.image ? <Text>{this.state.image}</Text> : null } */}
        <Button title="Load Images with ImagePickerIOS" onPress={this.pickImage} />
        <Button title="Load Images with CameraRoll" onPress={this._handleButtonPress} />
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
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
