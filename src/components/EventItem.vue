<script setup>

const props = defineProps(
  { source: {}
  } 
)

</script>

<template lang="pug">
div
  span.index {{source.Index}}: {{source.Created}}
  br
  span.category {{source.Category + " "}} 
  span.source {{source.Source}} 
  br
  span {{source.Value}}
  hr
</template>

<style scoped>
  .index {
    font-weight: lighter;
    font-size: smaller;
  }
  .category {
    font-weight: bold;
  }
  
  .source {
    font-style: oblique;
  }
  
</style>
