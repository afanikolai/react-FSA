import * as yup from 'yup';


export const functionNameValidationSchema = yup.object().shape({
    name: yup.string().max(32)
});