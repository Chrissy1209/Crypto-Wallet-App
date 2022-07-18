// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button, Modal } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useState } from 'react';

import { CreateScreen, CreateScreen2, CreateScreen3 } from './components/create'
import ImportScreen from "./components/import";
import AccountScreen from "./components/account"


function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', }}>
      <View style={{ flex: 1, justifyContent: 'flex-end', }}>
        <Text style={{ color: "#000", fontSize: 34, fontWeight: '500' }}>Welcome</Text>
      </View>
      <View style={{ flex: 5, flexDirection: "column", alignItems: 'center', }}>
        <View style={{ padding: 10, alignItems:'center', justifyContent: 'center', marginTop: 28, height: 185, width: 280, borderWidth: 1, borderColor: "darkgray", borderRadius: 8 }}>
          <Text style={{ fontSize: 19, fontWeight: '500', color: "#636363" }}>好，我們開始吧！</Text>
          <Text style={{ paddingVertical: 13, fontSize: 16, textAlign:'center', color: "#828282" }}>Create new Secret Recovery Phrase</Text>
          <Button
            // color={"#6A5ACD"}
            onPress={() => navigation.navigate('Create')}
            title="創建錢包"
          />
        </View>
        <View style={{ padding: 10, alignItems:'center', justifyContent: 'center', marginTop: 28, height: 185, width: 280, borderWidth: 1, borderColor: "darkgray", borderRadius: 8 }}>
          <Text style={{ fontSize: 19, fontWeight: '500', color: "#636363" }}>我已經有註記詞</Text>
          <Text style={{ paddingVertical: 13, fontSize: 16, textAlign:'center', color: "#828282" }}>Import your Secret Recovery Phrase</Text>
          <Button
            // color={"#6A5ACD"}
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
    <CreateStack.Screen name="Create3" component={CreateScreen3} options={{ headerBackTitle: "" }}/>
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
        <RootStack.Screen name="Account" component={AccountScreen} options={{ title: " ", headerBackTitle: "" }}/>
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    // justifyContent: 'center',
    alignItems: 'center',
  },
});
