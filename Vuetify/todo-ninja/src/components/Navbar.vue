<template>
  <nav>
    <v-toolbar density="comfortable">
      <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class=" text-uppercase text-grey">
        <span class=" font-weight-light">Todo</span>Ninja
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn append-icon="mdi-exit-to-app" variant="outlined" class="text-grey">SIGN OUT</v-btn>
    </v-toolbar>

    <v-navigation-drawer class=" bg-primary" v-model="drawer" temporary>
      <v-list :items="list"/>
    </v-navigation-drawer>
  </nav>
</template>

<script setup>
import { ref } from 'vue';

const drawer = ref(false);
const list = [
  {
    title: 'Dashboard',
    props: {
      prependIcon: 'mdi-view-dashboard',
      to: '/',
    },
  },
  {
    title: 'My Projects',
    props: {
      prependIcon: 'mdi-folder',
      to: '/projects',
    },
  },
  {
    title: 'Team',
    props: {
      prependIcon: 'mdi-account',
      to: '/team',
    },
  },
]
</script>

<style lang="scss" scoped></style>