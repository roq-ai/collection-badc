import axios from 'axios';
import queryString from 'query-string';
import { UsageTrackingInterface, UsageTrackingGetQueryInterface } from 'interfaces/usage-tracking';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getUsageTrackings = async (
  query?: UsageTrackingGetQueryInterface,
): Promise<PaginatedInterface<UsageTrackingInterface>> => {
  const response = await axios.get('/api/usage-trackings', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createUsageTracking = async (usageTracking: UsageTrackingInterface) => {
  const response = await axios.post('/api/usage-trackings', usageTracking);
  return response.data;
};

export const updateUsageTrackingById = async (id: string, usageTracking: UsageTrackingInterface) => {
  const response = await axios.put(`/api/usage-trackings/${id}`, usageTracking);
  return response.data;
};

export const getUsageTrackingById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/usage-trackings/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteUsageTrackingById = async (id: string) => {
  const response = await axios.delete(`/api/usage-trackings/${id}`);
  return response.data;
};
