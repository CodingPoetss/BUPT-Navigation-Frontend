import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, ScrollView, Text, Alert, StyleSheet } from 'react-native';
import { Icon, SearchBar } from 'react-native-elements';
import { getSearchInfo } from '../api/getSearchInfo';
import { getPrompt } from '../api/getPrompt';

function MySearchBar({ markers, setMarkers }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [prompts, setPrompts] = useState('');

    // 处理输入变化并获取提示
    useEffect(() => {
        const fetchPrompts = async () => {
            if (searchQuery !== '') {
                try {
                    console.log("prompt:" + searchQuery)
                    const res = await getPrompt(searchQuery);
                    setPrompts(res.vexes); // 假设API直接返回包含提示的对象
                } catch (error) {
                    console.error('Error fetching prompts:', error);
                    setPrompts([]);
                }
            } else {
                setPrompts([]);
            }
        };
        fetchPrompts();
    }, [searchQuery]);


    // 处理搜索
    const handleSearch = async (query) => {
        if (query !== '') {
            const resData = await getSearchInfo(query);
            setMarkers(resData);
            // setSearchQuery('');
            setPrompts([]); // 清空提示
        }

    };


    return (
        <View>
            <SearchBar
                placeholder="请输入地点或者分类"
                onChangeText={setSearchQuery}
                value={searchQuery}
                onSubmitEditing={() => handleSearch(searchQuery)}
                searchIcon={<Icon name='search' color='#007aff' />}
                placeholderTextColor="#888" // 设置占位符文本颜色
                inputStyle={styles.inputText} // 设置输入文本的样式
                containerStyle={styles.container}
                inputContainerStyle={styles.inputContainer}
            />
            {prompts.length > 0 && (
                <ScrollView style={styles.promptContainer} nestedScrollEnabled={true}>
                    {prompts.map((prompt, index) => (
                        <TouchableOpacity key={index} style={styles.promptItem} onPress={() => {
                            setSearchQuery(prompt);
                            handleSearch(prompt);
                        }}>
                            <Text style={styles.promptText}>{prompt}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            )}
        </View>
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
        borderRadius: 30,
        height: 50,
    },
    inputText: {
        color: '#000', // 设置输入文本颜色
        fontSize: 16, // 设置字体大小
    },
    promptContainer: {
        maxHeight: 200, // 控制最大高度，确保可滚动
        backgroundColor: 'white',
        borderColor: '#ddd',
        borderWidth: 1,
        borderTopWidth: 0,
    },
    promptItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    promptText: {
        fontSize: 16,
        color: '#333',
    }
});

export default MySearchBar;
