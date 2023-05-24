<script lang="ts" setup>
import { FormInterface } from '../types/interfaces/FormInterface';

interface Props {
  modelValue: boolean
  data: FormInterface[]
}
interface Emit {
  (e: 'refresh'): void
  (e: 'update:modelValue', value: boolean): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emit>()

const isOpen = computed({
  get() {
    return props.modelValue
  },
  set(value: boolean) {
    emit('update:modelValue', value)
  }
})

const onRefresh = () => {
  isOpen.value = false
  emit('refresh')
}
</script>

<template>
  <v-dialog v-model="isOpen" fullscreen :scrim="false" transition="dialog-bottom-transition">
    <v-card class="overflow-y-auto">

      <v-toolbar dark color="primary">
        <v-btn icon dark @click="isOpen = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Resultados</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn variant="text" @click="onRefresh">
            Terminar
            <v-icon right>mdi-check</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <div class="px-2">
        <v-card class="mx-auto my-10 w-100" max-width="500" elevation="0" rounded="xl" variant="outlined">
          <template v-for="form in data">
            <v-list lines="two" subheader>
              <v-list-subheader>
                <div class="text-h6">
                  {{form.name}}
                </div>
                <div class="text-subtitle-2 pb-2">
                  {{form.descripcion}}
                </div>
              </v-list-subheader>
              <v-divider></v-divider>
              <template v-for="formData in form.form">
                <v-list-item>
                  <v-list-item-title>{{formData.question}}</v-list-item-title>
                  <v-list-item-subtitle class="text-primary text-right">{{formData.response}}</v-list-item-subtitle>
                </v-list-item>

                <v-divider></v-divider>
              </template>
            </v-list>
            <v-divider :thickness="7"></v-divider>
          </template>
        </v-card>
      </div>

    </v-card>
  </v-dialog>
</template>

<style scoped lang="sass">
  .v-divider:last-of-type
    display: none
</style>
