import React from "react";
import { View, Text } from "react-native";
import MenuImage from "../../components/MenuImage";

const HomeScreen = ({ navigation }) => {
    return (
        <View>
            <Text>From home</Text>
        </View>
    );
};

HomeScreen["navigationOptions"] = ({ navigation }) => ({
    title: "Home",
    headerLeft: () => (
        <MenuImage
            onPress={() => {
                navigation.openDrawer();
            }}
        />
    ),
});

export default HomeScreen;
