import { StyleSheet, Dimensions } from "react-native";

const { height } = Dimensions.get("window");
const styles = StyleSheet.create({
    loader: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: height / 2 - 60,
    },
});

export default styles;
