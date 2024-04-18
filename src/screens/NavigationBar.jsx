import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import InteractionMap from './InteractionMap';
import SearchMap from './SearchMap'
import BuptImage from '../components/BuptImg';
import ScenicMapLogger from './LoggerMap';
import ProfileScreen from './profile';


const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                // route是一个Tab.Screen对象
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        if (route.name === '地图') {
                            iconName = focused ? 'map' : 'map-outline';
                        } else if (route.name === '发现') {
                            iconName = focused ? 'compass' : 'compass-outline';
                        } else if (route.name === '我的') {
                            iconName = focused ? 'person-circle' : 'person-circle-outline';
                        }
                        // You can return any component that you like here!
                        return <Icon name={iconName} type='ionicon' color={color} size={size} />;
                    },
                    headerShown: false, // 隐藏顶部标题
                    tabBarStyle: { // 自定义底部标签栏样式
                        backgroundColor: '#ffffff', // 设置背景色
                        borderTopColor: 'transparent', // 去除顶部边框线
                    },
                    tabBarActiveTintColor: '#007bff', // 设置选中项的颜色
                    tabBarInactiveTintColor: '#8e8e93', // 设置未选中项的颜色
                })}>
                <Tab.Screen name="地图" component={InteractionMap} />
                <Tab.Screen name="发现" component={SearchMap} />
                <Tab.Screen name="我的" component={ProfileScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default MyTabs;
