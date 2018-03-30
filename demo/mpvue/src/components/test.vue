<template>
  <div>
    <p class="test">
      {{text}}
    </p>
  </div>
</template>

<script>
export default {
  props: ['text']
}
</script>

<style>
.test {
  padding: 15px;
}
</style>
