import { StyleSheet, View, Button, Text } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import 'react-native-get-random-values'
import '@ethersproject/shims'
import { ethers } from 'ethers'
import Account from './account'

const Welcome = React.memo(({ navigation }) => {
  const handleNext = useCallback(() => {
    navigation.navigate('Register')
  }, [navigation])
  console.log('Welcome')

  return (
    <View style={styles.subCoiner}>
      <Text style={styles.fontSize}>歡迎來到 Chrissy Wallet.</Text>
      <Button title="開始使用" onPress={handleNext} />
    </View>
  )
})

export default function Home({ navigation, route }) {
  const [page, setPage] = useState('')
  const [balance, setBalance] = useState(0)
  const [address, setAddress] = useState('')
  const [mnemonic, setMnemonic] = useState('')
  const [sendTx, setSendTx] = useState(false)
  console.log('Home')
  //---------------

  useEffect(() => {
    if (route.params === undefined) setPage('welcome')
    else {
      setAddress(route.params.addr)
      setMnemonic(route.params.mnem)
      setPage('account')

      const getBalance = async () => {
        try {
          const provider = new ethers.providers.JsonRpcProvider('https://rinkeby.infura.io/v3/ab0bba1edd7c44b28fdf159193f938f2');
          const b = await provider.getBalance(route.params.addr) // fetch the balance
          const x = ethers.utils.formatEther(b)
          if (x < 1) setBalance(x.slice(0, 9))
          else setBalance(x)
          console.log('done')
        } catch (err) {
          console.log(err)
        }
      }
      getBalance()
    }
  }, [route, sendTx])

  return (
    <View style={styles.container}>
      { page === 'welcome' && <Welcome navigation={navigation} /> }
      { page === 'account' && <Account address={address} balance={balance} mnemonic={mnemonic} setSendTx={setSendTx} /> }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  subCoiner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fontSize: {
    fontSize: 19,
  },
});
