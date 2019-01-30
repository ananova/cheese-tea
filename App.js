import React, { Component } from 'react'
import {
  Button,
  Image,
  StyleSheet,
  View
} from 'react-native'
import ImagePicker from './ImagePicker'

export default class App extends Component {
  state = { image: null, displayPicker: false }

  _handleButtonPress = () => {
    this.setState({ displayPicker: true })
  }

  onImageSelect = (photo) => {
    this.setState({ image: photo.node.image, displayPicker: false })
  }

  onCancel = () => {
    this.setState({ displayPicker: false })
  }

  render () {
    return this.state.displayPicker ? (
      <ImagePicker
        onImageSelect={this.onImageSelect}
        onCancel={this.onCancel}
      />
    ) : (
      <View style={styles.container}>
        {
          this.state.image ? (
            <Image
              style={{ width: 100, height: 100 }}
              source={{ uri: this.state.image.uri }}
            />
          ) : null
        }

        <Button title='Select Image' onPress={this._handleButtonPress} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
})
