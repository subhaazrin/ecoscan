
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Button, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Camera} from 'expo-camera';

/*
//import {firestore} from 'firebase/firestore';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyDrl5xlUBDq1Hf15cIcTk1lsS1_7BSMjog",
	authDomain: "ecolove-e9a1e.firebaseapp.com",
	projectId: "ecolove-e9a1e",
	storageBucket: "ecolove-e9a1e.appspot.com",
	messagingSenderId: "347006923426",
	appId: "1:347006923426:web:554903fc57ff0dbeb21dfb",
	measurementId: "G-226FT6THYL"
};
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  app.firestore(); */


const Stack = createNativeStackNavigator();

state = {
	predictions: [],
	//foodList: [],
    //selectedIndex: 0
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

const CameraScreen = ({navigation, route}) => {
	const [type, setType] = useState(Camera.Constants.Type.back);
	const [previewVisible, setPreviewVisible] = useState(false)
	const [capturedImage, setCapturedImage] = useState(null)

	const { status } = Camera.requestCameraPermissionsAsync();

	objectDetection = async () => {
		
		// I added the base64 flag for takePictureAsync to return the bytes of the
		// image in base64 format: https://docs.expo.dev/versions/latest/sdk/camera/#takepictureasync
		
		const photo = await camera.takePictureAsync({ base64: true })
		setPreviewVisible(true)
		setCapturedImage(photo)
		return photo.uri;
	}

	if (status === null) {
		return <View />;
	}

	if (status === false) {
		return <Text>No access to camera</Text>;
	}

	return (
		<View style={styles.camera}>
			{previewVisible && capturedImage ? (
				<CameraPreview photo={capturedImage} navigation={navigation} />
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

const CameraPreview = ({photo, navigation }) => {
	const [showResults, setShowResults] = useState(false);
	
	/*
	const DataAPI = async () => {
		try {
		  let data = await fetch(
			"https://sheets.googleapis.com/v4/spreadsheets/1mYuIJeGecelt2Dal0n-YBViEhyCxB72xgv-AZDM6qSo/values/sheet1?valueRenderOption=FORMATTED_VALUE&key=AIzaSyAF7CF6yH4cqG51GS4pjzcMoDAaWH7LZRo"
		  );
		  let { values } = await data.json();
		  let [, ...Data] = values.map((data) => data);
		  return Data;
		} catch {
		  console.log("Error");
		}
	  };
	  //export default DataAPI;
	  const [value, setValue] = useState();
	  useEffect(() => {
		let data = async () => {
		  setValue(await FetchData());
		};
		data();
	  }, []);
	  if (!value) {
		return (
		  <ActivityIndicator
			size="large"
			animating={true}
			color="rgba(137,232,207,100)"
		  />
		);
	  }*/
 
 return (
    <View
      style={{
        backgroundColor: 'transparent',
        flex: 1,
        width: '100%',
        height: '100%'
      }}
    >
			{showResults ? (
				<ResultsScreen photo={photo} />
			) : (
				<>
					<ImageBackground
						source={{uri: photo && photo.uri}}
						style={{
							flex: 1
						}}
					/>
					<Button style={styles.button}
						title="Go to results"
						onPress={() => setShowResults(true) && this.DataAPI}
					/>
				</>
			)}
    </View>
  )
}

const ResultsScreen = ({photo}) => {
	
	/*
	getFoods = async (foodsRetreived) =>{

		var foodList = [];
	  
		var snapshot = await firebase.firestore()
		  .collection('foodList')
		  //.orderBy('createdAt')
		  .get()
	  
		snapshot.forEach((doc) => {
		  const foodItem = doc.data();
		  foodItem.id = doc.id;
		  foodList.push(foodItem);
		});
	  
		foodsRetreived(foodList);

	  }
	  onFoodsReceived = (foodList) => {

		this.setState(prevState => ({
		foodList: prevState.foodList = foodList
		}));
  	
	}*/

	const [prediction, setPrediction] = useState("Waiting for results...")

	const raw = JSON.stringify({
		"user_app_id": {
			"user_id": "r3k3q4ukhcbp", // @todo Fill in your user_id
			"app_id": "027943ba177f491b9a51b5652a547d8a", // @todo Fill in your app_id
		},
		//"model_id": "food-item-v1-recognition",
		//"version-id": "dfebc169854e429086aceb8368662641",
		"inputs": [{
			"data": {
				"image": {
					"base64": photo.base64,
				},
			},
		}],
	});

	const requestOptions = {
		method: "POST",
		headers: {
			"Accept": "application/json",
			"Authorization": "Key c5c1b443f2ed41248f644a7dbeeb71a4", // @todo Fill in your API key
		},
		body: raw,
	};


	fetch("https://api.clarifai.com/v2/models/aaa03c23b3724a16a56b629203edc62c/versions/aa9ca48295b37401f8af92ad1af0d91d/outputs", requestOptions)
		//"https://api.clarifai.com/v2/models/food-item-v1-recognition/versions/dfebc169854e429086aceb8368662641/outputs", requestOptions)
		.then(response => response.text())
		.then(r => {
			let result = JSON.parse(r, null, 2)
			console.log(result.outputs);
			const output = result.outputs[0];
			if (output && output.data && output.data.concepts) {
				let resultText = "Predicted concepts:\n";
				for (const concept of output.data.concepts) {
					//resultText += concept.name;
					//resultText += " ";
					//resultText += concept.value;
					//resultText += "\n";
					resultText = "apple juice";
					setPrediction(resultText);
					break;
				}

			} else {
				setPrediction("No predictions returned");
			}
		})
		.catch(err => console.log('error', err))

	return(
		<View style={styles.container}>
			<Text> Results:</Text>
			<Text>{prediction}</Text>
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
