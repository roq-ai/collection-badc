import * as yup from 'yup';

export const performanceAssessmentValidationSchema = yup.object().shape({
  date: yup.date().required(),
  demand_score: yup.number().integer().required(),
  usage_score: yup.number().integer().required(),
  vehicle_id: yup.string().nullable().required(),
});
