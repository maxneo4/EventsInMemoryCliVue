<script setup>
import { ref, onMounted } from 'vue'
import JsonTree from 'vue-json-tree'


defineProps({
  msg: String
})

const count = ref(0)
const headerUrl = ref(window.location.origin + '/sharedmemory/header')
const eventsUrl = ref(window.location.origin + '/sharedmemory/events')
const header = ref(null)
const events = ref(null)
const connectionError = ref(null)


function fetchHeaderData() {
  connectionError.value = undefined;
  console.log(headerUrl.value)
  fetch(headerUrl.value, { method: 'get', headers: {
      'content-type': 'application/json'
    } }).then(response => {      
      response.json().then(
        data => { 
          header.value = JSON.stringify(data)
          console.log(header.value)
        }
      );      
      //addLine(`connected to ${url.value}`)
    }).catch(error => {
      connectionError.value = error;
    });
}

function fetchEventsData() {
  connectionError.value = undefined;
  console.log(eventsUrl.value)
  fetch(eventsUrl.value, { method: 'get', headers: {
      'content-type': 'application/json'
    } }).then(response => {      
      response.json().then(
        data => { 
          events.value = JSON.stringify(data)
          console.log(events.value)
        }
      );      
      //addLine(`connected to ${url.value}`)
    }).catch(error => {
      connectionError.value = error;
    });
}

onMounted(() => {      
      fetchHeaderData();
      fetchEventsData();
    });

</script>

<template lang="pug">
div
  h2 Header
  json-tree(:raw="header")
  h2 Log
  json-tree(:raw="events")
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
