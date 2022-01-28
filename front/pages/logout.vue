<template></template>

<script>
import session from "@/services/session";

export default {
  middleware: 'userConnected',
  mounted() {
    session.destroy();
    this.$router.push("/login");
  },
};
</script>
