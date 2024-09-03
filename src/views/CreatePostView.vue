<script setup lang="ts">
import { userPostStore } from '@/stores/userPostStore';

function onsubmit(e: Event) {
  const postStore = userPostStore();

  const formData = new FormData(e.target as HTMLFormElement);
  const userPost = formData.get('createPost');
  postStore.addPost(userPost as string);
  (e.target as HTMLFormElement).reset();
}
</script>

<template>
  <form @submit.prevent="onsubmit">
    <div class="postArea">
      <label for="createPost">Beitrag erstellen</label>
      <textarea name="createPost" id="createPost" placeholder="Was machst du gerade?"></textarea>
      <button type="submit" class="submitButton">Posten</button>
    </div>
  </form>
</template>

<style scoped>
label {
  color: rgb(43, 41, 41);
  font-weight: bold;
}
textarea {
  height: 6rem;
  width: 20rem;
  margin-top: 0.3rem;
  padding: 1rem;
}

form {
  width: 25rem;
}
.postArea {
  display: flex;
  flex-direction: column;
  padding: 2rem;
  background-color: gray;
  border-radius: 1rem;
}

.submitButton {
  margin-top: 2rem;
  border-radius: 25px;
  border: 0;
  padding-top: 0.4rem;
  padding-bottom: 0.4rem;
  color: rgb(43, 41, 41);
  font-weight: bold;
  letter-spacing: 0.05rem;
}
</style>
