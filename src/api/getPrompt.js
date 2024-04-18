import api from './index';

export const getPrompt = async (searchQuery) => {
    try {
        const data = {
            keyword: searchQuery
        }
        const response = await api.post(`/vex_prompt`, data);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw error;
    }
};
