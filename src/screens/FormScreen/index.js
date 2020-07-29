import React, { useState, useCallback } from "react";
import { View, Text, KeyboardAvoidingView } from "react-native";
import { Input, Button, Icon } from "react-native-elements";
import * as DocumentPicker from "expo-document-picker";
import { validateEmail, validateName } from "../../common/helper/commonMethods";
import styles from "./styles";

export default function ({ setVisible, id, showToast }) {
    // form values
    const [name, setName] = useState({ value: "", error: null });
    const [email, setEmail] = useState({ value: "", error: null });
    const [file, setFile] = useState({ file: { name: "" }, error: null });
    const [uploadLoader, setUploadLoader] = useState(false);
    const [submitLoader, setSubmitLoader] = useState(false);
    /**
     * to change input values name and email
     *
     */
    const onInputChange = useCallback(
        (type, value) => {
            switch (type) {
                case "name":
                    setName({ value, error: null });
                    break;
                case "email":
                    setEmail({ value, error: null });
                    break;
            }
        },
        [setEmail, setName]
    );
    /**
     * to handle file upload using documnet picker
     * only support pdf files
     */
    const handleUpload = useCallback(async () => {
        setUploadLoader(true);
        const file = await DocumentPicker.getDocumentAsync({
            type: "application/pdf",
            copyToCacheDirectory: true,
            multiple: false,
        });
        if (file.type === "success") {
            setFile({ file, error: null });
        }
        setUploadLoader(false);
    }, [setFile, setUploadLoader]);
    /**
     * handle form submit (apply)
     * validate all fields if it success
     * then post api call
     */
    const handleSumbit = useCallback(() => {
        if (!validateName(name.value)) {
            setName({ ...name, error: "Name contains atleast 6 characters" });
        } else if (!validateEmail(email.value)) {
            setEmail({ ...email, error: "Invalid Email Address" });
        } else if (file.file.name === "") {
            setFile({ ...file, error: "Please upload resume" });
        } else {
            setSubmitLoader(true);
            setVisible(false);
            showToast("Application submitted successfully");
        }
    }, [
        validateName,
        validateEmail,
        setName,
        setEmail,
        setFile,
        name,
        email,
        file,
    ]);
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
                    // operations
                    onChangeText={(value) => onInputChange("name", value)}
                    disabled={submitLoader}
                    errorMessage={name.error}
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
                    // operations
                    onChangeText={(value) => onInputChange("email", value)}
                    disabled={submitLoader}
                    errorMessage={email.error}
                />
                <View>
                    <Text style={styles.fileName}>{file.file.name}</Text>
                </View>
                <Button
                    type="outline"
                    title="Upload Resume"
                    buttonStyle={styles.upload}
                    onPress={handleUpload}
                    loading={uploadLoader}
                    disabled={submitLoader}
                />
                {file.error && <Text style={styles.error}>{file.error}</Text>}
                <Button
                    buttonStyle={styles.button}
                    title="Apply"
                    loading={submitLoader}
                    onPress={handleSumbit}
                />
            </KeyboardAvoidingView>
        </View>
    );
}
