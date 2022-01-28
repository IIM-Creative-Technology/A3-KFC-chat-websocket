<template>
  <div
    class="flex flex-col w-80 border-r border-solid border-gray-200 h-screen min-w-max"
  >
    <div
      class="p-4 border-solid border-b border-gray-200 center justify-around"
    >
      <h1 class="font-bold text-2xl mr-3">Discussions</h1>
      <div
        role="button"
        tabindex="0"
        aria-label="Créer une nouvelle discussion"
        class="w-8 h-8 rounded-full bg-gray-200 center"
        @click="onNewConvSelect"
      >
        <img src="../assets/img/plus-solid.svg" alt="new-conv" class="w-5 h-5" />
      </div>
    </div>
    <div class="p-2 overflow-y-auto overflow-x-hidden flex flex-col gap-2">
      <Conversation
        v-for="conversation in convs"
        :key="conversation._id"
        v-bind="conversation"
        @select="onConversationSelect(conversation)"
        :class="{ 'bg-gray-200': conversation === currentConversation }"
      />
    </div>
  </div>
</template>

<script>
import api from "@/services/api";

export default {
  middleware: "userConnected",
  data() {
    return {
      convs: [],
      currentConversation: null,
    };
  },
  mounted() {
    this.getConvs();
  },
  methods: {
    onConversationSelect(conversation) {
      this.currentConversation = conversation;
      this.$emit("select-conv", conversation);
    },
    getConvs() {
      api.get("convs", true).then(
        (result) => {
          this.convs = result.convs;
        },
        (error) => {}
      );
    },
    onNewConvSelect() {
      this.$emit('new-conv');
    }
  },
};
</script>
