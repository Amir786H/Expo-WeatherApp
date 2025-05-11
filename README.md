# Project Title

WeatherApp is created using react native expo for both android and ios.It has following features:
1. Search city with weather data
2. 7 days weather forecast with temperature, country/city climate, custom images as per the weather condition
3. Data persistence(since data is not large I have used AsyncStorage)
4. Context Api for state management, which i have used for toggling the app theme.(You can click on the climate image for toggling, I have not added any toogle switch component)

## Installation

Instructions on how to get a copy of the project and running on your local machine.

Clone the project from GIT or else download the 
project dir.

### Prerequisites

_A guide on how to install the tools needed for running the project._

Explain the process step by step.

```bash
npm install 
npm install @react-navigation/native
npm install @react-navigation/native-stack
npm install axios

You have to install the NativeWind for the tailwindcss properties, please follow the NativeWind documentation for the setup

Run the command for running the app:

npx expo start

You can use Expo Go app on the Android or IOS physical device or you can run the app on the emulator/simulator

Note: You have to create your own api key on 'https://www.weatherapi.com/'
and insert it inside constants/index.js for the App to fetch the response

```

## Technologies

_Name the technologies used in the project._ 
* [Expo](https://docs.expo.dev/) - Framework Used.
* [React](https://reactjs.org/) - UI Library.
* [NativeWind](https://www.nativewind.dev/docs/getting-started/installation) - Custom Comp.
* [Heroicons](https://heroicons.com/) - Icons
* [Lodash](https://lodash.com/) - Debouncing





## Authors

- [@amir786h](https://www.github.com/amir786h)

