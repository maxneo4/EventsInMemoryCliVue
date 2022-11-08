<script setup>
import { ref, reactive, markRaw, onMounted, computed } from 'vue'
import JsonTree from 'vue-json-tree'
import EventItem from './EventItem.vue'
import VirtualList from 'vue3-virtual-scroll-list';
import {JsonViewer} from "vue3-json-viewer"

const count = ref(0)
const headerUrl = ref(import.meta.env.PROD? (window.location.origin + '/sharedmemory/header') : 'http://localhost:8040/sharedmemory/header')
const eventsUrl = ref(import.meta.env.PROD? (window.location.origin + '/sharedmemory/events') : 'http://localhost:8040/sharedmemory/events')
const varsUrl = ref(import.meta.env.PROD? (window.location.origin + '/sharedmemory/vars') : 'http://localhost:8040/sharedmemory/vars')
const header = ref("{}")
const events = ref([])
const vars = ref("{}")
const diffEvents = reactive({ current: 0, new: 0})
const connectionError = ref(null)
const item = markRaw(EventItem)

const optionsDateFormat = {
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  month: 'short',
  day: 'numeric',
};

function fetchHeaderData() {
  connectionError.value = undefined;
  console.log(headerUrl.value)
  fetch(headerUrl.value, { method: 'get', headers: {
      'content-type': 'application/json'
    } }).then(response => {      
      response.json().then(
        data => { 
          if ( data.Behaviour !== undefined )
            { data.Behaviour.WorkingSince = new Date(data.Behaviour.WorkingSince.toString()).toLocaleString() }
          diffEvents.new = data.Behaviour.CountRegisteredEvents          
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
          data.map((event, index) => {
             event.Index = index+1;
             event.Created = new Date(event.Created.toString()).toLocaleString('en-US', optionsDateFormat);
           }) 
          events.value = data         
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
          vars.value = data
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
      setInterval(function(){ 
        fetchHeaderData();
        if(diffEvents.new != diffEvents.current)
        { 
          fetchEventsData(); 
          diffEvents.current = diffEvents.new
        }
        fetchVarsData();
      }, 5000);
    });

</script>

<template lang="pug">
div.body
  h3 Header
  json-tree(:raw="header", :level='0')
  h2 Vars
  JsonViewer(:value="vars", copyable boxed)
  h2 Events
  hr
  virtual-list(:data-key="'Index'", :data-sources="events", :data-component="item", style="height: 500px; overflow-y: auto;")    
</template>

<style scoped>
a {
  color: #42b983;
}

.body { 
  margin-left: 5%;
  margin-right: 5%;
}
</style>
