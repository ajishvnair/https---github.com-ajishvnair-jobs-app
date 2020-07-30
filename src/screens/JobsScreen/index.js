import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { ListItem } from "react-native-elements";
import http from "../../common/http";
import Loader from "../../components/loader";

const JobsScreen = ({ navigation }) => {
    // jobs list by category
    const [jobsList, setJobsList] = useState([]);
    const [loader, setLoader] = useState(true);

    const id = navigation.getParam("id", 1);
    const title = navigation.getParam("title", 1);

    useEffect(() => {
        http.getAction(`jobs-available/?id=${id}`)
            .then((res) => {
                const {
                    data: { data = [] },
                } = res.data;
                setJobsList([...data]);
                setLoader(false);
            })
            .catch((err) => {
                setLoader(false);
            });
    }, []);

    const handleJobSelect = (job) => {
        navigation.navigate("Job", { job });
    };

    return (
        <>
            {loader ? (
                <Loader />
            ) : (
                <ScrollView>
                    {(jobsList || []).map((job, i) => (
                        <ListItem
                            key={i}
                            title={job.title}
                            subtitle={`Experience: ${job.experience}`}
                            bottomDivider
                            chevron={{ color: "black" }}
                            titleStyle={{ fontWeight: "bold" }}
                            onPress={() => handleJobSelect(job)}
                        />
                    ))}
                </ScrollView>
            )}
        </>
    );
};
JobsScreen["navigationOptions"] = ({ navigation }) => ({
    title: navigation.getParam("title", 1) || "Jobs",
});

export default JobsScreen;
