import React, { useState, useEffect } from 'react'
import { Platform, Text, View, TextInput, Button, StyleSheet } from "react-native";
import { MapView, MapType, Marker, AMapSdk, Polyline } from "react-native-amap3d";
import { useTheme } from "@react-navigation/native";
import SwitchWithLabel from "../components/switch-with-label";
import Geolocation from '@react-native-community/geolocation';
import { Icon } from 'react-native-elements';
import MySearchBar from '../components/SearchBar';


const markersDemo = [
    { latitude: 39.96119784480619, longitude: 116.35840523256256, title: "教一", description: "详细信息1", category: "教学楼" },
    { latitude: 39.960490904153794, longitude: 116.35809193723807, title: "教二", description: "详细信息2", category: "教学楼" }
];

const polylineDemo = [
    { latitude: 39.96119784480619, longitude: 116.35840523256256 },
    { latitude: 39.960490904153794, longitude: 116.35809193723807 }
];

function Map() {
    AMapSdk.init(
        Platform.select({
            android: "9a98ea6bf92cfb03da8544fafe1b13e9",
            ios: "",
        })
    );

    // 钩子函数的调用应当在组件函数的内部
    // 地图控制台配置
    const { colors } = useTheme();
    const [compassEnabled, setCompassEnabled] = useState(false);
    const [scaleControlsEnabled, setScaleControlsEnabled] = useState(true);
    const [zoomControlsEnabled, setZoomControlsEnabled] = useState(true);
    const [myLocationButtonEnabled, setMyLocationButtonEnabled] = useState(true);

    // 点位信息存储
    const [markerInfo, setMarkerInfo] = useState(null);
    const [markers, setMarkers] = useState(markersDemo);
    const [currentLocation, setCurrentLocation] = useState(null);

    useEffect(() => {
        const watchId = Geolocation.watchPosition(
            position => {
                const { latitude, longitude } = position.coords;
                setCurrentLocation({ latitude, longitude });
            },
            error => console.log(error),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );

        return () => Geolocation.clearWatch(watchId);
    }, []);


    const handleLocation = () => {
        if (currentLocation) {
            setCurrentLocation(null);  // This is to trigger re-rendering of MapView
            setTimeout(() => setCurrentLocation(currentLocation), 100);
        }
    };


    const mapProps = {
        compassEnabled,
        scaleControlsEnabled,
        zoomControlsEnabled,
        myLocationButtonEnabled,
    };


    return (
        <View style={{ flex: 1 }}>
            <MySearchBar markers={markers} setMarkers={setMarkers} />
            <MapView
                style={{ flex: 1 }}
                mapType={MapType.Standard}
                initialCameraPosition={{
                    target: { latitude: 39.90960456049752, longitude: 116.3972282409668 },
                    zoom: 14
                }}
                myLocationEnabled
                labelsEnabled
                {...mapProps}
            >

                <Marker
                    position={{ latitude: 39.806901, longitude: 116.297972 }}
                    icon={{
                        uri: "https://reactnative.dev/img/pwa/manifest-icon-512.png",
                        width: 64,
                        height: 64,
                    }}
                />

                <Marker position={{ latitude: 39.906901, longitude: 116.397972 }}>
                    <Text
                        style={{
                            color: "#fff",
                            backgroundColor: "#009688",
                            alignItems: "center",
                            borderRadius: 5,
                            padding: 5,
                        }}
                    >
                        {new Date().toLocaleString()}
                    </Text>
                </Marker>


                <Marker position={{ latitude: 39.962485317018285, longitude: 116.35668923965758 }}>
                    <Text
                        style={{
                            color: "#fff",
                            backgroundColor: "#009688",
                            alignItems: "center",
                            borderRadius: 5,
                            padding: 5,
                        }}
                    >
                        学二
                    </Text>
                </Marker>

                {markers.map((marker, index) => (
                    <Marker
                        key={index}
                        position={{ latitude: marker.latitude, longitude: marker.longitude }}
                        title={marker.title}
                        onPress={() => setMarkerInfo(marker)}
                    />
                ))}

                <Polyline
                    points={polylineDemo}
                    width={13}
                    color="#009688"
                />
            </MapView>

            <View style={{ flexDirection: "row", backgroundColor: colors.background }}>
                <SwitchWithLabel label="指南针" value={compassEnabled} onChange={setCompassEnabled} />
                <SwitchWithLabel
                    label="比例尺"
                    value={scaleControlsEnabled}
                    onChange={setScaleControlsEnabled}
                />
                <SwitchWithLabel
                    label="缩放控件"
                    value={zoomControlsEnabled}
                    onChange={setZoomControlsEnabled}
                />
                <SwitchWithLabel
                    label="定位按钮"
                    value={myLocationButtonEnabled}
                    onChange={setMyLocationButtonEnabled}
                />
            </View>


            {markerInfo && (
                <View style={styles.infoWindow}>
                    <Text>{markerInfo.title}</Text>
                    <Text>{markerInfo.description}</Text>
                </View>
            )}

            {/* <View style={styles.searchBar}>
                <TextInput
                    style={styles.input}
                    placeholder="搜索地点或分类"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                <Button title="搜索" onPress={handleSearch} />
            </View> */}
        </View>
    )
}

const styles = StyleSheet.create({
    searchBar: {
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,
        flexDirection: 'row',
        backgroundColor: 'white',
    },
    input: {
        flex: 1,
        padding: 10,
        borderColor: 'gray',
        borderWidth: 1,
    },
    infoWindow: {
        position: 'absolute',
        bottom: '50%',
        left: '10%',
        right: '10%',
        backgroundColor: 'white',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    locationButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: 'white',
    }
});


export default Map
