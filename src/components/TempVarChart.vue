<template>
  <div id="tempvarchart">
    <p>Temperature Information</p>
    {{ tempVar.tempToday }}
  </div>
</template>

<script>
  export default {
    props: ["tempVar"],
    data() {
      return {}
    },
    methods: {},
    computed: {}
  }
</script>

<style></style>
