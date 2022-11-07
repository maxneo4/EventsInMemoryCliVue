<script setup>

const props = defineProps(
  { source: {}
  } 
)

</script>

<template lang="pug">
div
  span {{source.Index}}: {{source.Created}} {{source.Value}}
  hr
</template>

<style scoped>

</style>
