import * as yup from 'yup';

export const userSchema = yup.object().shape({
  name: yup.string().required('Campo obrigatório.'),
  salary: yup.string().required('Campo obrigatório.'),
  companyValuation: yup.string().required('Campo obrigatório.'),
});

export type TUserSchema = yup.InferType<typeof userSchema>;
