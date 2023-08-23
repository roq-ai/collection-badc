import * as yup from 'yup';

export const usageTrackingValidationSchema = yup.object().shape({
  date: yup.date().required(),
  mileage: yup.number().integer().required(),
  fuel_consumption: yup.number().integer().required(),
  vehicle_id: yup.string().nullable().required(),
});
