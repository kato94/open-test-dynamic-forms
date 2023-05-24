<script lang="ts" setup></script>

<template>
  <v-layout full-height>
    <v-app-bar color="grey-lighten-3" elevation="10">
      <v-toolbar-title class="text-h6 text-center">
        <span class="font-weight-bold">Formulario dinámico</span>
      </v-toolbar-title>
    </v-app-bar>

    <v-main>
      <slot />
    </v-main>
  </v-layout>
</template>
