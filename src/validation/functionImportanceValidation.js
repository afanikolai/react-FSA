import * as yup from 'yup';


export const fuctionImportanceValidationSchema = yup.object({
    absolute: yup.number().min(0).max(100)
});