import React, { Component } from 'react'

import {
  Button,
  CameraRoll,
  Image,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'

export default class MediaPicker extends Component {
  state = { media: [] }

  constructor (props) {
    super(props)

    this.getMedia(props.assetType)
  }

  getMedia (assetType = 'All') {
    CameraRoll.getPhotos({
      first: 20,
      assetType
    })
      .then(r => {
        this.setState({ media: r.edges })
      })
      .catch((err) => {
        console.error(err)
      })
  }

  render () {
    return (
      <View style={styles.container}>
        <View>
          { this.state.media.map((item, index) => {
            return (
              <TouchableOpacity key={index} activeOpacity={0.5} onPress={() => this.props.onMediaSelect(item)}>
                <Image
                  style={{ width: 100, height: 100 }}
                  source={{ uri: item.node.image.uri }}
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
  }
})
