<template>
  <div
    class="
      min-h-full
      flex
      items-center
      justify-center
      py-12
      px-4
      sm:px-6
      lg:px-8
    "
  >
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Connectez-vous
        </h2>
        <p v-if="showError" class="w-full text-center text-red-900">
          Identifiants incorrects
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="onSubmit">
        <input type="hidden" name="remember" value="true" />
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email-address" class="sr-only">Email</label>
            <input
              v-model="email"
              id="email-address"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="
                appearance-none
                rounded-none
                relative
                block
                w-full
                px-3
                py-2
                border border-gray-300
                placeholder-gray-500
                text-gray-900
                rounded-t-md
                focus:outline-none
                focus:ring-indigo-500
                focus:border-indigo-500
                focus:z-10
                sm:text-sm
              "
              placeholder="Email"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Mot de passe</label>
            <input
              v-model="password"
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="
                appearance-none
                rounded-none
                relative
                block
                w-full
                px-3
                py-2
                border border-gray-300
                placeholder-gray-500
                text-gray-900
                rounded-b-md
                focus:outline-none
                focus:ring-indigo-500
                focus:border-indigo-500
                focus:z-10
                sm:text-sm
              "
              placeholder="Mot de passe"
            />
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              v-model="rememberMe"
              id="remember-me"
              name="remember-me"
              type="checkbox"
              class="
                h-4
                w-4
                text-indigo-600
                focus:ring-indigo-500
                border-gray-300
                rounded
              "
            />
            <label for="remember-me" class="ml-2 block text-sm text-gray-900">
              Se souvenir de moi
            </label>
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="
              group
              relative
              w-full
              flex
              justify-center
              py-2
              px-4
              border border-transparent
              text-sm
              font-medium
              rounded-md
              text-white
              bg-indigo-600
              hover:bg-indigo-700
              focus:outline-none
              focus:ring-2
              focus:ring-offset-2
              focus:ring-indigo-500
            "
          >
            Connexion
          </button>
        </div>
        <NuxtLink to="/register">M'inscrire</NuxtLink>
      </form>
    </div>
  </div>
</template>

<script>
import api from "@/services/api";
import session from "@/services/session";

export default {
  middleware: 'userNotConnected',
  data() {
    return {
      email: null,
      password: null,
      rememberMe: false,
      showError: false,
    };
  },
  methods: {
    onSubmit() {
      if (this.email && this.password) {
        api
          .post("auth/login", false, {
            email: this.email,
            password: this.password,
          })
          .then(
            (result) => {
              session.create(result.token, {}, this.rememberMe);
              this.$router.push("/");
            },
            (error) => {
              this.showError = true;
            }
          );
      }
    },
  },
};
</script>
