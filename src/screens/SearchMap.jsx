import React, { useState, useEffect } from 'react'
import { Platform, Text, View, TextInput, Button, StyleSheet, TouchableOpacity } from "react-native";
import { MapView, MapType, Marker, AMapSdk, Polyline } from "react-native-amap3d";
import { useTheme } from "@react-navigation/native";
import { Icon } from 'react-native-elements';
import MySearchBar from '../components/SearchBar';
import { getAllPoints } from '../api/getAllPoints';

bupt_buildings = {
    "瑞幸": "位于学生活动中心旁，提供各种咖啡和小吃，是学生休息和聚会的热门场所。",
    "主楼": "主要教学楼之一，多个学院的课程在此进行，设施完备，环境优雅。",
    "教二": "设有多个专业实验室和教室，是理工科学生的主要上课地点。",
    "教三": "新近翻修，提供了现代化的多媒体教学设备，多用于大型讲座。",
    "教四": "主要用于文科教学，内设语音室和计算机房，同时也是外语教学中心。",
    "学二": "学生宿舍楼之一，能容纳上千名学生，配备完善的生活设施。",
    "学十三": "最新建成的宿舍楼，提供现代化住宿条件，环境舒适安静。",
    "食堂一": "校园内最大的食堂，提供丰富多样的餐饮选择，价格实惠。",
    "食堂二": "位于校园北区，供应多种快餐和地方特色菜肴，受学生欢迎。",
    "外卖柜": "集中放置学生和教职工网购外卖的地点，方便快捷的取餐点。"
}

const icons = {
    flag: require("../assets/imgs/flag.png"),
    point: require("../assets/imgs/point.png"),
    point1: require("../assets/imgs/image.png"),
    googlemaps: require("../assets/imgs/google-maps-final.png"),
    pin: require("../assets/imgs/pin-final.png"),
    savedLocation: require("../assets/imgs/saved-location-final.png")
};

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
    const [compassEnabled, setCompassEnabled] = useState(true);
    const [scaleControlsEnabled, setScaleControlsEnabled] = useState(true);
    const [zoomControlsEnabled, setZoomControlsEnabled] = useState(true);
    const [myLocationButtonEnabled, setMyLocationButtonEnabled] = useState(true);

    // 点位信息存储
    const [markerInfo, setMarkerInfo] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [selectedMarker, setSelectedMarker] = useState([]);
    const [selectedPolyline, setSelectedPolyline] = useState([]);


    const mapProps = {
        compassEnabled,
        scaleControlsEnabled,
        zoomControlsEnabled,
        myLocationButtonEnabled,
    };


    // 获取所有点
    useEffect(() => {
        const fetchPoints = async () => {
            const data = await getAllPoints();
            setMarkers(data);
        }
        fetchPoints();
    }, [])


    return (
        <View style={{ flex: 1 }}>
            <MySearchBar markers={markers} setMarkers={setMarkers} />
            <MapView
                style={{ flex: 1 }}
                mapType={MapType.Standard}
                initialCameraPosition={{
                    target: { latitude: 39.962485317018285, longitude: 116.35668923965758 },
                    zoom: 18
                }}
                myLocationEnabled
                labelsEnabled
                {...mapProps}
            >



                {markers.map((marker, index) => {
                    return (
                        <Marker
                            draggable
                            key={index}
                            position={{ latitude: marker.latitude, longitude: marker.longitude }}
                            icon={icons.pin}
                            title={marker.title}
                            onPress={() => setMarkerInfo(marker)}
                        />
                    )
                }
                )}

            </MapView>

            {markerInfo && (
                <View style={styles.infoWindow}>
                    <TouchableOpacity style={styles.closeButton} onPress={() => setMarkerInfo(null)}>
                        <Icon name="close-circle-outline" type='ionicon' size={28} color="#cb2d3e" />
                    </TouchableOpacity>
                    <Text style={styles.infoTitle}>{markerInfo.name}</Text>
                    <Text style={styles.infoCategory}>[{markerInfo.category}]</Text>
                    <Text style={styles.infoDescription}>{bupt_buildings[markerInfo.name]}</Text>
                </View>
            )}


        </View>
    )
}

const styles = StyleSheet.create({
    infoWindow: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -150 }, { translateY: -100 }], // Adjust based on the actual size of the window
        width: 300,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 10,
    },
    closeButton: {
        position: 'absolute',
        right: 10,
        top: 10,
        padding: 10,  // 增加触摸区域
        zIndex: 1,    // 确保按钮在最上层
    },
    infoTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#2a9d8f', // A teal color for the title
    },
    infoCategory: {
        fontSize: 16,
        color: '#264653', // A darker blue color for the category
        marginBottom: 5,
    },
    infoDescription: {
        fontSize: 14,
        color: '#333', // Dark gray for text
    }
});

export default Map
