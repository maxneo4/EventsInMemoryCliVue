<script setup>
import { ref, onMounted, computed } from 'vue'
import JsonTree from 'vue-json-tree'
import EventItem from './EventItem.vue'
import VirtualList from 'vue3-virtual-scroll-list';

const count = ref(0)
const headerUrl = ref(import.meta.env.PROD? (window.location.origin + '/sharedmemory/header') : 'http://localhost:8040/sharedmemory/header')
const eventsUrl = ref(import.meta.env.PROD? (window.location.origin + '/sharedmemory/header') : 'http://localhost:8040/sharedmemory/events')
const varsUrl = ref(import.meta.env.PROD? (window.location.origin + '/sharedmemory/header') : 'http://localhost:8040/sharedmemory/vars')
const header = ref(null)
const events = ref(null)
const revents = computed(()=> events.value==null? [] : JSON.parse(events.value))
const vars = ref(null)
const connectionError = ref(null)
const item = ref(EventItem)


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
  virtual-list(:data-key="'Created'", :data-sources="revents", :data-component="item")    
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
