// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button, Modal } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useState } from 'react';

import { CreateScreen, CreateScreen2 } from './components/create'
import ImportScreen from "./components/import";
import AccountScreen from "./components/account"


function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>Welcome</Text>
      </View>
      <View style={{ flex: 5 }}>
        <View style={styles.box}>

          <View style={{flex: 1, justifyContent: 'flex-end' }}>
            <Text style={styles.boxText}>創建錢包</Text>
          </View>
          <View style={{flex: 1, justifyContent: 'center', marginBottom: 10 }}>
            <Text style={styles.boxSubText}>Create a new Wallet</Text>
          </View>
          <View style={{flex: 1, justifyContent: 'flex-start'}}>
            <Button
              onPress={() => navigation.navigate('Create')}
              title="好，我們開始吧！"
            />
          </View>

        </View>
        <View style={styles.box}>
          <Text style={styles.boxText}>我已經有註記詞</Text>
          <Text style={styles.boxSubText}>Import your Secret Recovery Phrase</Text>
          <Button
            onPress={() => navigation.navigate('Import')}
            title="匯入錢包"
          />
        </View>
      </View>
    </View>
  );
}

const RootStack = createStackNavigator();
const CreateStack = createStackNavigator();

const CreateStackScreen = () => (
  <CreateStack.Navigator screenOptions={{ title: "創建錢包" }}>
    {/* headerShown: false, ...createStackNavigator.ModalPresentationIOS */}
    <CreateStack.Screen name='Create1' component={CreateScreen} options={{ headerBackTitle: "" }}/>
    <CreateStack.Screen name="Create2" component={CreateScreen2} options={{ headerBackTitle: "" }}/>
  </CreateStack.Navigator>
)

export default function App() {
  const [login, setLongin] = useState(false)

  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen name="Home" component={HomeScreen} options={{ title: " " }} />
        <RootStack.Screen name="Create" component={CreateStackScreen} options={{ headerShown: false, presentation: 'modal', }} />
        <RootStack.Screen name="Import" component={ImportScreen} options={{ title: "匯入錢包", headerBackTitle: "" }}/>
        <RootStack.Screen name="Account" component={AccountScreen} options={{ title: "我的錢包", headerBackTitle: "" }}/>
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: { 
    flex: 1, 
    justifyContent: 'flex-end', 
  },
  titleText: { 
    color: "#000", 
    fontSize: 34, 
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

