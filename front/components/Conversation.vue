<template>
  <div
    @click="$emit('select')"
    class="
      h-16
      flex
      justify-between
      p-2
      hover:bg-gray-200
      transition
      duration-300
      hover:transition-none
      rounded-lg
    "
    role="button"
    tabindex="0"
  >
    <div class="conv-title">
      <div class="capitalize">{{ name }}</div>
      <div class="text-gray-400">Voir les messages</div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    _id: String,
    name: String,
    created_by: String,
    created_at: String,
  },
};
</script>
<style scoped>
</style>
