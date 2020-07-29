import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    card: {
        // backgroundColor: "rgba(52, 52, 52, 0.8)",
    },
    title: {
        fontSize: 25,
        fontWeight: "bold",
    },
    row: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 5,
    },
    sub: {
        fontSize: 18,
    },
    colVertical: {
        flex: 1,
        flexWrap: "wrap",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        overflow: "visible",
        // justifyContent: "center",
    },
    col2: {
        alignItems: "flex-end",
    },
    singleRow: {
        marginVertical: 5,
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    icons: {
        height: 15,
        width: 15,
        marginRight: 0,
        marginLeft: 5,
    },
    mg5: {
        margin: 5,
    },
    btmButton: {
        position: "absolute",
        width: "100%",
        bottom: 0,
    },
});
export default styles;
