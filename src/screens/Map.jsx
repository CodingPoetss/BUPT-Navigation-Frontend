import React from 'react'
import { Platform, Text, View } from "react-native";
import { MapView, MapType, Marker, AMapSdk, Polyline } from "react-native-amap3d";
import { useTheme } from "@react-navigation/native";
import SwitchWithLabel from "../components/switch-with-label";


const markers = [
    { latitude: 39.96119784480619, longitude: 116.35840523256256, title: "教一", description: "详细信息1" },
    { latitude: 39.960490904153794, longitude: 116.35809193723807, title: "教二", description: "详细信息2" }
];

const polyline = [
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
    const { colors } = useTheme();
    const [compassEnabled, setCompassEnabled] = React.useState(false);
    const [scaleControlsEnabled, setScaleControlsEnabled] = React.useState(true);
    const [zoomControlsEnabled, setZoomControlsEnabled] = React.useState(true);
    const [myLocationButtonEnabled, setMyLocationButtonEnabled] = React.useState(false);

    const [markerInfo, setMarkerInfo] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [markers, setMarkers] = useState(markers);
    const [currentLocation, setCurrentLocation] = useState(null);

    const mapProps = {
        compassEnabled,
        scaleControlsEnabled,
        zoomControlsEnabled,
        myLocationButtonEnabled,
    };







    return (
        <View style={{ flex: 1 }}>
            <MapView
                style={{ flex: 1 }}
                showsZoomControls={true}
                mapType={MapType.Standard}
                initialCameraPosition={{
                    target: {
                        latitude: 39.91095,
                        longitude: 116.37296,
                    },
                    zoom: 12,
                }}
                {...mapProps}
            >

                {markers.map((marker, index) => (
                    <Marker
                        key={index}
                        position={{ latitude: marker.latitude, longitude: marker.longitude }}
                        title={marker.title}
                        onPress={() => setMarkerInfo(marker)}
                    />
                ))}

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
                        coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                        title={marker.title}
                        onPress={() => setMarkerInfo(marker)}
                    />
                ))}
                <Polyline points={polyline} />
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
                <View style={{ position: 'absolute', bottom: 20, left: 20, right: 20, backgroundColor: 'white', padding: 10 }}>
                    <Text>{markerInfo.title}</Text>
                    <Text>{markerInfo.description}</Text>
                </View>
            )}

        </View>
    )
}

export default Map
