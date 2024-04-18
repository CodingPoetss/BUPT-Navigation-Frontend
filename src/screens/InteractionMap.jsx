import React, { useState, useEffect } from 'react'
import { Platform, Text, View, TextInput, Button, StyleSheet } from "react-native";
import { MapView, MapType, Marker, AMapSdk, Polyline, Circle } from "react-native-amap3d";
import { useTheme } from "@react-navigation/native";
import SwitchWithLabel from "../components/switch-with-label";
import { getShortestPath } from '../api/getShortestPath';
import { getAllPoints } from '../api/getAllPoints';
import { getMst } from '../api/getMst';
import { getVexCover } from '../api/getVexCover';


const markersDemo = [
    { latitude: 39.96119784480619, longitude: 116.35840523256256, title: "教一", description: "详细信息1", category: "教学楼" },
    { latitude: 39.960490904153794, longitude: 116.35809193723807, title: "教二", description: "详细信息2", category: "教学楼" },
    { latitude: 39.960475447846505, longitude: 116.3567692984475, title: "教三", description: "详细信息3", category: "教学楼" },
    { latitude: 39.96191848662335, longitude: 116.3564751101895, title: "教四", description: "详细信息4", category: "教学楼" },
    { latitude: 39.962485317018285, longitude: 116.35668923965758, title: "学二", description: "详细信息5", category: "宿舍楼" },
    { latitude: 39.963971214219754, longitude: 116.35522535762183, title: "学十三", description: "详细信息6", category: "宿舍楼" },
    { latitude: 39.96361283073395, longitude: 116.35803138097535, title: "瑞幸", description: "详细信息7", category: "咖啡店" },
    { latitude: 39.963434022680914, longitude: 116.35905951553204, title: "食堂一", description: "详细信息8", category: "食堂" },
    { latitude: 39.96392340071386, longitude: 116.35665038188299, title: "食堂二", description: "详细信息9", category: "食堂" },
    { latitude: 39.96491016630655, longitude: 116.35679745678053, title: "外卖柜", description: "详细信息10", category: "便利设施" }
];

const polylineDemo = [
    { latitude: 39.96119784480619, longitude: 116.35840523256256 },
    { latitude: 39.960490904153794, longitude: 116.35809193723807 }
];

