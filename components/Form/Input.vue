<script lang="ts" setup>
import { FormTypeEnum } from '~/types/enums/FormTypeEnum';

interface Props {
  question: string
  type: FormTypeEnum
  response: string
}

type Emit = (e: 'change', value: string) => void

defineProps<Props>()
const emit = defineEmits<Emit>()

const input = ref('')

const onChange = () => {
  emit('change', input.value)
}
</script>

<template>
  <div class="text-h6 mb-3">{{ question }}</div>
  <v-text-field
    v-model="input"
    @update:modelValue="onChange"
    required
    :rules="[rules.required]"
    placeholder="Ingrese una respuesta"
  ></v-text-field>
</template>
