
# react-native-react-native-baifu-pos

## Getting started

`$ npm install react-native-react-native-baifu-pos --save`

### Mostly automatic installation

`$ react-native link react-native-react-native-baifu-pos`

### Manual installation


#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.reactlibrary.RNReactNativeBaifuPosPackage;` to the imports at the top of the file
  - Add `new RNReactNativeBaifuPosPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-react-native-baifu-pos'
  	project(':react-native-react-native-baifu-pos').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-react-native-baifu-pos/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-react-native-baifu-pos')
  	```


## Usage
```javascript
import RNReactNativeBaifuPos from 'react-native-react-native-baifu-pos';

// TODO: What to do with the module?
RNReactNativeBaifuPos;
```
  