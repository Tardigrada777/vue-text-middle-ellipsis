<template>
  <div class="app">
    <div :style="{ width }">
      <p v-text-middle-ellipsis="4">Long long word.</p>
    </div>
    <p :style="{ width }" v-text-middle-ellipsis="2"> Lorem ipsum dolor. </p>
    <p :style="{ width }" v-text-middle-ellipsis="2"> amet, consectetur adipisicing. </p>

    <p> {{ width }} </p>

    <input type="range" v-model="p">
  </div>
</template>

<script>
export default {
  name: 'example',
  data() {
    return {
      p: 20
    }
  },
  computed: {
    width() {
      return `${50 + 50 * (this.p / 100) * 2}px`
    }
  }
}
</script>

<style scoped>
  .app {
    background: aquamarine;
    padding: 15px;
  }
  .app > p {
    width: 75px;
    overflow: hidden;
    white-space: nowrap;
    background: white;
  }

  .app > div {
    background: white;
    padding: 10px;
  }
</style>
