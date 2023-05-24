<script lang="ts" setup>
import { FormTypeEnum } from '~/types/enums/FormTypeEnum';

interface Props {
  question: string
  type: FormTypeEnum
  items: { id: number; value: string }[]
  response: string
}

type Emit = (e: 'change', form: any) => void

defineProps<Props>()
const emit = defineEmits<Emit>()

const select = ref(null);

const onChange = () => {
  emit('change', select.value)
}
</script>

<template>
  <div class="text-h6 mb-3">{{ question }}</div>
  <v-select
    v-model="select"
    @update:modelValue="onChange"
    :items="items"
    required
    item-title="value"
    :return-object="false"
    :rules="[rules.required]"
    placeholder="Seleccione una opción"
  ></v-select>
</template>
