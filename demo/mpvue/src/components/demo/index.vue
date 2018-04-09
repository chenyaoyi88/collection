<template>
  <div>
    <p class="card">
      {{text}}
    </p>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ['text']
};
</script>

<style lang="scss">
.card {
  padding: 10px;
}
</style>
