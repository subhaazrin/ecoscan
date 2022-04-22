
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Modal, Linking, Platform, LayoutAnimation, Alert, Pressable, Image, StyleSheet, Text, View, TouchableOpacity, Button, ImageBackground, ScrollView, SafeAreaView, Switch, UIManager } from 'react-native';
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


const CONTENT = [
	{
	  isExpanded: false,
	  category_name: 'Consumption of Meats',
	  subcategory: [
		{ id: 1, val: '\n\nSome people eat meat. Some do not. It is a personal decision. Rather than focusing on the question of: to meat or not to meat, think about reducing your FoodPrint by eating less meat, and paying attention to where it comes from, and how it is produced.\n\nHere are some ideas to improve your Meat Consumption FoodPrint:\n\nTips to Try:\n\n- Try "Meatless Mondays" in your home.\n- Cut your serving size of meat in half.' },
		{ id: 2, val: '\nResorces For You:\n\nEating Sustainable Meat\nThe FoodPrint of Beef: A FoodPrint Report\n\n' },

	  ],
	},
	{
	  isExpanded: false,
	  category_name: 'Local and Seasonal Sourcing',
	  subcategory: [
		{ id: 4, val: '\n\nWhen you buy locally sourced food, you support local farmers and local economies. Seasonal food is also often cheaper than out-of-season food, and it tastes way better.' },
		{ id: 5, val: '\nHere are some ideas to improve your Local & Seasonal Sourcing FoodPrint:' },
		{ id: 6, val: '\nTips to Try:' },
		{ id: 7, val: '\n- Shop seasonal and local foods in your region.\n- Visit the Real Food Encyclopedia.'},
		{ id: 8, val: '\nResources For You:' },
		{ id: 9, val: '\nSeasonal Food Guide\nShopping Sustainably\n\n'},

	  ],
	},
	{
	  isExpanded: false,
	  category_name: 'Food Literacy',
	  subcategory: [
		{ id: 11, val: '\n\nKnowledge is power when it comes to almost anything, especially food sustainability. The more you know about the food you eat – from the labels on the package to the practices used to produce it – the easier it is to make smart decisions that can improve your health and the planet.' },
		{ id: 12, val: '\nHere are some ideas to improve your Local & Seasonal Sourcing FoodPrint:' },
		{ id: 13, val: '\nTips to Try:' },
		{ id: 14, val: '\n- Learn what Food Labels really mean.\n- Visit the Real Food Encyclopedia.' },
		{ id: 15, val: '\nResources For You:' },
		{ id: 16, val: '\nShopping Sustainably\nReal Food Encyclopedia\n\n' },
	  ],
	},
	{
	  isExpanded: false,
	  category_name: 'Food Waste',
	  subcategory: [
		{ id: 17, val: '\n\nMore than 40% of food is thrown out every year in the US. When you waste food, you waste all the resources it took to produce that food (think: water, time, labor) plus your own hard-earned money!' },
		{ id: 18, val: '\nTips to Try:'},
		{ id: 19, val: '\n- Make a grocery list before you go shopping so you are not buying things you will not use.'},
		{ id: 20, val: '- Compost or reuse food scraps.'},
		{ id: 21, val: '\nResources For You:' },
		{ id: 22, val: '\nCooking Sustainably\nCompost 101' },
	  ],
	},
	{
	  isExpanded: false,
	  category_name: 'Animale Welfare',
	  subcategory: [
		{ id: 11, val: '\n\nFactory farms, or concentrated animal feeding operations (CAFOs), inhumanely force animals to endure cramped, unhealthy conditions. They also have a negative impact on the environment, communities, farm workers and public health.' },
		{ id: 12, val: '\nHere are some ideas to improve your Animal Welfare FoodPrint:' },
		{ id: 13, val: '\nTips to Try:' },
		{ id: 14, val: '\n- Look for Animal Welfare Approved labels on products at the shelf.\n- Find a local butcher that reliably sources humanely slaughtered meats.' },
		{ id: 15, val: '\nResources For You:' },
		{ id: 16, val: '\nFood Label Guide\nFarm Animal Welfare\n\n' },
	  ],
	},
  ];

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

