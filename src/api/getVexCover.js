import api from './index';

export const getVexCover = async () => {
    try {
        const response = await api.get(`/vex_cover`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch vex cover:', error);
        throw error;
    }
};
