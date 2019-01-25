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
  ImagePickerIOS,
  StyleSheet,
  View
} from 'react-native';

type Props = {};
export default class App extends Component<Props> {
  state = { photos: [] }
  
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
    ImagePickerIOS.openSelectDialog({}, imageUri => {
      this.setState({ image: imageUri });
    }, error => console.error(error));
  }

  render() {
    return (
      <View style={styles.container}>
        <Button title="Load Images with ImagePickerIOS" onPress={this.pickImage} />
        <Button title="Load Images with CameraRoll" onPress={this.pickImage} />
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
