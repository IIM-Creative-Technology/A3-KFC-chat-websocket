<template>
  <div class="flex">
    <SideBar @select-conv="onSelectConv" @new-conv="showNewConversationPanel"/>
    <MessagePanel v-if="!newConversation && conv" :conv="conv" :key="conv._id" />
    <NewConversationPanel v-else-if="newConversation" @create-conv="onCreateConv"/>
  </div>
</template>

<script>
export default {
  middleware: "userConnected",
  data() {
    return {
      conv: null,
      newConversation: false
    };
  },
  methods: {
    onSelectConv(conv) {
      this.conv = conv;
      this.newConversation = false;
    },
    showNewConversationPanel() {
      this.newConversation = true
    },
    onCreateConv(conv) {

      this.onSelectConv(conv)
    }
  },
};
</script>
