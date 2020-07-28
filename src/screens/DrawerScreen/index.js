import React from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";
import MenuButton from "../../components/MenuButton";

export default class DrawerContainer extends React.Component {
    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.content}>
                <View style={styles.container}>
                    <MenuButton
                        title="Home"
                        source={require("../../../assets/icons/home.png")}
                        onPress={() => {
                            navigation.navigate("Home");
                            navigation.closeDrawer();
                        }}
                    />
                </View>
            </View>
        );
    }
}

DrawerContainer.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
    }),
};
