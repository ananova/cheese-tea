import React, { Component } from 'react'
import {
  Button,
  Image,
  StyleSheet,
  View
} from 'react-native'
import MediaPicker from './MediaPicker'

export default class App extends Component {
  state = { media: null, displayPicker: false }

  _handleSelectButtonPress = () => {
    this.setState({ displayPicker: true })
  }

  _handleUploadButtonPress = () => {
    const { media } = this.state
    const formData = new FormData()

    formData.append('video', {
      name: media.filename,
      uri: media.uri,
      type: 'video/mp4'
    })

    const options = {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    }

    fetch('http://localhost:5000/api/upload.json', options)
      .then(response => console.log(response))
      .catch(error => console.error(error))
  }

  onMediaSelect = (item) => {
    this.setState({ media: item.node.image, displayPicker: false })
  }

  onCancel = () => {
    this.setState({ displayPicker: false })
  }

  render () {
    return this.state.displayPicker ? (
      <MediaPicker
        onMediaSelect={this.onMediaSelect}
        onCancel={this.onCancel}
        assetType='Videos'
      />
    ) : (
      <View style={styles.container}>
        {
          this.state.media ? (
            <Image
              style={{ width: 100, height: 100 }}
              source={{ uri: this.state.media.uri }}
            />
          ) : null
        }

        <Button title='Select Video' onPress={this._handleSelectButtonPress} />
        {this.state.media ? (
          <Button title='Upload Video' onPress={this._handleUploadButtonPress} />
        ) : null}
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
