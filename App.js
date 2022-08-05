// import { StatusBar } from 'expo-status-bar';
import React, { useCallback } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';

import { CreateScreen, CreateScreen2 } from './components/create'
import ImportScreen from './components/import'
import HomeScreen from './components/home'

const RenderRegister = React.memo(({ navigation }) => {
  const handleNext = useCallback((goto) => {
    navigation.navigate(goto)
  }, [navigation])

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>第一次拜訪 CWallet ?</Text>
      </View>
      <View style={styles.flex}>
        <View style={styles.box}>
          <Text style={styles.boxText}>我是新用戶，創建錢包</Text>
          <Text style={styles.boxSubText}>Create a new Wallet</Text>
          <Button
            onPress={() => handleNext('Create')}
            title="好，我們開始吧！"
          />
        </View>
        <View style={styles.box}>
          <Text style={styles.boxText}>不，我已經有註記詞</Text>
          <Text style={styles.boxSubText}>Import your Secret Recovery Phrase</Text>
          <Button
            onPress={() => handleNext('Import')}
            title="匯入錢包"
          />
        </View>
      </View>
    </View>
  )
})
const renderCloseIcon = () => (
  <View style={styles.closeIcon}>
    <MaterialIcons name="close" size={24} color="#007AFF" />
  </View>
)

//-------------

const RootStack = createStackNavigator();
const CreateStack = createStackNavigator();
const Register = createStackNavigator();
const ImportStack = createStackNavigator();

const RegisterStackScreen = React.memo(() => (
  <Register.Navigator screenOptions={{ title: ' ' }}>
    <Register.Screen name="RegisterScreen" component={RenderRegister} options={{ headerTransparent: false, headerBackTitle: ' ', headerBackImage: () => renderCloseIcon() }} />
  </Register.Navigator>
))
const CreateStackScreen = React.memo(() => (
  <CreateStack.Navigator screenOptions={{ title: '創建錢包' }}>
    {/* headerShown: false, ...createStackNavigator.ModalPresentationIOS */}
    <CreateStack.Screen name="Create1" component={CreateScreen} options={{ headerBackTitle: ' ', headerBackImage: () => renderCloseIcon() }} />
    <CreateStack.Screen name="Create2" component={CreateScreen2} options={{ headerBackTitle: '' }} />
  </CreateStack.Navigator>
))
const ImportStackScreen = React.memo(() => (
  <ImportStack.Navigator screenOptions={{ title: '匯入錢包' }}>
    <ImportStack.Screen name="ImportScreen" component={ImportScreen} options={{ headerBackTitle: ' ', headerBackImage: () => renderCloseIcon() }} />
  </ImportStack.Navigator>
))

export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen name="Home" component={HomeScreen} options={{ title: '我的錢包', headerBackTitle: '' }} />
        <RootStack.Screen name="Register" component={RegisterStackScreen} options={{ headerShown: false, presentation: 'modal' }} />
        <RootStack.Screen name="Create" component={CreateStackScreen} options={{ headerShown: false, presentation: 'modal' }} />
        <RootStack.Screen name="Import" component={ImportStackScreen} options={{ headerShown: false, presentation: 'modal' }} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  flex: {
    flex: 5,
  },
  title: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  titleText: {
    color: '#000',
    fontSize: 25,
    fontWeight: '500',
  },
  box: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 28,
    height: 185,
    width: 280,
    borderWidth: 1,
    borderColor: 'darkgray',
    borderRadius: 8,
  },
  boxText: {
    fontSize: 19,
    fontWeight: '500',
    color: '#636363',
  },
  boxSubText: {
    paddingVertical: 13,
    fontSize: 16,
    textAlign: 'center',
    color: '#828282',
  },
  closeIcon: {
    paddingLeft: 10,
  },
});
