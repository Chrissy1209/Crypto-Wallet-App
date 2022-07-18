import { createStackNavigator } from "react-navigation-stack";
import {createAppContainer} from "react-navigation";
import Login from "../components/login"
import MyAccount from "../components/account"

const screens = {
    " ": {
        screen: Login
    },
    Account: {
        screen: MyAccount
    },
}

const rootStack = createStackNavigator(screens)

export default createAppContainer(rootStack)