<template>
  <div class="home">
    <h1 class=" text-subtitle-1 text-grey">Dashboard</h1>
    <v-container class="my-5">
      <v-row align="end" justify="center" no-gutters>
        <v-col cols="12" sm="12" md="8" lg="6">
          <v-btn variant="outlined" block color="primary">1</v-btn>
        </v-col>
        <v-col cols="12" sm="12" md="8" lg="6">
          <v-btn variant="outlined" block color="primary">2</v-btn>
        </v-col>
      </v-row>

      <v-row justify="space-between" dense>
        <v-col cols="12" lg="2" md="3">
          <v-btn variant="outlined" block color="success">1</v-btn>
        </v-col>
        <v-col cols="12" lg="2" md="3">
          <v-btn variant="outlined" block color="success">2</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script >
export default {
  data: () => ({ loading: false }),

  methods: {
    load() {
      this.loading = true
      setTimeout(() => (this.loading = false), 3000)
    },
  },
}
</script>

<style lang="scss" scoped></style>