import api from './index';

export const getMst = async () => {
    try {
        const response = await api.get(`/mst`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch mst:', error);
        throw error;
    }
};