const ExpandableComponent = ({ item, onClickFunction }) => {
	//Custom Component for the Expandable List
	const [layoutHeight, setLayoutHeight] = useState(0);

	useEffect(() => {
	  if (item.isExpanded) {
		setLayoutHeight(null);
	  } else {
		setLayoutHeight(0);
	  }
	}, [item.isExpanded]);

	return (
	  <View>
		{/*Header of the Expandable List Item*/}
		<TouchableOpacity
		  activeOpacity={0.8}
		  onPress={onClickFunction}
		  style={styles.header}>
		  <Text style={styles.text10}>{item.category_name+ "       +"}</Text>
		</TouchableOpacity>
		<View
		  style={{
			height: layoutHeight,
			overflow: 'hidden',
		  }}>
		  {/*Content under the header of the Expandable List Item*/}
		  {item.subcategory.map((item, key) => (
			<TouchableOpacity
			  key={key}
			  style={styles.content}
			  onPress={() => alert('Id: ' + item.id + ' val: ' + item.val)}>
			  <Text style={styles.text5}>
				{item.val}
			  </Text>
			  <View style={styles.separator} />
			</TouchableOpacity>
		  ))}
		</View>
	  </View>
	);
  };

export default function App() {
	return(

		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Start" component={StartScreen} options={{title: '', headerStyle: { backgroundColor: 'rgba(118, 152, 113, 1)'}}}/>
				<Stack.Screen name="Home" component={HomeScreen}  options={{title: '', headerStyle: { backgroundColor: 'rgba(118, 152, 113, 1)'}}}/>
				<Stack.Screen name="Camera" component={CameraScreen} options={{title: '',  headerStyle: { backgroundColor: 'rgba(118, 152, 113, 1)'}}}/>
				<Stack.Screen name="Survey" component={SurveyScreen} options={{title: '',  headerStyle: { backgroundColor: 'rgba(118, 152, 113, 1)'}}} />
				<Stack.Screen name="Tips" component={TipsScreen} options={{title: '',  headerStyle: { backgroundColor: 'rgba(118, 152, 113, 1)'}}} />
				<Stack.Screen name="Results" component={SurveyResultScreen} options={{title: '',  headerStyle: { backgroundColor: 'rgba(118, 152, 113, 1)'}}} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const StartScreen = ({navigation}) => {
	return(
		<View style={styles.container}>
			<Image source={Logo} style={styles.Logo} />

			<TouchableOpacity style={styles.button12}
				onPress={() => navigation.navigate('Home')}>
				<Text style={styles.button1Text}>Start</Text>
			</TouchableOpacity>

		</View>
	);
}

const HomeScreen = ({navigation}) => {
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

let ecoSurv = 0;
const SurveyScreen = ({navigation}) => {

	const [value, setValue] = React.useState('');
	const [value2, setValue2] = React.useState('');
	const [value3, setValue3] = React.useState('');
	const [value4, setValue4] = React.useState('');
	const [value5, setValue5] = React.useState('');


	alert(value + ":" + value2 + ":" + value3 + ":" + value4 + ":" + value5);

	let ecoScoreSurvey = 0;

	if(value=="veg"){
		ecoScoreSurvey+=2;

	}else if(value=="dairy"){
		ecoScoreSurvey+=1;
	}
	if(value2=="local"){
		ecoScoreSurvey+=1;
	}
	if(value3=="notredmeat"){
		ecoScoreSurvey+=1;
	}
	if(value4=="dairyfree"){
		ecoScoreSurvey+=1;
	}
	if(value5=="noartificial"){
		ecoScoreSurvey+=1;
	}

	ecoSurv = ecoScoreSurvey;

	return(
		<View style={styles.container}>
			<Text style={styles.title2}>EcoScan Survey:</Text>

			<Text style ={{fontSize: 18, marginLeft: 15, textAlign: 'center', marginTop: 10, marginBottom:25}}>Take a short survey to test how eco-friendly your food is!</Text>

			<ScrollView style={styles.container}>

			<Text style ={{fontSize: 16, marginLeft: 15, marginTop: 25, fontWeight: 'bold', marginBottom: 25,}}>Which category does the item fall under?</Text>
			<RadioButton.Group onValueChange={value => setValue(value)} value={value} radioBackground="red">
			<RadioButton.Item style ={{fontSize: 12, backgroundColor: '#F8F8ED', borderRadius: 30, maxWidth: 350,  alignContent: 'center', alignSelf: 'center'}} label="Fruits/Vegetables" value="veg" />
			<RadioButton.Item style ={{fontSize: 12, backgroundColor: '#F8F8ED', borderRadius: 30,  maxWidth: 350, marginTop:10,  alignContent: 'center', alignSelf: 'center'}}label="Animal Products" value="animal" />
			<RadioButton.Item style ={{fontSize: 12, backgroundColor: '#F8F8ED', borderRadius: 30,  maxWidth: 350, marginTop:10,  alignContent: 'center', alignSelf: 'center'}}label="Dairy Products" value="dairy" />
			</RadioButton.Group>

			<Text style ={{fontSize: 16, marginLeft: 15, marginTop: 25, fontWeight: 'bold', marginBottom: 25,}}>Is the item grown or produced locally?</Text>
			<RadioButton.Group onValueChange={value2 => setValue2(value2)} value={value2}>
			<RadioButton.Item style ={{fontSize: 12, backgroundColor: '#F8F8ED', borderRadius: 30,  maxWidth: 350,  alignContent: 'center', alignSelf: 'center'}} label="Yes" value="local" />
			<RadioButton.Item style ={{fontSize: 12, backgroundColor: '#F8F8ED', borderRadius: 30,  maxWidth: 350,  alignContent: 'center', alignSelf: 'center', marginTop:10}} label="No" value="nonlocal" />
			</RadioButton.Group>

			<Text style ={{fontSize: 16, marginLeft: 15, marginTop: 25, fontWeight: 'bold',marginBottom: 25,}}>Is it red meat?</Text>
			<RadioButton.Group onValueChange={value3 => setValue3(value3)} value={value3}>
			<RadioButton.Item style ={{fontSize: 12, backgroundColor: '#F8F8ED', borderRadius: 30,  maxWidth: 350,  alignContent: 'center', alignSelf: 'center'}} label="Yes" value="redmeat" />
			<RadioButton.Item style ={{fontSize: 12, backgroundColor: '#F8F8ED', borderRadius: 30,  maxWidth: 350, alignContent: 'center', alignSelf: 'center', marginTop:10}} label="No" value="notredmeat" />
			</RadioButton.Group>

			<Text style ={{fontSize: 16, marginLeft: 15, marginTop: 25, fontWeight: 'bold', marginBottom: 25,}}>Is it dairy free or plant-based?</Text>
			<RadioButton.Group onValueChange={value4 => setValue4(value4)} value={value4}>
			<RadioButton.Item style ={{fontSize: 12, backgroundColor: '#F8F8ED', borderRadius: 30,  maxWidth: 350, alignContent: 'center', alignSelf: 'center'}} label="Yes" value="dairyfree" />
			<RadioButton.Item style ={{fontSize: 12, backgroundColor: '#F8F8ED', borderRadius: 30,  maxWidth: 350, alignContent: 'center', alignSelf: 'center', marginTop:10}} label="No" value="notdairyfree" />
			</RadioButton.Group>

			<Text style ={{fontSize: 16, marginLeft: 15, marginTop: 25, fontWeight: 'bold', marginBottom: 25,}}>Does the product claim no artificial colours or flavours?</Text>
			<RadioButton.Group onValueChange={value5 => setValue5(value5)} value={value5}>
			<RadioButton.Item style ={{fontSize: 12, backgroundColor: '#F8F8ED', borderRadius: 30,  maxWidth: 350, alignContent: 'center', alignSelf: 'center'}} label="Yes" value="noartificial" />
			<RadioButton.Item style ={{fontSize: 12, backgroundColor: '#F8F8ED', borderRadius: 30,  maxWidth: 350, alignContent: 'center', alignSelf: 'center', marginTop:10}}label="No" value="hasartificial" />
			</RadioButton.Group>

			{/*<Text>{ecoScoreSurvey}/6</Text>*/}

			<TouchableOpacity style={styles.button11}
				onPress={() => navigation.navigate('Results')}>
				<Text style={styles.button1Text}>Submit</Text>
				</TouchableOpacity>
     		 </ScrollView>

		</View>
	);
}

let ecoScore1 = 'N/A';
let bgColor1 = '#F8F8ED';
let tiptext1 = "Sorry, image not recognized :( ";

const SurveyResultScreen = (navigation) => {

	const [modalVisible, setModalVisible] = useState(false);

	if(ecoSurv == 6){
		ecoScore1 = '6/6';
		bgColor1 = '#0dd650';
		tiptext1 = "Amazing! Greta Thunberg aspires to be like you!";
	}else if (ecoSurv == 5){
		ecoScore1 = '5/6';
		bgColor1 = '#0dd650';
		tiptext1 = "Wow. You're on a mission to save the earth, aren't you?";
	} else if (ecoSurv == 4){
		ecoScore1 = '4/6';
		bgColor1 = '#86d60d';
		tiptext1 = "Looking good. Keep it up!";
	} else if (ecoSurv == 3){
		ecoScore1 = '3/6';
		bgColor1 = '#d6bf0d';
		tiptext1 = "Not bad. You're making some good choices.";
	} else if (ecoSurv == 2){
		ecoScore1 = '2/6';
		bgColor1 = '#d67f0d';
		tiptext1 = "Meh. Could be worse.";
	} else {
		ecoScore1 = '1/6';
		bgColor1 = '#d61e0d';
		tiptext1 = "OK, we've got some work to do, but I believe in you!";
	}

	return(
		<View style={styles.container}>

			<Text style={styles.title2}>Results:</Text>

			<View style={{backgroundColor: bgColor1, borderRadius: 9, height:450, width: 350, alignItems: 'center', marginTop:55}}>

			<Text style={{fontSize: 35, textAlign: 'center', marginTop: 45, fontWeight: 'bold',}}>EcoScore:</Text>

			<ImageBackground source={Score} style={styles.Logo2}>
				<View style={styles.textView}>
				<Text style = {{fontSize: 60, textAlign: 'center',}}>{ecoScore1}</Text>
				</View>
			</ImageBackground>

			<Text style={{fontSize: 20, marginTop: 30, textAlign: 'center',}}>{tiptext1}</Text>
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
			<Text style={styles.text6}>- shop local</Text>
			<Text style={styles.text6}>- shop organic</Text>
			<Text style={styles.text6}>- avoid plastic packaging</Text>
			<Text style={styles.text}></Text>

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

			<TouchableOpacity style={styles.button1}
				onPress={() => navigation.navigate('Start')}>
				<Text style={styles.button1Text}>Back to Home</Text>
			</TouchableOpacity>

		</View>
	);
};

const TipsScreen = ({navigation}) => {
	const [listDataSource, setListDataSource] = useState(CONTENT);
  const [multiSelect, setMultiSelect] = useState(false);

   const updateLayout = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array = [...listDataSource];
    if (multiSelect) {
      // If multiple select is enabled
      array[index]['isExpanded'] = !array[index]['isExpanded'];
    } else {
      // If single select is enabled
      array.map((value, placeindex) =>
        placeindex === index
          ? (array[placeindex]['isExpanded'] = !array[placeindex]['isExpanded'])
          : (array[placeindex]['isExpanded'] = false)
      );
    }
    setListDataSource(array);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', padding: 10 }}>
          <Text style={styles.title1}>Learn More about your FoodPrint!</Text>
		  <Text style={styles.text7}>Expand each tab below to read more.</Text>
          <TouchableOpacity onPress={() => setMultiSelect(!multiSelect)}>
            <Text
              style={{
                textAlign: 'center',
                justifyContent: 'center',
              }}>
              {multiSelect
                ? 'Enable Single \n Expand'
                : 'Enalble Multiple \n Expand'}
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          {listDataSource.map((item, key) => (
            <ExpandableComponent
              key={item.category_name}
              onClickFunction={() => {
                updateLayout(key);
              }}
              item={item}
            />
          ))}
        </ScrollView>
		<TouchableOpacity style={styles.button1}
				onPress={() => navigation.navigate('Start')}>
				<Text style={styles.button1Text}>Back to Home</Text>
			</TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};


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
				<ResultsScreen navigation={navigation} photo={photo} />
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
let ecoScore = 'N/A';
let mileage = 0;
let bgColor = '#F8F8ED';
let tiptext = "Sorry, image not recognized :( ";

const ResultsScreen = ({navigation, photo}) => {

	const [modalVisible, setModalVisible] = useState(false);

	const [prediction, setPrediction] = useState("Waiting for results...")

	const raw = JSON.stringify({
		"user_app_id": {
			"user_id": "uyu5y2gkceoq", // @todo Fill in your user_id
			"app_id": "cb1d8dbf5f184f1e90661ab46d918a9d", // @todo Fill in your app_id
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
			"Authorization": "Key fb0ccc059c1e4f668b5d8bfd679c892f", // @todo Fill in your API key
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
						tiptext = "Wow. You're on a mission to save the earth, aren't you?";
					} else if(ecoValue>1.2 && ecoValue<3.4){
						ecoScore = '4/5';
						bgColor = '#86d60d';
						tiptext = "Looking good. Keep it up!";
					} else if(ecoValue>3.4 && ecoValue<6.7){
						ecoScore = '3/5';
						bgColor = '#d6bf0d';
						tiptext = "Not bad. You're making some good choices.";
					} else if(ecoValue>6.7 && ecoValue<9){
						ecoScore = '2/5';
						bgColor = '#d67f0d';
						tiptext = "Meh. Could be worse.";
					} else {
						ecoScore= '1/5';
						bgColor = '#d61e0d';
						tiptext = "OK, we've got some work to do, but I believe in you!";
					}

					mileage = (2.5*ecoValue).toFixed(2);
					ecoValue = ecoValue.toFixed(2);

					setPrediction(resultText);
					/*
					Results:
					Chocolate

					*/

					break;
				}

			} else {
				setPrediction("No predictions");
			}
		})
		.catch(err => console.log('error', err))

	return(
		<View style={styles.container}>
			<Text style={styles.title2}>Results:</Text>


			<View style={{backgroundColor: bgColor, borderRadius: 9, height: 525, width: 350, alignItems: 'center', marginTop:15}}>

			<Text style={{textTransform: 'capitalize', fontSize: 35, textAlign: 'center', marginTop:15, fontWeight: 'bold'}}>{prediction}</Text>
			<Text style={{fontSize: 25, textAlign: 'center', marginTop: 10, fontWeight: 'bold',}}>EcoScore:</Text>

			<ImageBackground source={Score} style={styles.Logo2}>
				<View style={styles.textView}>
				<Text style = {{fontSize: 60, textAlign: 'center',}}>{ecoScore}</Text>
				</View>
			</ImageBackground>

			<Text style={{fontSize: 20, marginTop: 10, textAlign: 'center',}}>{tiptext}</Text>
			<Text style={{fontSize: 20, marginTop: 10, textAlign: 'center', fontWeight: 'bold'}}>Emissions in kg CO2eq:</Text>
			<Text style={{fontSize: 20, marginTop: 5, textAlign: 'center', }}>{ecoValue}</Text>
			<Text style={{fontSize: 20, flexDirection:'row',  flexWrap:'wrap', marginTop: 10, fontWeight: 'bold'}}>Equivalent to:</Text>
			<Text style={{fontSize: 20, textAlign: 'center', flexWrap:'wrap',  marginTop: 5,}}>{mileage} KMs</Text>
			<Image source={Car} style={styles.carLogo} />
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
			<Text style={styles.text6}>- shop local </Text>
			<Text style={styles.text6}>- shop organic </Text>
			<Text style={styles.text6}>- avoid plastic packaging </Text>
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

			<TouchableOpacity style={styles.button44} onPress={() => navigation.navigate('Survey')}>
				<Text style={styles.text}>Not what you scanned?</Text>
			</TouchableOpacity>

			<TouchableOpacity style={styles.button44} onPress={() => navigation.navigate('Tips')}>
				<Text style={styles.text}>Learn more about your FoodPrint</Text>
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
    	padding: 10,
		minWidth: 125,
    	borderRadius: 30,
		borderWidth:2,
      	borderColor:'#769871',
		alignItems: 'center',
		justifyContent: 'center'
	},

	button12:{
		backgroundColor: '#F8F8ED',
		marginTop: 90,
    	padding: 10,
		minWidth: 125,
    	borderRadius: 30,
		borderWidth:2,
      	borderColor:'#769871',
		alignItems: 'center',
		justifyContent: 'center'
	},
	
	button11:{
		backgroundColor: '#F8F8ED',
		marginTop: 30,
    	padding: 10,
		maxWidth: 90,
    	borderRadius: 30,
		borderWidth:2,
      	borderColor:'#769871',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 30,
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

	button44:{
		backgroundColor: '#F8F8ED',
    	padding: 8,
		minWidth: 200,
    	borderRadius: 20,
		borderWidth:2,
      	borderColor:'#769871',
		alignSelf: 'center',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 20,
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
		height: 25,
		width: 32,
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
		marginTop: 5,

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
	  text10: {
		fontSize: 20,
		color: 'black',
		fontWeight: 'bold',
		textAlign: 'left',
		marginLeft:10,
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
