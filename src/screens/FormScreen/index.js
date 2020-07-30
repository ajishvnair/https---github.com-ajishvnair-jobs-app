import React, { useState, useCallback } from "react";
import { View, Text, KeyboardAvoidingView, ScrollView } from "react-native";
import { Input, Button, Icon, CheckBox, Tooltip } from "react-native-elements";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import http from "../../common/http";

import {
    validateEmail,
    validateName,
    validatePhone,
} from "../../common/helper/commonMethods";
import styles from "./styles";

export default function ({ setVisible, id, showToast }) {
    // form values
    const [name, setName] = useState({ value: "", error: null });
    const [email, setEmail] = useState({ value: "", error: null });
    const [file, setFile] = useState({ file: { name: "" }, error: null });
    const [uploadLoader, setUploadLoader] = useState(false);
    const [submitLoader, setSubmitLoader] = useState(false);
    const [phone, setPhone] = useState({ value: "", error: null });
    const [gender, setGender] = useState({ value: "male", error: null });
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
                case "phone":
                    setPhone({ value, error: null });
                    break;
                case "gender":
                    setGender({ value, error: null });
                    break;
            }
        },
        [setEmail, setName, setPhone, setGender]
    );
    /**
     * to handle file upload using documnet picker
     * only support pdf files
     */
    const handleUpload = useCallback(async () => {
        setUploadLoader(true);
        const fileToUpload = await DocumentPicker.getDocumentAsync({
            type: "application/pdf",
            copyToCacheDirectory: true,
            multiple: false,
        });
        if (fileToUpload.type === "success") {
            setFile({ file: fileToUpload, error: null });
        }
        // else {
        //     setFile({ ...file, error: "Please Select file" });
        // }
        setUploadLoader(false);
    }, [setFile, setUploadLoader, file]);
    /**
     * handle form submit (apply)
     * validate all fields if it success
     * then post api call
     */
    const handleSumbit = async () => {
        if (!validateName(name.value)) {
            setName({ ...name, error: "Name contains atleast 3 letters" });
        } else if (!validateEmail(email.value)) {
            setEmail({ ...email, error: "Invalid Email Address" });
        } else if (!validatePhone(phone.value)) {
            setPhone({ ...phone, error: "Invalid phone number" });
        }
        // else if (file.file.name === "") {
        //     setFile({ ...file, error: "Please upload resume" });
        // }
        else {
            let resume = "";
            setSubmitLoader(true);
            if (file.file.uri) {
                resume = await FileSystem.readAsStringAsync(file.file.uri, {
                    encoding: FileSystem.EncodingType.Base64,
                });
            }

            const payload = {
                job_id: id,
                name: name.value,
                email: email.value,
                gender: gender.value,
                phone: phone.value,
                resume,
            };

            http.postAction("api/v1/applyjob", { ...payload })
                .then((res) => {
                    if (res.status === 200) {
                        setVisible(false);
                        showToast("Application submitted successfully");
                    } else {
                        setVisible(false);
                        showToast("Error while submitting try again");
                    }
                })
                .catch((err) => {
                    setVisible(false);
                    showToast("Error while submitting try again");
                });
        }
    };
    return (
        <View style={styles.container}>
            <ScrollView keyboardShouldPersistTaps={"handled"}>
                <KeyboardAvoidingView
                    behavior="position"
                    keyboardVerticalOffset={-550}
                >
                    <Input
                        label={<Text style={styles.bold}>Enter your name</Text>}
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
                        label={
                            <Text style={styles.bold}>Enter your Email</Text>
                        }
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

                    <Input
                        label={
                            <Text style={styles.bold}>
                                Enter your phone number
                            </Text>
                        }
                        placeholder="+1 2025550196"
                        value={phone.value}
                        leftIcon={
                            <Icon
                                name="phone"
                                type="font-awesome"
                                color="black"
                                size={20}
                            />
                        }
                        keyboardType="numbers-and-punctuation"
                        // operations
                        onChangeText={(value) => onInputChange("phone", value)}
                        disabled={submitLoader}
                        errorMessage={phone.error}
                    />

                    <Text style={styles.fileName}>Gender</Text>
                    <View style={styles.row}>
                        <CheckBox
                            title="Male"
                            checkedIcon="dot-circle-o"
                            uncheckedIcon="circle-o"
                            checked={gender.value === "male"}
                            onPress={() => onInputChange("gender", "male")}
                            disabled={submitLoader}
                        />
                        <CheckBox
                            title="Female"
                            checkedIcon="dot-circle-o"
                            uncheckedIcon="circle-o"
                            checked={gender.value === "female"}
                            onPress={() => onInputChange("gender", "female")}
                            disabled={submitLoader}
                        />
                    </View>
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
                    {file.error && (
                        <Text style={styles.error}>{file.error}</Text>
                    )}
                    <Button
                        buttonStyle={styles.button}
                        title="Apply"
                        loading={submitLoader}
                        onPress={handleSumbit}
                    />
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    );
}
