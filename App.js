// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';

import { CreateScreen, CreateScreen2 } from './components/create'
import ImportScreen from "./components/import"
import HomeScreen from "./components/home"


const RegisterScreen = React.memo(({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>第一次拜訪 CWallet ?</Text>
      </View>
      <View style={{ flex: 5 }}>
        <View style={styles.box}>
          <Text style={styles.boxText}>我是新用戶，創建錢包</Text>
          <Text style={styles.boxSubText}>Create a new Wallet</Text>
          <Button
            onPress={() => navigation.navigate('Create')}
            title="好，我們開始吧！"
          />
        </View>
        <View style={styles.box}>
          <Text style={styles.boxText}>不，我已經有註記詞</Text>
          <Text style={styles.boxSubText}>Import your Secret Recovery Phrase</Text>
          <Button
            onPress={() => navigation.navigate('Import')}
            title="匯入錢包"
          />
        </View>
      </View>
    </View>
  );
})
const renderIcon = () => (
  <View style={{paddingLeft: 10}}>
    <MaterialIcons name="close" size={24} color="#007AFF" />
  </View>
)

//-------------

const RootStack = createStackNavigator();
const CreateStack = createStackNavigator();
const Register = createStackNavigator();
const ImportStack = createStackNavigator();

const RegisterStackScreen = React.memo(() => (
  <Register.Navigator screenOptions={{ title: " " }}>
    <Register.Screen name='RegisterScreen' component={RegisterScreen} options={{ headerTransparent: false, headerBackTitle: " ", headerBackImage:()=>renderIcon() }}/> 
  </Register.Navigator>
))
const CreateStackScreen = React.memo(() => (
  <CreateStack.Navigator screenOptions={{ title: "創建錢包" }}>
    {/* headerShown: false, ...createStackNavigator.ModalPresentationIOS */}
    <CreateStack.Screen name='Create1' component={CreateScreen} options={{ headerBackTitle: " ", headerBackImage:()=>renderIcon() }}/>
    <CreateStack.Screen name="Create2" component={CreateScreen2} options={{ headerBackTitle: "" }}/>
  </CreateStack.Navigator>
))
const ImportStackScreen = React.memo(() => (
  <ImportStack.Navigator screenOptions={{ title: "匯入錢包" }}>
    <ImportStack.Screen name='ImportScreen' component={ImportScreen} options={{ headerBackTitle: " ",  headerBackImage:()=>renderIcon()}}/>
  </ImportStack.Navigator>
))

export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen name="Home" component={HomeScreen} options={{ title: "我的錢包", headerBackTitle: "" }}/>
        <RootStack.Screen name="Register" component={RegisterStackScreen} options={{ headerShown: false, presentation: 'modal', }} />
        <RootStack.Screen name="Create" component={CreateStackScreen} options={{ headerShown: false, presentation: 'modal', }} />
        <RootStack.Screen name="Import" component={ImportStackScreen} options={{ headerShown: false, presentation: 'modal', }}/>
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: { 
    flex: 1, 
    justifyContent: 'flex-end', 
  },
  titleText: { 
    color: "#000", 
    fontSize: 25, 
    fontWeight: '500' 
  },
  box: { 
    padding: 10, 
    alignItems:'center', 
    justifyContent: 'center', 
    marginTop: 28, 
    height: 185, 
    width: 280, 
    borderWidth: 1, 
    borderColor: "darkgray", 
    borderRadius: 8 
  },
  boxText: { 
    fontSize: 19, 
    fontWeight: '500', 
    color: "#636363" 
  },
  boxSubText: { 
    paddingVertical: 13, 
    fontSize: 16, 
    textAlign:'center', 
    color: "#828282" 
  },
});