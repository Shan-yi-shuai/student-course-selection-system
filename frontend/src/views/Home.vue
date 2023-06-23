<template>
  <div class="home">
      <PagePost :post="welcomeScreen" />
  </div>
</template>

<script>
import PagePost from '../components/PagePost.vue'
export default {
  name: "Home",
  components: { PagePost },
  data() {
      return {
          welcomeScreen: {
              title: "Welcome!",
              blogPost: "Educational administration of students and teachers",
              getUser: true,
          }
      };
  }
};
</script>