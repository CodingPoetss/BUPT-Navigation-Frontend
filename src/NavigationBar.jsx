import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons'; // 确保这样导入Icon
import MapScreen from './Map';
import BuptImage from './BuptImg';


const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={({ route }) => ({
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
                    return <Icon name={iconName} size={size} color={color} />;
                },
            })}>
                <Tab.Screen name="地图" component={BuptImage} />
                <Tab.Screen name="发现" component={MapScreen} />
                <Tab.Screen name="我的" component={MapScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default MyTabs;
