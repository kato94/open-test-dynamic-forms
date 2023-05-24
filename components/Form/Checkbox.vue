<script lang="ts" setup>
import { FormTypeEnum } from '~/types/enums/FormTypeEnum';

interface Props {
  question: string
  type: FormTypeEnum
  items: string[]
  response: string | boolean
}

type Emit = (e: 'change', value: string | boolean) => void

defineProps<Props>()
const emit = defineEmits<Emit>()

const checkbox = ref(false)

const onChange = () => {
  emit('change', checkbox.value)
}
</script>

<template>
  <div class="text-h6 mb-3">{{ question }}</div>
  <v-checkbox
    v-for="item in items"
    v-model="checkbox"
    @update:modelValue="onChange"
    :label="item"
    color="primary"
    :value="item"
    :rules="[rules.requiredSelect(checkbox)]"
    hide-details
  ></v-checkbox>
</template>
