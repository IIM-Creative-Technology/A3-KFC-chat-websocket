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
          Inscrivez-vous
        </h2>
        <p v-if="showError" class="w-full text-center text-red-900">
          Compte non créé
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="onSubmit">
        <input type="hidden" name="remember" value="true" />
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="first-name" class="sr-only">Prénom</label>
            <input
              v-model="firstName"
              id="first-name"
              name="first-name"
              type="text"
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
              placeholder="Prénom"
            />
          </div>
          <div>
            <label for="last-name" class="sr-only">Nom</label>
            <input
              v-model="lastName"
              id="last-name"
              name="last-name"
              type="text"
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
                focus:outline-none
                focus:ring-indigo-500
                focus:border-indigo-500
                focus:z-10
                sm:text-sm
              "
              placeholder="Nom"
            />
          </div>
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
            Inscription
          </button>
        </div>
        <NuxtLink to="/login">Me connecter</NuxtLink>
      </form>
    </div>
  </div>
</template>

<script>
import api from "@/services/api";
import session from "@/services/session";

export default {
  middleware: "userNotConnected",
  data() {
    return {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      rememberMe: false,
      showError: false,
    };
  },
  methods: {
    onSubmit() {
      if (this.email && this.password && this.firstName && this.lastName) {
        api
          .post("auth/register", false, {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password,
          })
          .then(
            (result) => {
              session.create(result.token, {}, false);
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
