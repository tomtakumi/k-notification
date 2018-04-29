<template>
  <v-layout column align-center>
    <v-card width="360">
      <v-card-title class="pt-4 px-4 pb-0">
        <div class="title pb-0">Send message to subscribers</div>
      </v-card-title>
      <v-progress-linear
        class="px-0"
        :indeterminate="query"
        :query="true"
        v-model="value"
        :active="show"
        height="2" 
        color="primary"
      ></v-progress-linear>
      <v-card-text class="px-4 py-0">
        <form>
          <v-text-field label="Title"></v-text-field>
          <v-text-field label="Enter message"></v-text-field>
        </form>
      </v-card-text>
      <v-card-actions class="px-4 pb-4">
        <v-spacer></v-spacer>
        <v-btn color="primary">Send</v-btn>
      </v-card-actions>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      value: 0,
      query: false,
      show: true,
      interval: 0
    };
  },

  mounted() {
    this.queryAndIndeterminate();
  },

  beforeDestroy() {
    clearInterval(this.interval);
  },

  methods: {
    queryAndIndeterminate() {
      this.query = true;
      this.show = true;
      this.value = 0;
      this.query = false;

      this.interval = setInterval(() => {
        if (this.value === 100) {
          clearInterval(this.interval);
          this.show = false;
          return setTimeout(this.queryAndIndeterminate, 2000);
        }
        this.value += 25;
      }, 1000);
    }
  }
};
</script>