<script setup>
import { computed } from "vue";
import {JsonViewer} from "vue3-json-viewer"
import "vue3-json-viewer/dist/index.css";

const props = defineProps(
  { source: {}
  } 
)

</script>

<template lang="pug">
div
  br
  br
  span.index {{source.Index}}: {{source.Created}}  
  span {{" > > > "}}
  span.category {{source.Category + " "}} 
  span.source {{source.Source}} 
  br
  JsonViewer(:value="source.Value", copyable boxed)  
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
