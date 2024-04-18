import api from './index';

export const getAllPoints = async () => {
    try {
        const response = await api.get(`/vexes`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch all vexes:', error);
        throw error;
    }
};
