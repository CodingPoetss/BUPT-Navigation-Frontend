import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Avatar, Text, ListItem } from 'react-native-elements';

const ProfileScreen = () => {
    const userInfo = {
        avatarUrl: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg', // 这是一个示例图片
        nickname: 'BYR',
        school: '北京邮电大学',
    };

    const showDeveloperInfo = () => {
        Alert.alert("开发者信息", "开发者: 张三\n联系方式: zhangsan@example.com");
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.profileSection}>
                <Avatar
                    size="large"
                    rounded
                    source={{ uri: userInfo.avatarUrl }}
                    containerStyle={styles.avatar}
                />
                <Text h4 style={styles.name}>{userInfo.nickname}</Text>
                <Text style={styles.school}>{userInfo.school}</Text>
            </View>
            <View style={styles.infoSection}>
                <ListItem bottomDivider onPress={showDeveloperInfo}>
                    <ListItem.Content>
                        <ListItem.Title>开发者信息</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
                <ListItem bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title>设置</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
                <ListItem bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title>帮助</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    profileSection: {
        backgroundColor: '#fff',
        padding: 20,
        alignItems: 'center',
        borderBottomWidth: 10,
        borderBottomColor: '#f0f0f0',
    },
    avatar: {
        marginBottom: 10,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    school: {
        fontSize: 16,
        color: '#666',
    },
    infoSection: {
        marginTop: 10,
    }
});

export default ProfileScreen;
