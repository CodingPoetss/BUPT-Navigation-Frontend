import api from './index';

export const getHamiltonian = async (data) => {
    try {
        const response = await api.get(`/hamiltonian_path`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw error;
    }
};
