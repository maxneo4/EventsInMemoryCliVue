<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps(
  { source: {}
  } 
)

</script>

<template lang="pug">
span {{source.Created}} {{source.Value}}
</template>

<style scoped>

</style>
