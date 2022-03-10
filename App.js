
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Button, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Camera} from 'expo-camera';

const Stack = createNativeStackNavigator();

state = {
	predictions: [],
};

let camera;

export default function App() {
	return(
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Start" component={StartScreen}/>
				<Stack.Screen name="Home" component={HomeScreen}/>
      			<Stack.Screen name="Scanner" component={EcoScannerScreen}/>
				<Stack.Screen name="Camera" component={CameraScreen}/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const StartScreen = ({navigation}) => {
	return(
		<View style={styles.container}>
			<Text> Welcome to EcoLove!</Text>
			<Button style={styles.button}
				title="Start"
				onPress={() => navigation.navigate('Home')}
			/>
		</View>
	);
}

const HomeScreen = ({navigation}) => {
	return(
		<View style={styles.container}>
			<Text> Welcome Back!</Text>
			<Button style={styles.button}
				title="Proceed to EcoScanner!"
				onPress={() => navigation.navigate('Scanner')}
			/>
		</View>
	);
}

const EcoScannerScreen = ({navigation}) => {
	return(
		<View style={styles.container}>
			<Text> Scanner Time!</Text>
			<Button style={styles.button}
				title="Proceed to Camera!"
				//onPress={__startCamera}
				onPress={() => navigation.navigate('Camera', {id: 23, name: 'SubhaMairah' })}
			/>
		</View>
	);
}

resize = async photo => {
	let manipulatedImage = await ImageManipulator.manipulateAsync(
		photo,
		[{ resize: { height: 300, width: 300 } }],
		{ base64: true }
	);
	return manipulatedImage.base64;
}

predict = async image => {

	let predictions = await clarifai.models.predict(
	//predicts general MODE NOT FOOD
	clarifai.GENERAL.MODEL, // model need to get prediction from
	image
	);
	return predictions;
};


const CameraScreen = ({navigation, route}) => {
	// const id = route.params.id;
	const [type, setType] = useState(Camera.Constants.Type.back);
	const [previewVisible, setPreviewVisible] = useState(false)
	const [capturedImage, setCapturedImage] = useState(null)
	//const [hasPermission, setHasPermission] = useState(null);

	const { status } = Camera.requestCameraPermissionsAsync();
 /*
	const __takePicture = async () => {
	 const photo = await camera.takePictureAsync()
	 console.log(photo)
	 setPreviewVisible(true)
	 // //setStartCamera(false)
	 setCapturedImage(photo)
	 return photo.uri;
 }*/

 objectDetection = async () => {

	const photo = await camera.takePictureAsync()
	console.log(photo)
	 setPreviewVisible(true)
	 // //setStartCamera(false)
	 setCapturedImage(photo)
	// let resized = await this.resize(photo);
	// let predictions = await this.predict(resized);
	// this.setState({ predictions: predictions.outputs[0].data.concepts });
	// console.log(this.state.predictions);
	return photo.uri;
	//return predictions;

}

 	// const Clarifai = require('clarifai');
	//
	// const app  = new Clarifai.App({
  //   apiKey: 'c5c1b443f2ed41248f644a7dbeeb71a4'
	// })

	// process.nextTick = setImmediate;



	if (status === null) {
		return <View />;
	}

	if (status === false) {
		return <Text>No access to camera</Text>;
	}

	return (
		<View style={styles.camera}>
		{previewVisible && capturedImage ? (
			<CameraPreview photo={capturedImage} />
		) : (
			<Camera style={styles.camera} type={type} ref={(r) => { camera = r }}>
				<View style={styles.buttonContainer}>
				<TouchableOpacity
					style={styles.button}
					onPress={() => {
					setType(
						type === Camera.Constants.Type.back
						? Camera.Constants.Type.front
						: Camera.Constants.Type.back
					);
					}}>
					<Text style={styles.text}> Flip </Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.button}
					onPress={this.objectDetection}>
					<Text style={styles.text}> Take Photo </Text>
				</TouchableOpacity>
				</View>
			</Camera>
		)}
		</View>
  	);

}


const CameraPreview = ({photo }) => {

  console.log('sdsfds', photo)

  //alert(predictions);
  //var predict  = predictions

  return (
    <View
      style={{
        backgroundColor: 'transparent',
        flex: 1,
        width: '100%',
        height: '100%'
      }}
    >
      <ImageBackground
        source={{uri: photo && photo.uri}}
        style={{
          flex: 1
        }}
      />
    </View>


  )
}

const ResultsScreen = ({navigation, photo}) => {

	// objectDetection = async () => {
	//
	// 	let resized = await this.resize(photo);
	// 	let predictions = await this.predict(resized);
	// 	this.setState({ predictions: predictions.outputs[0].data.concepts });
	// 	console.log(this.state.predictions);
	//
	// 	//return predictions;
	//
	// }

	return(
		<View style={styles.container}>
			<Text> Results:</Text>
			<Text>Hello world</Text>
		</View>
	)
}



const styles = StyleSheet.create({
	button: {flex: 1, alignItems: 'center', justifyContent: 'center'},
	container: {
		flex: 1,
		alignItems: 'center',
		margin: 120,
	  },
	  camera: {
		flex: 1,
	  },
	  buttonContainer: {
		flex: 1,
		backgroundColor: 'transparent',
		flexDirection: 'row',
		margin: 20,
	  },
	  button: {
		flex: 0.1,
		alignSelf: 'flex-end',
		alignItems: 'center',
	  },
	  text: {
		fontSize: 18,
		color: 'white',
	  },
});
