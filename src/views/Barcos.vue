<template>
  <Lista></Lista>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Lista from "@/components/Lista.vue"; // @ is an alias to /src

@Component({
  components: {
    Lista,
  },
})
export default class Barcos extends Vue {}
</script>
