<template>
  <main class="relative h-screen flex-grow flex flex-col">
    <div class="p-4 shadow">
      <p class="title">{{ conv.name }}</p>
    </div>
    <div class="flex min-h-0 flex-1 pl-2"> <!-- Content container -->
      <div id="overflow-container" class="overflow-auto flex-1 py-2"> <!-- Overflow container -->
        <div class="flex flex-col justify-end gap-2 pr-2"> <!-- Overflow content -->
          <Message
            v-for="message in messages"
            :key="message._id"
            :content="message.content"
            :isFromAnotherUser="userId != message.created_by"
          />
        </div>
      </div>
    </div>
    <div class="center gap-3 py-2">
      <input
        @keyup.enter="sendMessage"
        v-model="newMessage"
        class="w-4/5 py-1 px-4 bg-gray-100 rounded-full"
        type="text"
        aria-label="Ecrire un message"
        placeholder="Mon message"
      />

      <button
        @click.prevent="sendMessage"
        class="
          bg-blue-500
          hover:bg-blue-600
          active:transform active:scale-95
          h-8
          w-8
          center
          rounded-full
        "
        type="submit"
        aria-label="Envoyer le message"
      >
        <img
          class="w-5 h-5 text-white"
          src="@/assets/img/send.svg"
          alt="Send icon"
        />
      </button>
    </div>
  </main>
</template>

<script>
import socket from "@/services/socket";
import session from "@/services/session";

export default {
  props: {
    conv: null,
  },
  data() {
    return {
      newMessage: null,
      messages: [],
      userId: null,
    };
  },
  mounted() {
    socket.auth = {
      conv_id: this.conv._id,
      token: session.getToken(),
    };
    socket.connect();
    console.log("socket connected");

    // Set events
    socket.on("connect_error", (err) => {
      console.error(err);
    });

    socket.on("user_id", (userId) => {
      this.userId = userId;
    });

    socket.on("all_messages", (messages) => {
      this.messages = messages;
    });

    socket.on("new_message", (message) => {
      this.messages.push(message);
    });

    this.scrollToBottom()
  },
  methods: {
    sendMessage() {
      if (this.newMessage) {
        socket.emit("send_message", this.newMessage);
        this.newMessage = null;
      }
    },
    scrollToBottom() {
      var container = this.$el.querySelector("#overflow-container");
      container.scrollTop = container.scrollHeight;
    },
  },
  beforeDestroy() {
    socket.off("connect_error");
    socket.off("user_id");
    socket.off("all_messages");
    socket.off("new_message");
    socket.disconnect();
  },
};
</script>
