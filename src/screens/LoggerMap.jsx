import React, { useState, useEffect, useCallback } from "react";
import {
    FlatList,
    ListRenderItemInfo,
    NativeSyntheticEvent,
    PermissionsAndroid,
    Platform,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { MapView } from "react-native-amap3d";

const ScenicMapLogger = () => {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        const requestPermissions = async () => {
            if (Platform.OS === "android") {
                const result = await PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                ]);
                console.log(result);
            }
        };
        requestPermissions();
    }, []);

    const log = (event, data) => {
        console.log(data);
        setLogs((prevLogs) => [
            {
                key: Date.now().toString(),
                time: new Date().toLocaleString(),
                event,
                data: JSON.stringify(data, null, 2),
            },
            ...prevLogs,
        ]);
    };

    const logger = useCallback((name) => {
        return ({ nativeEvent }) => log(name, nativeEvent);
    }, []);

    const renderItem = ({ item }) => (
        <Text style={styles.logText}>
            {item.time} {item.event}: {item.data}
        </Text>
    );

    const events = ["onLoad", "onPress", "onPressPoi", "onLongPress", "onCameraIdle", "onLocation"];

    return (
        <View style={styles.body}>
            <MapView
                style={styles.body}
                {...Object.fromEntries(events.map((event) => [event, logger(event)]))}
                distanceFilter={10}
                headingFilter={90}
                myLocationEnabled
                myLocationButtonEnabled
            />
            <FlatList style={styles.logs} data={logs} renderItem={renderItem} />
        </View>
    );
};

const styles = StyleSheet.create({
    body: { flex: 1 },
    logs: { elevation: 8, flex: 1 },
    logText: {
        fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
        fontSize: 12,
        padding: 10,
    },
});

export default ScenicMapLogger;
