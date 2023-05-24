export const rules = {
  required: (v: string) => !!v && v.length > 0  || 'Este campo es requerido',
  requiredSelect: (v: string | boolean) => !!v || 'Este campo es requerido',
}
