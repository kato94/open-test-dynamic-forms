<script lang="ts" setup>
import { ResponseInterface } from '~/types/interfaces/ResponseInterface';
import { FormInterface } from '~/types/interfaces/FormInterface';

const formsValid = ref<boolean[]>([])

const runtimeConfig = useRuntimeConfig()

const url = `${runtimeConfig.public.apiUrl}/6bd01347-72e9-49da-809a-d5002ca63b2c`;

const { data, pending, error, refresh } = await useAsyncData(
  () => $fetch<ResponseInterface>(url),
  {
    transform: (formulario) => {
      const newForm: FormInterface[] = Object.values(formulario)
      formsValid.value = Array(newForm.length).fill(false)
      return newForm
    },
  }
)

const step = ref<number>(0)

const isDisabled = computed<boolean>(() => {
  return !formsValid.value[step.value]
})

const openModalResult = ref(false)

const finish = () => {
  openModalResult.value = true
}


const currentTitle = computed(() => {
  return data.value?.[step.value].name ?? '';
});

const onRefresh = async () => {
  step.value = 0
  await refresh()
}

</script>

<template>
  <v-container>
  
    <v-card v-if="error" class="mx-auto my-10" max-width="500" elevation="11" rounded="xl" :loading="pending">
      <v-card-title class="text-h6 font-weight-regular d-flex justify-space-between bg-error pa-5" >
        <span>Error</span>
      </v-card-title>
      
      <v-card-text class="text-center py-4">
        <span class="text-subtitle-1">Ha ocurrido un error al cargar el formulario :(</span>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions class="pa-4">
        <v-spacer></v-spacer>
        <v-btn  color="error" variant="flat" @click="onRefresh" rounded="lg">
          Reintentar
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-card v-else-if="pending || !data" class="mx-auto my-10" max-width="500" elevation="11" rounded="xl" :loading="pending">
      <v-card-title class="text-h6 font-weight-regular pa-0">
        <v-skeleton-loader type="text" color="primary" class="py-4 px-0"></v-skeleton-loader>
      </v-card-title>
      <v-skeleton-loader type="list-item-two-line, divider"></v-skeleton-loader>

      <v-skeleton-loader class="justify-end" type="button"></v-skeleton-loader>
    </v-card>

    <v-card v-else class="mx-auto my-10" max-width="500" elevation="11" rounded="xl">

      <v-card-title class="text-h6 font-weight-regular d-flex justify-space-between bg-primary pa-5" >
        <span>{{ currentTitle }}</span>
        <span>{{ step + 1 + '/' + data.length }}</span>
      </v-card-title>

      <v-window v-model="step">
        <template v-for="(form, index) in data">
          <v-window-item :value="index">
            <v-card-text>
              <FormDynamic v-bind="form" v-model:valid="formsValid[index]" />
            </v-card-text>
          </v-window-item>
        </template>
      </v-window>

      <v-divider></v-divider>

      <v-card-actions class="pa-4">
        <v-btn v-if="step > 0" variant="text" @click="step--" rounded="lg">
          Anterior
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn v-if="step < data.length - 1" color="primary" variant="flat" @click="step++" :disabled="isDisabled" rounded="lg">
          Siguiente
        </v-btn>
        <v-btn v-if="step == data.length - 1" color="primary" variant="flat" @click="finish" :disabled="isDisabled" rounded="lg">
          Confirmar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>

  <ModalResult v-if="data" v-model="openModalResult" :data="data" @refresh="onRefresh" />
</template>
