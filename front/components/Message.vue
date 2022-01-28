<template>
  <div
    class="group flex items-center gap-1"
    :class="isFromAnotherUser ? 'flex-row' : 'flex-row-reverse'"
  >
    <p
      class="message__content inline-block rounded-2xl px-4 py-2"
      :class="isFromAnotherUser ? 'bg-gray-300' : 'bg-blue-500 text-white'"
    >
      {{ content }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    content: String,
    isFromAnotherUser: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.message__content {
  max-width: 500px;
  width: fit-content;
}
</style>
