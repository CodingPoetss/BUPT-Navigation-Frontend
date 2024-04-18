import api from './index';

export const getShortestPath = async (selectedMarker) => {
    try {
        console.log(selectedMarker);
        const data = {
            start: selectedMarker[0].id,
            end: selectedMarker[1].id
        }
        console.log(data);
        const response = await api.post(`/shortest_path`, data);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch shortest path:', error);
        throw error;
    }
};

/*
const handleCreateUser = async () => {
        setLoading(true);
        try {
            const userData = { name: username };
            const newUser = await createUser(userData);
            console.log('New User Created:', newUser);
            // 这里可以添加更多的逻辑，比如清空表单或显示成功消息
        } catch (error) {
            console.error('Error creating user:', error);
            // 处理错误，可能是显示错误消息等
        }
        setLoading(false);
    };
*/