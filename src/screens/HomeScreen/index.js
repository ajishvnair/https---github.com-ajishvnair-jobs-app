import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { ListItem, Icon } from "react-native-elements";
import { getIcon } from "../../common/helper/commonMethods";
import http from "../../common/http";
import MenuImage from "../../components/MenuImage";
import Loader from "../../components/loader";

const HomeScreen = ({ navigation }) => {
    // to store job categories list
    const [jobCategoriesList, setJobCategoriesList] = useState([]);
    const [loader, setLoader] = useState(true);

    // fetch job categories
    useEffect(() => {
        setLoader(true);
        http.getAction("job-categories")
            .then((res) => {
                const { data } = res.data;
                setJobCategoriesList([...data]);
                setLoader(false);
            })
            .catch((err) => {
                //err
                setLoader(false);
            });
    }, []);

    // navigate to job list page
    const handleCategoryPress = (id, title) => {
        navigation.navigate("Jobs", { id, title });
    };

    return (
        <>
            {loader ? (
                <Loader />
            ) : (
                <ScrollView>
                    {(jobCategoriesList || []).map((category, i) => (
                        <ListItem
                            key={i}
                            leftAvatar={
                                <Icon
                                    name={getIcon()}
                                    type="font-awesome"
                                    color="black"
                                />
                            }
                            title={category.name}
                            bottomDivider
                            chevron={{ color: "black" }}
                            titleStyle={{ fontWeight: "bold" }}
                            onPress={() =>
                                handleCategoryPress(category.eid, category.name)
                            }
                        />
                    ))}
                </ScrollView>
            )}
        </>
    );
};

HomeScreen["navigationOptions"] = ({ navigation }) => ({
    title: "Jobs Available",
    headerLeft: () => (
        <MenuImage
            onPress={() => {
                navigation.openDrawer();
            }}
        />
    ),
});

export default HomeScreen;
