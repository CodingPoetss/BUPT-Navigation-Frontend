import React, { useState } from 'react';
import { SearchBar } from 'react-native-elements';
import { Alert } from 'react-native';

function MySearchBar() {
    const [search, setSearch] = useState('');

    const handleSearch = () => {
        // 使用Alert显示搜索内容
        Alert.alert("搜索内容", `你正在搜索: ${search}`, [
            { text: "OK" }, { text: "cancel" }
        ]);
        setSearch('');
    };

    return (
        <SearchBar
            placeholder="Type Here..."
            onChangeText={setSearch}
            value={search}
            onSubmitEditing={handleSearch} // 当用户在键盘上点击“搜索”时，会触发handleSearch函数
            searchIcon={{ type: 'font-awesome', name: 'search' }} // 使用FontAwesome的搜索图标
            containerStyle={{
                backgroundColor: 'transparent',
                borderBottomColor: 'transparent',
                borderTopColor: 'transparent',
            }}
            inputContainerStyle={{
                backgroundColor: '#e0e0e0' // 设置搜索输入框的背景色
            }}
        />
    );
}

export default MySearchBar;