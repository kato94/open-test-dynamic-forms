import { FormTypeEnum } from '../enums/FormTypeEnum';

export interface FormInterface {
  name: string
  descripcion: string
  form: FormDataInterface[]
}

export interface FormDataInterface {
  question: string
  type: FormTypeEnum
  items?: string[] | { id: number; value: string }[]
  response: string
}
