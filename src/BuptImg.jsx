import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

// 获取屏幕的宽度和高度
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1, // 使用flex布局，使容器填充整个屏幕
        // justifyContent: 'center', // 垂直居中
        // alignItems: 'center', // 水平居中
    },
    fullscreenImage: {
        width: width,  // 图片宽度设置为屏幕宽度
        height: height + 100, // 图片高度设置为屏幕高度
        resizeMode: 'contain', // 确保图片完整显示，适应内容
    },
});

const BuptImage = () => {
    return (
        <View style={styles.container}>
            <Image
                style={styles.fullscreenImage}
                source={require("../assets/imgs/bupt.jpg")}
            />
        </View>
    );
}

export default BuptImage;