import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createStackNavigator } from "react-navigation-stack";

// screens
import DrawerContainer from "../screens/DrawerScreen";
import HomeScreen from "../screens/HomeScreen";
import JobsScreen from "../screens/JobsScreen";
import JobScreen from "../screens/JobScreen";

const MainNavigator = createStackNavigator(
    {
        Home: HomeScreen,
        Jobs: JobsScreen,
        Job: JobScreen,
    },
    {
        initialRouteName: "Home",
        // headerMode: 'float',
        defaulfNavigationOptions: ({ navigation }) => ({
            headerTitleStyle: {
                fontWeight: "bold",
                textAlign: "center",
                alignSelf: "center",
                flex: 1,
            },
        }),
    }
);

const DrawerStack = createDrawerNavigator(
    {
        Main: MainNavigator,
    },
    {
        drawerPosition: "left",
        initialRouteName: "Main",
        drawerWidth: 250,
        contentComponent: DrawerContainer,
    }
);

export default AppContainer = createAppContainer(DrawerStack);

console.disableYellowBox = true;
