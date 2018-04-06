<template>
  <div>
    <p class="card">
      {{text}}
    </p>
    <p>
      {{msg}}
    </p>
  </div>
</template>

<script>
export default {
  props: ['text'],
  data() {
    return {
      msg: '爱爱爱',
    };
  },
};
</script>

<style>
.card {
  padding: 10px;
}
</style>
