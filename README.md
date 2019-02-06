# cheese-tea
A vanilla React Native app to upload videos.

There is a WIP write-up [here](https://github.com/ananova/notes/blob/master/react-native/react-native-upload-video.md).

When it is more polished, I will add more instructions here!

## Development
```
cp .env.example .env
# Start Rails server and Metro bundler
bundle exec foreman start --procfile Procfile.dev
# Build mobile app and run in iOS simulator
cd mobile_app && yarn run ios
```
