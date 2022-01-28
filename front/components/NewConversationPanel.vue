<template>
  <main class="relative h-screen flex-grow flex flex-col">
    <div class="p-3 shadow flex gap-2">
      <p class="inline">To:</p>
      <div class="flex flex-wrap gap-2">
        <span
          v-for="user in addedUsers"
          :key="user._id"
          class="bg-blue-100 text-blue-500 p-1 rounded inline-flex items-center gap-1"
        >
          {{ user.email }}
          <button @click="removeUserFromGroup(user)" class="p-1 center rounded-full hover:bg-blue-200">
            <img src="@/assets/img/delete.svg" class="w-4 h-4" alt="Delete icon" />
          </button>
        </span>

        <!-- Add new users -->
        <div
        class="min-w-fit"
        v-show="filteredUsers.length > 0"
        >
          <div class="mt-1 relative">
            <button
              type="button"
              class="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              aria-haspopup="listbox"
              aria-expanded="true"
              aria-labelledby="listbox-label"
              @click="toggleUserSelect"
            >
              <span class="flex items-center">
                <span class="block truncate">Sélectionnez un nouveau membre</span>
              </span>
              <span class="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg
                  class="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            </button>

            <!-- Select user dropdown -->
            <ul
              class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
              tabindex="-1"
              role="listbox"
              aria-labelledby="listbox-label"
              aria-activedescendant="listbox-option-3"
              v-show="isUserSelectOpen"
            >
              <li
                class="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-gray-200"
                id="listbox-option-0"
                role="option"
                v-for="user in filteredUsers"
                :key="user._id"
                @click="addUserToGroup(user)"
              >
                <div class="flex items-center">
                  <span class="font-normal ml-3 block truncate"> {{user.email}} </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <button @click="createConversation" class="center gap-2 ml-auto bg-blue-100 hover:bg-blue-200 rounded p-2">Créer <img class="w-4 h-4" src="../assets/img/plus-solid.svg" alt="New conversation"></button>
    </div>
  </main>
</template>
<script>
import api from "@/services/api"

export default {
  data() {
    return {
      users: [],
      addedUsers: [],
      isUserSelectOpen: false
    };
  },
  mounted() {
    this.getUsers()
  },
  methods: {
    addUserToGroup(user) {
      this.addedUsers.push(user)
    },
    removeUserFromGroup(user) {
      this.addedUsers = this.addedUsers.filter((el) => el._id !== user._id);
    },
    toggleUserSelect() {
      this.isUserSelectOpen = !this.isUserSelectOpen
    },
    createConversation() {
      let membersIDs = []
      let membersNames = []

      this.addedUsers.forEach((u) => {
        membersIDs.push(u._id)
        membersNames.push(u.email.split('@')[0])
      })
      api.post("convs", true, {
        name: membersNames.join(', '),
        members: membersIDs
      }).then(
        (result) => {
          this.$emit("create-conv", result.conv);
        },
        (error) => {}
      );
    },
    getUsers() {
      api.get("users", true).then(
        (result) => {
          this.users = result.users;
        },
        (error) => {}
      );
    }
  },
  computed: {
    filteredUsers() {
      return this.users.filter(el => this.addedUsers.find(val => val === el) == undefined)
    }
  },
};
</script>
<style scoped></style>
