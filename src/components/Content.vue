<template>
  <div style="position: relative">
    <temp-var-chart :tempVar="tempVar"></temp-var-chart>
    <today-highlights :highlights="highlights"></today-highlights>
  </div>
</template>

<script>
  import TempVarChart from './TempVarChart';
  import Highlights from './Highlights';

  export default {
    props: ["highlights", "tempVar"],
    components: {
      'temp-var-chart': TempVarChart,
      'today-highlights': Highlights
    },
    methods: {},
    computed: {}
  }
</script>

<style></style>
