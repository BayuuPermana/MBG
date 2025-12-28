import { describe, it, expect, mock } from 'bun:test';
import axios from '../../../lib/axios';
import { fetchCommodities, createCommodity, updateCommodity } from '../../../lib/api/commodities';

// MOCK AXIOS
mock.module('../../../lib/axios', () => ({
    default: {
        get: mock(() => Promise.resolve({ data: [] })),
        post: mock(() => Promise.resolve({ data: {} })),
        put: mock(() => Promise.resolve({ data: {} }))
    }
}));

describe('Commodity API Client', () => {
    it('fetchCommodities should call axios.get with correct params', async () => {
        await fetchCommodities({ region: 'Java' });
        expect(axios.get).toHaveBeenCalledWith('/commodities', { params: { region: 'Java' } });
    });

    it('createCommodity should call axios.post with correct data', async () => {
        const data = { name: 'Rice' };
        await createCommodity(data);
        expect(axios.post).toHaveBeenCalledWith('/commodities', data);
    });

    it('updateCommodity should call axios.put with correct id and data', async () => {
        const data = { price: 2000 };
        await updateCommodity('123', data);
        expect(axios.put).toHaveBeenCalledWith('/commodities/123', data);
    });
});
