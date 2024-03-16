<template>

  <nav>
    <button @click="tab='form'" :class="{active:tab==='form'}">Formular</button>
    <button @click="tab='schema'" :class="{active:tab==='schema'}">Schema</button>
  </nav>


  <template v-if="tab==='form'">
    <div class="styleA p-4">
      <JsonForms
          :schema="jsonform?.schema"
          :uischema="jsonform?.uischema"
          :data="{}"
          :renderers="jsonFormsRenderers"
          @change="onChange"
          v-if="jsonform?.schema"
      />
    </div>
    <details>
      <summary>Result</summary>
      <textarea class="mt-2 aspect-video" readonly >{{result}}</textarea>
    </details>
  </template>


  <template v-else-if="tab==='schema'">
    <textarea class="flex-grow" >{{jsonform}}</textarea>
  </template>

</template>


<style scoped>
nav {
  @apply flex gap-2 border-b border-gray-200
}
nav button {
  @apply px-4 py-0.5 rounded-t
}
nav button.active {
  @apply bg-gray-200
}
textarea {
  @apply block w-full font-mono text-xs
}
</style>



<script setup lang="ts">
import {ref} from "vue";
import {JsonForms} from "@jsonforms/vue";
import {vanillaRenderers} from "@jsonforms/vue-vanilla";
import {boplusVueVanillaRenderers, formbuilderRenderers } from '@backoffice-plus/formbuilder'

const props = defineProps(["jsonform"])

const jsonFormsRenderers = Object.freeze([
  ...vanillaRenderers,
  ...boplusVueVanillaRenderers,
  ...formbuilderRenderers,
]);

const tab = ref("form");
const result = ref({});

const onChange = (e) => {
  result.value = e?.data;
}
</script>

