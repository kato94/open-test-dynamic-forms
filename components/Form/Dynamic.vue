<script lang="ts" setup>
import { ComponentOptionsMixin } from 'nuxt/dist/app/compat/capi';
import FormCheckbox  from '@/components/Form/Checkbox.vue';
import FormInput  from '@/components/Form/Input.vue';
import FormSelect from '@/components/Form/Select.vue';
import { FormTypeEnum } from '../../types/enums/FormTypeEnum';

interface Props {
  valid: boolean | undefined
  name: string
  descripcion: string
  form: {
    question: string
    type: FormTypeEnum
    items?: string[] | { id: number; value: string }[]
    response: string
  }[]
}
interface Emit {
  (e: 'update:valid', value: boolean): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emit>()

const valid = computed({
  get() {
    return props.valid
  },
  set(value: boolean) {
    emit('update:valid', value)
  }
})

const TYPE: Record<FormTypeEnum, ComponentOptionsMixin> = {
  SELECT: FormSelect,
  INPUT: FormInput,
  CHECKBOX: FormCheckbox,
};

const onChange = (index: number, value: string) => {
  props.form[index].response = value
}
</script>

<template>
  <v-form v-model="valid">
    <v-row>
      <v-col cols="12" v-for="(item, index) in form">
        <template v-if="TYPE[item.type]">
          <component :is="TYPE[item.type]" v-bind="item" @change="onChange(index, $event)" />
        </template>
      </v-col>
    </v-row>
  </v-form>
</template>
