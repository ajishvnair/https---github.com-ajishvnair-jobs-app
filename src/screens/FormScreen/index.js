import React, { useState } from "react";
import { View, Text, KeyboardAvoidingView, ScrollView } from "react-native";
import { Input, Button, Icon } from "react-native-elements";
import * as DocumentPicker from "expo-document-picker";
import styles from "./styles";

export default function () {
    // name
    const [name, setName] = useState({ value: "", error: null });
    const [email, setEmail] = useState({ value: "", error: null });
    const [file, setFile] = useState({ file: { name: "" }, error: null });
    const [uploadLoader, setUploadLoader] = useState(false);

    const onInputChange = (type, value) => {
        switch (type) {
            case "name":
                setName({ value, error: null });
                break;
            case "email":
                setEmail({ value, error: null });
                break;
        }
    };

    const handleUpload = async () => {
        setUploadLoader(true);
        const file = await DocumentPicker.getDocumentAsync({
            type: "pdf/*",
            copyToCacheDirectory: true,
            multiple: false,
        });
        if (file.type === "success") {
            setFile({ file });
        }
        setUploadLoader(false);
    };
    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                behavior="position"
                keyboardVerticalOffset={-550}
            >
                <Input
                    label="Enter Your Name"
                    value={name.value}
                    leftIcon={
                        <Icon
                            name="user"
                            type="font-awesome"
                            color="black"
                            size={20}
                        />
                    }
                    onChangeText={(value) => onInputChange("name", value)}
                />
                <Input
                    label="Enter Your Email"
                    value={email.value}
                    leftIcon={
                        <Icon
                            name="envelope"
                            type="font-awesome"
                            color="black"
                            size={20}
                        />
                    }
                    onChangeText={(value) => onInputChange("email", value)}
                />
                <Text>{file.file.name}</Text>
                <Button
                    type="outline"
                    title="Upload Resume"
                    buttonStyle={styles.upload}
                    onPress={handleUpload}
                    loading={uploadLoader}
                />
                <Button buttonStyle={styles.button} title="Apply" />
            </KeyboardAvoidingView>
        </View>
    );
}
