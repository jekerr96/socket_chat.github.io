<template>
  <search-settings></search-settings>
</template>

<script>

import SearchSettings from "@/components/SearchSettings";
export default {
  name: 'App',
  components: {
    SearchSettings

  }
}
</script>

<style>
body {
  margin: 0;
  background: url("./assets/images/background.png");
  color: #fff;
}

* {
  font-family: 'Philosopher', sans-serif;
}
</style>
