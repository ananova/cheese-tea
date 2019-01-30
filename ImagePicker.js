import React, { Component } from 'react'

import {
  Button,
  CameraRoll,
  Image,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'

export default class ImagePicker extends Component {
  state = { photos: [] }

  constructor (props) {
    super(props)

    CameraRoll.getPhotos({
      first: 20,
      assetType: 'Photos'
    })
      .then(r => {
        this.setState({ photos: r.edges })
      })
      .catch((err) => {
        console.error(err)
      })
  }

  render () {
    return (
      <View style={styles.container}>
        <View>
          { this.state.photos.map((photo, index) => {
            return (
              <TouchableOpacity key={index} activeOpacity={0.5} onPress={() => this.props.onImageSelect(photo)}>
                <Image
                  style={{ width: 100, height: 100 }}
                  source={{ uri: photo.node.image.uri }}
                />
              </TouchableOpacity>
            )
          }) }
        </View>

        <Button title='Cancel' onPress={this.props.onCancel} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageGrid: {
    flex: 3,
    flexDirection: 'row'
  },
  image: {

  }
})
