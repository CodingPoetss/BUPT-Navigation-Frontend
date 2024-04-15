import React from 'react'
import { Platform } from "react-native";
import { MapView, MapType, Marker, AMapSdk } from "react-native-amap3d";

AMapSdk.init(
    Platform.select({
        android: "9a98ea6bf92cfb03da8544fafe1b13e9",
        ios: "",
    })
);

function Map() {
    return (
        <MapView
            style={{ flex: 1 }}
            mapType={MapType.Standard}
            initialCameraPosition={{
                target: {
                    latitude: 39.91095,
                    longitude: 116.37296,
                },
                zoom: 12,
            }}


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

            </Marker>

        </MapView>
    )

}

export default Map
