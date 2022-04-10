
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Modal,  Alert, Pressable, Image, StyleSheet, Text, View, TouchableOpacity, Button, ImageBackground, ScrollView, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Camera} from 'expo-camera';
import Logo from './assets/title-logo.png'; 
import Score from './assets/ecoScore.png';
import Cam from './assets/photo-camera-interface-symbol-for-button.png';
import Car from './assets/car.png';
import { RadioButton } from 'react-native-paper';

const Stack = createNativeStackNavigator();

state = {
	predictions: [],
};

const foodList = new Map([
  ["PORK",	4.621484423],
  ["CHICKEN", 3.262298031],
  ["EGGS", 2.526441574],
  ["BEEF", 23.80216746],
  ["MILK",	1.36935455],
  ["BUTTER", 12.66705193],
  ["YOGURT",1.538219779],
  ["CREAM", 6.469371749],
  ["HARD CHEESE", 12.56486777],
  ["DESSERT CHEESE", 8.363223794],
  ["CREME FRAICHE", 5.710089322],
  ["MILK POWDER", 11.7851491],
  ["SALMON", 6.065231518],
  ["COD", 7.29340867],
  ["ROE",	2.005864863],
  ["HERRING" ,	1.137124466],
  ["MACKEREL" , 1.035272146],
  ["SAITHE" , 4.900359303],
  ["NORTHERN PRAWN" , 14.44294447],
  ["ALASKA POLLOCK" , 3.376893088],
  ["RAINBOW TROUT" , 6.10321773],
  ["PANGASIUS"	, 13.86612846],
  ["EUROPEAN PLAICE" ,	23.28046736],
  ["HOKI" ,	7.148932597],
  ["WHEAT"	, 1.176855587],
  ["RYE" , 1.062139839],
  ["BARLEY" , 1.149947423],
  ["OATS" , 1.184860243],
  ["RICE" , 3.579564355],
  ["RAPESEED OIL" , 2.373003323],
  ["OLIVE OIL" , 4.044846694],
  ["SUGAR"	, 1.523165461],
  ["TOMATO" ,	1.493989349],
  ["CUCUMBER" , 0.734100042],
  ["BELL PEPPER", 2.333728229] ,
  ["ICEBERG LETTUCE", 0.322647658],
  ["POTATO" , 0.375638513],
  ["CARROT" , 0.298370864],
  ["ONION", 0.381612481],
  ["LEEK", 0.395561437],
  ["BROCCOLI", 0.627874827],
  ["WHITE CABBAGE" , 0.359012096],
  ["CAULIFLOWER" , 0.531403532],
  ["PEAS" , 0.617573225],
  ["BEANS" , 1.159890391],
  ["APPLE", 0.36967267],
  ["PEAR" , 0.399295468],
  ["MELON", 2.141240029],
  ["BANANA", 0.67261454],
  ["ORANGE", 0.728614353],
  ["LEMON"	, 0.45637194],
  ["AVOCADO" , 1.093448343],
  ["KIWIFRUIT" , 0.632535203],
  ["STRAWBERRY", 0.73858763],
  ["RASPBERRY", 0.759482],
  ["COCOA POWDER", 4.437154929],
  ["COCOA BUTTER",	8.786018448],
  ["COFFEE" , 6.406229764],
  ["PASTA"	, 1.76571932],
  ["BUNS" , 1.447764517],
  ["BISCUITS" , 1.104275024],
  ["PASTRY" , 1.409857661],
  ["RUSKS" , 1.433832349],
  ["WHEAT BREAD" , 1.02194756],
  ["WHEAT-RYE BREAD" , 1.043072702],
  ["CRISP BREAD" , 1.114347356],
  ["FOLLOW-UP FORMULA" , 3.658963493],
  ["MARGARINE", 2.417283753],
  ["LOW FAT MARGARINE", 1.272289192],
  ["COCOA DRINK POWDER" , 2.303386124],
  ["SODA" , 0.40582548],
  ["CIDER" , 0.477932217],
  ["BEER " , 0.461326355],
  ["MINERAL WATER"	, 0.277240578],
  ["JUICE"	, 1.239805883],
  ["ORANGE JUICE" , 1.687789075],
  ["APPLE JUICE" , 0.791822691],
  ["SQUASH DRINK" , 1.27361569],
  ["STRAWBERRY SQUASH DRINK" , 1.244180357],
  ["RASPBERRY SQUASH DRINK" , 1.303051023],
  ["CHOCOLATE"	, 6.856879104],
  ["POTATO CHIPS"	, 2.89291368],
  ["ICE CREAM"	, 4.281456556],
  ]);

let camera;

