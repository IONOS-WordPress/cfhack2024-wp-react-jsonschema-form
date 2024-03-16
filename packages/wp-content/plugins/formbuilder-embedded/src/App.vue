<template>
  <main class="container mx-auto flex flex-col gap-4">
    <section>
      <FormBuilder
          :schema="schema"
          :jsonFormsRenderers="jsonFormsRenderers"
          :tools="tools"
          class="flex-grow"
          @schemaUpdated="onSchemaUpdated"
          :key="key"
          :schema-only="true"
      />
    </section>
  </main>
</template>

<style>
body {
  @apply bg-gray-50
}
main > section {
  @apply
  bg-white shadow p-4 mb-8
  flex flex-row
}
</style>


<script setup lang="ts">
import {provide, ref} from "vue";
import {JsonForms} from "@jsonforms/vue";
import {vanillaRenderers} from "@jsonforms/vue-vanilla";
import {FormBuilder, defaultTools, boplusVueVanillaRenderers, formbuilderRenderers } from '@backoffice-plus/formbuilder'
import '@backoffice-plus/formbuilder/style.css'
import './style.css'
import './form.stylea.css'


const tools = [
  ...defaultTools,
]

const jsonFormsRenderers = Object.freeze([
  ...vanillaRenderers,
  ...boplusVueVanillaRenderers,
  ...formbuilderRenderers,
]);


provide('formbuilder-tools', tools)

const resultFormBuilder = ref();
const key = ref();

const schema = ref();

// for receiving json schema update
window.addEventListener(
    "message",
    (event) => {
      try {
        const schemaValue = JSON.parse(event.data);
        schema.value = schemaValue;
        key.value = Math.random();
      } catch (e) {

      }
    },
    false,
);

// for sending json schema updates
const onSchemaUpdated = (e) => {
  const jfString = JSON.stringify(e.schema)
  resultFormBuilder.value = JSON.parse(jfString);

  if (window.location !== window.parent.location) {
    // only send message if we are embedded in an iframe
    window.top.postMessage(jfString, '*');
  }
}
</script>