const hamiltonianPolylines = [
    [
        { "longitude": 116.35679745678053, "latitude": 39.96491016630655 },
        { "longitude": 116.357072, "latitude": 39.964884 }
    ],
    [
        { "longitude": 116.357072, "latitude": 39.964884 },
        { "longitude": 116.35665038188299, "latitude": 39.96392340071386 }
    ],
    [
        { "longitude": 116.35665038188299, "latitude": 39.96392340071386 },
        { "longitude": 116.357173, "latitude": 39.963754 }
    ],
    [
        { "longitude": 116.357173, "latitude": 39.963754 },
        { "longitude": 116.35803138097535, "latitude": 39.96361283073395 }
    ],
    [
        { "longitude": 116.35803138097535, "latitude": 39.96361283073395 },
        { "longitude": 116.358623, "latitude": 39.963862 }
    ],
    [
        { "longitude": 116.358623, "latitude": 39.963862 },
        { "longitude": 116.35905951553204, "latitude": 39.963434022680914 }
    ],
    [
        { "longitude": 116.35905951553204, "latitude": 39.963434022680914 },
        { "longitude": 116.358688, "latitude": 39.963305 }
    ],
    [
        { "longitude": 116.358688, "latitude": 39.963305 },
        { "longitude": 116.357179, "latitude": 39.96327 }
    ],
    [
        { "longitude": 116.357179, "latitude": 39.96327 },
        { "longitude": 116.35668923965758, "latitude": 39.962485317018285 }
    ],
    [
        { "longitude": 116.35668923965758, "latitude": 39.962485317018285 },
        { "longitude": 116.3564751101895, "latitude": 39.96191848662335 }
    ],
    [
        { "longitude": 116.3564751101895, "latitude": 39.96191848662335 },
        { "longitude": 116.357228, "latitude": 39.962273 }
    ],
    [
        { "longitude": 116.357228, "latitude": 39.962273 },
        { "longitude": 116.358729, "latitude": 39.962336 }
    ],
    [
        { "longitude": 116.358729, "latitude": 39.962336 },
        { "longitude": 116.358778, "latitude": 39.961195 }
    ],
    [
        { "longitude": 116.358778, "latitude": 39.961195 },
        { "longitude": 116.35840523256256, "latitude": 39.96119784480619 }
    ],
    [
        { "longitude": 116.35840523256256, "latitude": 39.96119784480619 },
        { "longitude": 116.357278, "latitude": 39.961194 }
    ],
    [
        { "longitude": 116.357278, "latitude": 39.961194 },
        { "longitude": 116.3567692984475, "latitude": 39.960475447846505 }
    ],
    [
        { "longitude": 116.3567692984475, "latitude": 39.960475447846505 },
        { "longitude": 116.357316, "latitude": 39.960427 }
    ],
    [
        { "longitude": 116.357316, "latitude": 39.960427 },
        { "longitude": 116.35809193723807, "latitude": 39.960490904153794 }
    ],
    [
        { "longitude": 116.35809193723807, "latitude": 39.960490904153794 },
        { "longitude": 116.35864, "latitude": 39.960466 }
    ]
]



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
    const [compassEnabled, setCompassEnabled] = useState(false);
    const [scaleControlsEnabled, setScaleControlsEnabled] = useState(true);
    const [zoomControlsEnabled, setZoomControlsEnabled] = useState(true);
    const [myLocationButtonEnabled, setMyLocationButtonEnabled] = useState(true);

    // 点位信息存储
    // const [markerInfo, setMarkerInfo] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [selectedMarker, setSelectedMarker] = useState([]);
    const [selectedPolyline, setSelectedPolyline] = useState([]);
    const [mstPolyline, setMstPolyline] = useState([]);
    const [coverVexes, setCoverVexes] = useState([]);
    const [hamiltonianEnabled, setHamiltonianEnabled] = useState(false);
    const [showCrossing, setShowCrossing] = useState(false);
    const [showScc, setShowScc] = useState(false);

    // 监控selectedMarker数目
    useEffect(() => {
        const fetchPath = async () => {
            try {
                console.log("请求最短路径接口...");
                const data = await getShortestPath(selectedMarker);
                console.log(data);
                // const polyline = changeToCoord(markers, data.path);
                const polyline = data.path;
                const shortest_distance = data.shortest_distance
                // 错误处理
                if (polyline.length === 0 || shortest_distance < 0) {
                    console.error("这是两个不连通的坐标");
                    setSelectedPolyline([]);  // 出错时清空路径数据
                }
                setSelectedPolyline(polyline);  // 假设这里是已定义的路径数据

            } catch (error) {
                console.error('Error fetching shortest path:', error);
                setSelectedPolyline([]);  // 出错时清空路径数据
            }
        }

        // 当选中的标记点数量达到两个时，执行操作
        if (selectedMarker.length === 2) {
            // 请求接口获取路径
            fetchPath();
        } else {
            setSelectedPolyline([]);
        }
    }, [selectedMarker]);  // 依赖于 selectedMarker 的变化

    // 获取所有点
    useEffect(() => {
        const fetchPoints = async () => {
            const data = await getAllPoints();
            setMarkers(data);
        }
        fetchPoints();
    }, [])


    const handleOnClickMarker = (marker) => {
        const isSelected = selectedMarker.includes(marker);
        if (!isSelected) {
            if (selectedMarker.length < 2) {
                setSelectedMarker([...selectedMarker, marker]);
            } else {
                // 如果超过两个点，重置
                setSelectedMarker([marker]);
            }

        } else {
            // 被选中的情况取消选中
            // filter语句，筛选出不为marker的元素
            setSelectedMarker(selectedMarker.filter(m => m !== marker));
        }

    }

    const handleSwitchMst = (on) => {
        if (on) {
            setSelectedMarker([]);
            setSelectedPolyline([]);
            getMst().then(data => {
                console.log("请求最小路径");
                setMstPolyline(data["minimum spanning tree"]);
            }).catch(error => {
                console.error('Failed to load mst:', error);
            })
        } else {
            setMstPolyline([]);
        }
    }

    const handleVexCover = (on) => {
        if (on) {
            getVexCover().then(data => {
                const vexes = data["vex_cover"];
                setCoverVexes(vexes);
            }).catch(error => {
                console.error("Fail to load cover vexer", error)
            })
        } else {
            setCoverVexes([]);
        }
    }

    const mapProps = {
        compassEnabled,
        scaleControlsEnabled,
        zoomControlsEnabled,
        myLocationButtonEnabled,
    };


    return (
        <View style={{ flex: 1 }}>
            {/* <MySearchBar markers={markers} setMarkers={setMarkers} /> */}
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
                    // 根据 showCrossing 的值过滤 markers
                    if (marker.category === "路口" && !showCrossing) return;
                    let icon = selectedMarker.includes(marker) ? icons.savedLocation : icons.pin;
                    if (showScc) {
                        icon = icons.savedLocation;
                    }
                    return (
                        <Marker
                            draggable
                            key={index}
                            position={{ latitude: marker.latitude, longitude: marker.longitude }}
                            icon={icon}
                            title={marker.title}
                            onPress={() => handleOnClickMarker(marker)}
                        />
                    )
                }
                )}

                {selectedPolyline.length > 0 && (
                    <Polyline
                        points={selectedPolyline}
                        width={13}
                        color="#20B2AA" // 绿色：#009688 黄色：#FFFF00  蓝色：#0000FF
                    />
                )}

                {mstPolyline.length > 0 && (
                    mstPolyline.map((poly, index) => {
                        return (
                            <Polyline
                                key={index}
                                points={poly}
                                width={13}
                                color="#FF7F50" // 绿色：#009688 黄色：#FFFF00  蓝色：#0000FF
                            />
                        )
                    })
                )}

                {hamiltonianEnabled && (
                    hamiltonianPolylines.map((poly, index) => {
                        return (
                            <Polyline
                                key={index}
                                points={poly}
                                width={13}
                                color="#FAD02E" // 绿色：#009688 黄色：#FFFF00  蓝色：#0000FF
                            />
                        )
                    })
                )}

                {coverVexes.length > 0 && (
                    coverVexes.map((vex, index) => {
                        return (
                            <Circle
                                key={index}
                                strokeWidth={5}
                                strokeColor="rgba(0, 123, 255, 0.8)" // 深蓝色边框，稍微深一点提高可见度，半透明
                                fillColor="rgba(135, 206, 250, 0.5)" // 淡蓝色背景，半透明
                                radius={100}
                                center={vex}
                            />
                        )
                    })
                )}

            </MapView>

            <View style={{ flexDirection: "row", backgroundColor: colors.background }}>
                <SwitchWithLabel
                    label="显示路口"
                    value={showCrossing}
                    onChange={setShowCrossing}
                />
                <SwitchWithLabel
                    label="哈密尔顿"
                    value={hamiltonianEnabled}
                    onChange={setHamiltonianEnabled}
                />
                <SwitchWithLabel
                    label="网络覆盖"
                    value={coverVexes.length === 0 ? false : true}
                    onChange={handleVexCover}
                />
                <SwitchWithLabel
                    label="最小生成树"
                    value={mstPolyline.length === 0 ? false : true}
                    onChange={handleSwitchMst}
                />
                <SwitchWithLabel
                    label="强连通分量"
                    value={showScc}
                    onChange={setShowScc}
                />
            </View>

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