export default function App() {
	return(

		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Start" component={StartScreen} options={{title: '', headerStyle: { backgroundColor: 'rgba(118, 152, 113, 1)'}}}/>
				<Stack.Screen name="Home" component={HomeScreen}  options={{title: '', headerStyle: { backgroundColor: 'rgba(118, 152, 113, 1)'}}}/>
				<Stack.Screen name="Camera" component={CameraScreen} options={{title: '',  headerStyle: { backgroundColor: 'rgba(118, 152, 113, 1)'}}}/>
				<Stack.Screen name="Survey" component={SurveyScreen} options={{title: '',  headerStyle: { backgroundColor: 'rgba(118, 152, 113, 1)'}}} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const StartScreen = ({navigation}) => {
	return(
		<View style={styles.container}>
			<Image source={Logo} style={styles.Logo} /> 
			
			<TouchableOpacity style={styles.button1}
				onPress={() => navigation.navigate('Home')}>
				<Text style={styles.button1Text}>Start</Text>
			</TouchableOpacity>

			<TouchableOpacity style={styles.button4} onPress={() => navigation.navigate('Survey')}>		
				<Text style={styles.text}> Not what you scanned? </Text>				
			</TouchableOpacity>

		</View>
	);
}

const HomeScreen = ({navigation}) => {
	alert("hello");
	return(
		<View style={styles.container}>
			<Text style={styles.title1}> Welcome to EcoScanner! </Text>
			<Text style={styles.text7}> Estimate your food carbonfootprint with a simple scan! </Text>
			<TouchableOpacity style={styles.button2}
				onPress={() => navigation.navigate('Camera')}>
			<Image source={Cam} style={styles.Cam} /> 
				<Text style={styles.text9}>Proceed to Scanner!</Text>
				</TouchableOpacity>
		</View>
	);
}


const SurveyScreen = ({navigation}) => {
	
	const [value, setValue] = React.useState('');

	return(
		<View style={styles.container}>
			<Text>Survey moment:</Text>
			
			<ScrollView style={styles.container}>
			
			<Text>Survey moment:</Text>

			<Text>Which category does the item fall under?</Text>
			<RadioButton.Group onValueChange={value => setValue(value)} value={value}>
			<RadioButton.Item label="Fruits/Vegetables" value="first" />
			<RadioButton.Item label="Animal Products" value="second" />
			<RadioButton.Item label="Dairy Products" value="third" />
			</RadioButton.Group>

			<Text>Is the item grown or produced locally?</Text>
			<RadioButton.Group onValueChange={value => setValue(value)} value={value}>
			<RadioButton.Item label="Yes" value="local" />
			<RadioButton.Item label="No" value="nonlocal" />
			</RadioButton.Group>

			<Text>Is it red meat?</Text>
			<RadioButton.Group onValueChange={value => setValue(value)} value={value}>
			<RadioButton.Item label="Yes" value="redmeat" />
			<RadioButton.Item label="No" value="notredmeat" />
			</RadioButton.Group>

			<Text>Is it dairy free or plant-based?</Text>
			<RadioButton.Group onValueChange={value => setValue(value)} value={value}>
			<RadioButton.Item label="Yes" value="dairyfree" />
			<RadioButton.Item label="No" value="notdairyfree" />
			</RadioButton.Group>

			<Text>Does the product claim no artificial colours or flavours?</Text>
			<RadioButton.Group onValueChange={value => setValue(value)} value={value}>
			<RadioButton.Item label="Yes" value="noartificialcolours" />
			<RadioButton.Item label="No" value="hasartificialcolours" />
			</RadioButton.Group>
			
			
			<TouchableOpacity style={styles.button1}
				onPress={() => navigation.navigate('Home')}>
				<Text style={styles.button1Text}>Start</Text>
				</TouchableOpacity>
     		 </ScrollView>
			
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
						style={styles.button3}
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
						style={styles.button3}
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
 
 return (
    <View
      style={{
        backgroundColor: 'transparent',
        flex: 1,
        width: '100%',
        height: '100%',
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

					<View style={{flexDirection: 'row'}}>
					<TouchableOpacity style={styles.button33} 
					onPress={() => navigation.navigate('Home')}>
						<Text style={styles.text}> Retake </Text>
					</TouchableOpacity>
					
					<TouchableOpacity style={styles.button34}
					onPress={() => setShowResults(true)}>
					<Text style={styles.text}> Submit </Text>						
					</TouchableOpacity>
					</View>
					
					
				</>
			)}
    </View>
  )
}


let ecoValue = 0;
let ecoScore = '';
let mileage = 0;
let bgColor = '';

const ResultsScreen = ({navigation, photo}) => {

	const [modalVisible, setModalVisible] = useState(false);
	
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

	fetch("https://api.clarifai.com/v2/models/food-item-v1-recognition/versions/dfebc169854e429086aceb8368662641/outputs", requestOptions)
		.then(response => response.text())
		.then(r => {
			let result = JSON.parse(r, null, 2)
			console.log(result.outputs);
			const output = result.outputs[0];
			if (output && output.data && output.data.concepts) {
				let resultText= "";
				
				
				for (const concept of output.data.concepts) {
					
					resultText += concept.name;
					//resultText += " ";
					//resultText += concept.value;
					//resultText += "\n";
					//resultText = "apple juice";
					
					
					ecoValue = foodList.get(resultText.toUpperCase());
					if(ecoValue>0.0 && ecoValue<1.2){
						ecoScore = '5/5';
						bgColor = '#0dd650';
					} else if(ecoValue>1.2 && ecoValue<3.4){
						ecoScore = '4/5';
						bgColor = '#86d60d';
					} else if(ecoValue>3.4 && ecoValue<6.7){
						ecoScore = '3/5';
						bgColor = '#d6bf0d';
					} else if(ecoValue>6.7 && ecoValue<9){
						ecoScore = '2/5';
						bgColor = '#d67f0d';
					} else {
						ecoScore= '1/5';
						bgColor = '#d61e0d';
					}
					


					mileage = (2.5*ecoValue).toFixed(2);
					
					setPrediction(resultText);
					/*
					Results:
					Chocolate

					*/ 

					break;
				}

			} else {
				setPrediction("No predictions returned");
			}
		})
		.catch(err => console.log('error', err))

	return(
		<View style={styles.container}>
			<Text style={styles.title2}>Results:</Text>
			
			
			<View style={{backgroundColor: bgColor, borderRadius: 9, height: 500, width: 350, alignItems: 'center', marginTop:35}}>
			
			<Text style={{textTransform: 'capitalize', fontSize: 35, textAlign: 'center', marginTop:25, fontWeight: 'bold'}}>{prediction}</Text>
			<Text style={{fontSize: 25, textAlign: 'center', marginTop: 25, fontWeight: 'bold',}}>EcoScore:</Text>
			
			<ImageBackground source={Score} style={styles.Logo2}>
				<View style={styles.textView}>
				<Text style = {{fontSize: 60, textAlign: 'center',}}>{ecoScore}</Text>
				</View>
			</ImageBackground> 

			<Text style={{fontSize: 20, flexDirection:'row',  flexWrap:'wrap', marginTop: 20,}}>Equivalent to:</Text> 
			<Image source={Car} style={styles.carLogo} /> 
			<Text style={{fontSize: 20, textAlign: 'center', flexWrap:'wrap',  marginTop: 10,}}>{mileage} KMs</Text>			
			
			<Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
	    <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.text3}>Learn more about your EcoSore!</Text>
			<Text style={styles.text}></Text>
			<Text style={styles.text}></Text>
			<Text style={styles.text4}>What is your EcoScore?</Text>
			<Text style={styles.text}></Text>
			<Text style={styles.text5}>The EcoScore is a rating from 1 to 5 that determines how eco-friendly the food you are eating is. The score is determined based on carbon emissions from the manufacturing process.
			</Text>
			<Text style={styles.text}></Text>
			<Text style={styles.text4}>Looking to improve your score?</Text>
			<Text style={styles.text}></Text>
			<Text style={styles.text5}>Here are some tips on how to reduce your overall carbon footprint:</Text>
			<Text style={styles.text6}>- shop local (expand on this)</Text>
			<Text style={styles.text6}>- shop organic (expand on this)</Text>
			<Text style={styles.text6}>- avoid plastic packaging (expand on this)</Text>
			<Text style={styles.text}></Text>
			
			<Text style={styles.text4}>What is your mileage?</Text>
			<Text style={styles.text}></Text>
			<Text style={styles.text5}>The "equivalent to" feature compares the carbon emissions emitted in the manufacturing process 
			for your food of choice and displays it in carbon emissions per mile for a care, for comparison.
			</Text>
            <Pressable
              style={[styles.button5, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.text8}>Back</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable style={[styles.button5, styles.buttonOpen]} onPress={() => setModalVisible(true)}>
        <Text style={styles.text2}>Learn more about your EcoScore!</Text>
      </Pressable>		

			</View>
			
			<TouchableOpacity style={styles.button4} onPress={() => navigation.navigate('Survey')}>		
				<Text style={styles.text}> Not what you scanned? </Text>				
			</TouchableOpacity>
			
			

		</View>
		
	)
}



const styles = StyleSheet.create({
	res:{
		textAlign: 'center',
		fontSize: 30,
		flex: 1,
	},
	button: {
		flex: 1, 
		alignItems: 'center', 
		justifyContent: 'center'
	},
	textView: {
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
	
	button1:{
		backgroundColor: '#F8F8ED',
		marginTop: 30,
    	padding: 20,
		minWidth: 125,
    	borderRadius: 30,
		borderWidth:2,
      	borderColor:'#769871',
		alignItems: 'center', 
		justifyContent: 'center'
	},
	button2:{
		backgroundColor: 'rgba(118, 152, 113, 1)',
		marginTop: 30,
    	padding: 20,
		minWidth: 150,
    	borderRadius: 20,
		borderWidth:2,
      	borderColor:'#769871',
		alignItems: 'center', 
		justifyContent: 'center',
		shadowColor: '#000',
		shadowOffset: {
		  width: 0,
		  height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	button3:{
		backgroundColor: '#F8F8ED',
    	padding: 10,
		minWidth: 150,
    	borderRadius: 20,
		borderWidth:2,
      	borderColor:'#769871',
		flex: 0.1,
		alignSelf: 'flex-end',
		alignItems: 'center',
		marginLeft:17,
	},

	button33:{
		backgroundColor: '#F8F8ED',
    	padding: 10,
		minWidth: 150,
    	borderRadius: 20,
		borderWidth:2,
      	borderColor:'#769871',
		flex: 0.1,
		alignSelf: 'flex-end',
		alignItems: 'center',
		marginBottom:10,
		marginTop: 10,
		marginLeft:30,
	},

	button34:{
		backgroundColor: '#F8F8ED',
    	padding: 10,
		minWidth: 150,
    	borderRadius: 20,
		borderWidth:2,
      	borderColor:'#769871',
		flex: 0.1,
		alignSelf: 'flex-end',
		alignItems: 'center',
		marginBottom:10,
		marginTop: 10,
		marginLeft: 10,
	},
	
    
	button4:{
		backgroundColor: '#F8F8ED',
    	padding: 15,
		minWidth: 200,
    	borderRadius: 20,
		borderWidth:2,
      	borderColor:'#769871',
		alignSelf: 'flex-end',
		alignItems: 'center',
		marginTop: 20,
		marginRight: 80,
	},

	button5: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
	  },
	  buttonOpen: {
		backgroundColor: 'rgba(52, 52, 52, 0.0)'
	  },
	  buttonClose: {
		backgroundColor: 'rgba(52, 52, 52, 0.0)',
	  },

	Logo: {
		height: 300,
		width: 300,
		alignItems: 'center',
		marginTop: 70,
	},

	Logo2: {
		height: 150,
		width: 150,
		alignItems: 'center',
		marginTop: 10,
	},

	carLogo:{
		height: 50,
		width: 65,
		flexDirection:'row', 
		flexWrap:'wrap',
		marginTop: 10,
	},

	Cam: {
		height: 300,
		width: 300,
		alignItems: 'center',
	},
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: '#D5E7B8',
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
		color: '#769871',
	  },
	  text2: {
		fontSize: 18,
		color: 'black',
		textDecorationLine: 'underline',
		fontWeight: 'bold',
		marginTop: 20,
	  },

	  text3: {
		fontSize: 25,
		color: '#769871',
		fontWeight: 'bold',
		textAlign: 'center',
	  },
	  text4: {
		fontSize: 20,
		color: 'black',
		fontWeight: 'bold',
		textAlign: 'center',
	  },
	  text5: {
		fontSize: 14,
		color: 'black',
		textAlign: 'center',
	  },
	  text6: {
		fontSize: 14,
		color: 'black',
		alignSelf: 'flex-start',
		marginLeft: 20,
	  },

	  text7: {
		fontSize: 18,
		color: 'black',
		textAlign: 'center',
		marginTop:20,
	  },
	  text8: {
		fontSize: 24,
		color: '#769871',
		marginTop: 20,
	  },
	  text9: {
		fontSize: 18,
		color: 'black',
	  },
	  textModal:{
		fontSize: 18,
		color: '#769871',
		marginTop: 10,
		alignItems: 'center',
	  },
	  title:{
		fontSize: 45,
		color: 'white',
	  },
	  title1:{
		fontSize: 40, 
		fontWeight: 'bold',
		color: '#769871',
		textAlign: 'center', 
		marginTop:60
	  },
	  title2: {
		fontSize: 40, 
		fontWeight: 'bold',
		color: '#769871',
		textAlign: 'center', 
		marginTop:20
	},
	  subtitle:{
		fontSize: 18,
		color: 'white',
		marginTop: 20,
		textAlign: 'center',
	  },
	  button1Text: {
		fontSize: 20,
		color: '#769871',
	  },
	  

	  centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22,
	},

	modalView: {
		margin: 20,
		backgroundColor: '#F8F8ED',
		borderRadius: 20,
		padding: 35,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
		  width: 0,
		  height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	  },

});