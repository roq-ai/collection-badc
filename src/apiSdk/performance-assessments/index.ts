import axios from 'axios';
import queryString from 'query-string';
import {
  PerformanceAssessmentInterface,
  PerformanceAssessmentGetQueryInterface,
} from 'interfaces/performance-assessment';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getPerformanceAssessments = async (
  query?: PerformanceAssessmentGetQueryInterface,
): Promise<PaginatedInterface<PerformanceAssessmentInterface>> => {
  const response = await axios.get('/api/performance-assessments', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createPerformanceAssessment = async (performanceAssessment: PerformanceAssessmentInterface) => {
  const response = await axios.post('/api/performance-assessments', performanceAssessment);
  return response.data;
};

export const updatePerformanceAssessmentById = async (
  id: string,
  performanceAssessment: PerformanceAssessmentInterface,
) => {
  const response = await axios.put(`/api/performance-assessments/${id}`, performanceAssessment);
  return response.data;
};

export const getPerformanceAssessmentById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(
    `/api/performance-assessments/${id}${query ? `?${queryString.stringify(query)}` : ''}`,
  );
  return response.data;
};

export const deletePerformanceAssessmentById = async (id: string) => {
  const response = await axios.delete(`/api/performance-assessments/${id}`);
  return response.data;
};
