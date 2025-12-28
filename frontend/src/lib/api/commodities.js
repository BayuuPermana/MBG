import axios from '../axios';

export const fetchCommodities = async (params) => {
    const res = await axios.get('/commodities', { params });
    return res.data;
};

export const createCommodity = async (data) => {
    const res = await axios.post('/commodities', data);
    return res.data;
};

export const updateCommodity = async (id, data) => {
    const res = await axios.put(`/commodities/${id}`, data);
    return res.data;
};
