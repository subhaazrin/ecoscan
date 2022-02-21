
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Camera} from 'expo-camera';

const Stack = createNativeStackNavigator();

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


const CameraScreen = ({navigation, route}) => {
	const id = route.params.id;
	const [type, setType] = useState(Camera.Constants.Type.back);
	//const [hasPermission, setHasPermission] = useState(null);
	
	const { status } = Camera.requestCameraPermissionsAsync();

	
	if (status === null) {
		return <View />;
	}
	
	if (status === false) {
		return <Text>No access to camera</Text>;
	}
	
	return (
		<View style={styles.camera}>
		<Camera style={styles.camera} type={type}>
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
			</View>
		</Camera>
		</View>
  	);
	
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