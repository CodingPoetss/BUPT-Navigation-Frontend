import api from './index';

export const getSearchInfo = async (searchQuery) => {
    try {
        const data = {
            keyword: searchQuery
        }
        const response = await api.post(`/vex_info`, data);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Failed to fetch searchInfo:', error);
        throw error;
    }
};
