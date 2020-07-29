import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        width: width - 100,
        // height: "50%",
    },
    button: {
        width: "100%",
    },
    icon: {
        width: 5,
        height: 5,
    },
    upload: {
        height: 30,
        marginBottom: 5,
    },
    error: {
        color: "red",
    },
    fileName: {
        fontWeight: "bold",
        marginLeft: 10,
        marginBottom: 5,
    },
});

export default styles;
