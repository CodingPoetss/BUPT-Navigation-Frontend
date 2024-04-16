import React, { useState } from 'react';
import { Icon, SearchBar } from 'react-native-elements';
import { Alert, StyleSheet } from 'react-native';

function MySearchBar({ markers, setMarkers }) {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        if (searchQuery != "") {
            const filteredMarkers = markers.filter(marker =>
                marker.title.toLowerCase().includes(searchQuery.toLowerCase()) || marker.category.toLowerCase() === searchQuery.toLowerCase()
            );
            setMarkers(filteredMarkers);
            Alert.alert("搜索结果", `找到${filteredMarkers.length}个结果。`);
            setSearchQuery('');
        };
    };

    return (
        <SearchBar
            placeholder="请输入地点或者分类"
            onChangeText={setSearchQuery}
            value={searchQuery}
            onSubmitEditing={handleSearch}
            searchIcon={<Icon name='search' color='#007aff' />} // 使用FontAwesome的搜索图标
            containerStyle={styles.container}
            inputContainerStyle={styles.inputContainer}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
        paddingHorizontal: 10,
        paddingTop: 10,
    },
    inputContainer: {
        backgroundColor: '#e0e0e0',
        borderRadius: 30, // 增加圆角
        height: 50, // 设置高度
    }
});

export default MySearchBar;
