<template>
  <div style="position: relative">
    <temp-var-chart :tempToday="tempVar.tempToday"></temp-var-chart>
    <today-highlights :highlights="highlights"></today-highlights>
  </div>
</template>

<script>
  import TempVarChart from './TempVarChart.vue';
  import Highlights from './Highlights.vue';

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
