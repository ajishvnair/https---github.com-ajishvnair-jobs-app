import React, { useState } from "react";
import { Text, View, Image, ScrollView, ToastAndroid } from "react-native";
import { Card, Divider, Button, Overlay } from "react-native-elements";
import styles from "./styles";
import FormScreen from "../FormScreen";

export default function ({ navigation }) {
    // used to show overlay
    const [showOverlay, setShowOverlay] = useState(false);
    const job = navigation.getParam("job", 1);

    const showToast = (message) => {
        ToastAndroid.show(
            message,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
        );
    };
    return (
        <>
            <ScrollView>
                <Card
                    containerStyle={{ padding: 0 }}
                    image={require("../../../assets/bg.jpg")}
                >
                    <View style={styles.card}>
                        <Text style={styles.title}>{job.title}</Text>
                        <Divider />
                        <View style={styles.row}>
                            <View style={styles.col1}>
                                <Text style={styles.sub}>Experience</Text>
                                <Text>{job.experience}</Text>
                            </View>
                            <View style={styles.col2}>
                                {job.career_level ? (
                                    <>
                                        <Text style={styles.sub}>
                                            Career Level
                                        </Text>
                                        <Text>{job.career_level}</Text>
                                    </>
                                ) : null}
                            </View>
                        </View>
                        <Divider />
                        <View style={styles.row}>
                            {job.education && (
                                <View style={styles.col1}>
                                    <Text style={styles.sub}>Education</Text>
                                    <Text>{job.education}</Text>
                                </View>
                            )}
                            <View style={styles.col2}>
                                {job.salary ? (
                                    <>
                                        <Text style={styles.sub}>Salary</Text>
                                        <Text>{job.salary}</Text>
                                    </>
                                ) : null}
                            </View>
                        </View>
                        <Divider />
                        {job.company_name && job.show_company === 1 && (
                            <>
                                <View style={styles.row}>
                                    <View style={styles.col1}>
                                        <View style={styles.colVertical}>
                                            <Text style={styles.sub}>
                                                Company Name -{" "}
                                            </Text>
                                            <Text>{job.company_name}</Text>
                                        </View>
                                        <View style={styles.colVertical}>
                                            <Text style={styles.sub}>
                                                Location -{" "}
                                            </Text>
                                            <Text>{job.location}</Text>
                                        </View>
                                    </View>
                                </View>
                                <Divider />
                            </>
                        )}
                        {job.show_contact && (
                            <>
                                <Divider />
                                {job.email && (
                                    <View style={styles.singleRow}>
                                        <View style={styles.mg5}>
                                            <Image
                                                style={styles.icons}
                                                source={require("../../../assets/icons/gmail.png")}
                                            />
                                        </View>
                                        <Text>{job.email}</Text>
                                    </View>
                                )}

                                {job.phone && (
                                    <View style={styles.singleRow}>
                                        <View style={styles.mg5}>
                                            <Image
                                                style={styles.icons}
                                                source={require("../../../assets/icons/phone.png")}
                                            />
                                        </View>
                                        <Text>{job.phone}</Text>
                                    </View>
                                )}
                            </>
                        )}
                    </View>
                </Card>
            </ScrollView>
            <View style={styles.btmButton}>
                <Button
                    buttonStyle={{ height: 50 }}
                    title="APPLY NOW"
                    onPress={() => setShowOverlay(true)}
                />
            </View>
            <Overlay
                height="50%"
                isVisible={showOverlay}
                onBackdropPress={() => setShowOverlay(false)}
            >
                <FormScreen
                    id={job.eid}
                    setVisible={setShowOverlay}
                    showToast={showToast}
                />
            </Overlay>
        </>
    );
}
