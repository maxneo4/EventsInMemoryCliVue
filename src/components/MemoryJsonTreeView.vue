<script setup>
import { ref, onMounted } from 'vue'
import JsonTree from 'vue-json-tree'

const count = ref(0)
const headerUrl = ref(import.meta.env.PROD? (window.location.origin + '/sharedmemory/header') : 'http://localhost:8040/sharedmemory/header')
const eventsUrl = ref(import.meta.env.PROD? (window.location.origin + '/sharedmemory/header') : 'http://localhost:8040/sharedmemory/events')
const varsUrl = ref(import.meta.env.PROD? (window.location.origin + '/sharedmemory/header') : 'http://localhost:8040/sharedmemory/vars')
const header = ref(null)
const events = ref(null)
const vars = ref(null)
const connectionError = ref(null)
const log =ref("empty")


function fetchHeaderData() {
  connectionError.value = undefined;
  console.log(headerUrl.value)
  fetch(headerUrl.value, { method: 'get', headers: {
      'content-type': 'application/json'
    } }).then(response => {      
      response.json().then(
        data => { 
          header.value = JSON.stringify(data)
        }
      );      
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
        }
      );      
    }).catch(error => {
      connectionError.value = error;
    });
}

function fetchVarsData() {
  connectionError.value = undefined;
  console.log(varsUrl.value)
  fetch(varsUrl.value, { method: 'get', headers: {
      'content-type': 'application/json'
    } }).then(response => {      
      response.json().then(
        data => { 
          vars.value = JSON.stringify(data)
        }
      );      
    }).catch(error => {
      connectionError.value = error;
    });
}

onMounted(() => {      
      fetchHeaderData();
      fetchEventsData();
      fetchVarsData();
    });

</script>

<template lang="pug">
div
  h2 Vars
  json-tree(:raw="vars")
  h2 Header
  json-tree(:raw="header", :level='1')
  h2 Events
  json-tree(:raw="events")
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
