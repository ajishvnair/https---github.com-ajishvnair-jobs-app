import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { ListItem, Icon } from "react-native-elements";
import http from "../../common/http";
import MenuImage from "../../components/MenuImage";

const HomeScreen = ({ navigation }) => {
    // to store job categories list
    const [jobCategoriesList, setJobCategoriesList] = useState([]);

    // fetch job categories
    useEffect(() => {
        http.getAction("api/v1/job-categories")
            .then((res) => {
                const { data } = res.data;
                setJobCategoriesList([...data]);
            })
            .catch((err) => {
                //err
            });
    }, []);

    return (
        <ScrollView>
            {jobCategoriesList.map((category, i) => (
                <ListItem
                    key={i}
                    leftAvatar={
                        <Icon
                            name={category.icon}
                            type="font-awesome"
                            color="white"
                        />
                    }
                    title={category.name}
                    // subtitle={l.subtitle}
                    bottomDivider
                />
            ))}
        </ScrollView>
    );
};

HomeScreen["navigationOptions"] = ({ navigation }) => ({
    title: "Job Categories",
    headerLeft: () => (
        <MenuImage
            onPress={() => {
                navigation.openDrawer();
            }}
        />
    ),
});

export default HomeScreen;
