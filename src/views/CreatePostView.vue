<script setup lang="ts">
import { userPostStore } from '@/stores/userPostStore';

function onsubmit(e: Event) {
  e.preventDefault();
  const postStore = userPostStore();

  const formData = new FormData(e.target as HTMLFormElement);
  const userPost = formData.get('createPost');
  postStore.addPost(userPost as string);
  (e.target as HTMLFormElement).reset();
}
</script>

<template>
  <form @submit="onsubmit">
    <div class="postArea">
      <label for="createPost" class="label">Beitrag erstellen</label>
      <textarea name="createPost" id="createPost" placeholder="Was machst du gerade?"></textarea>
      <button type="submit" class="submitButton">Posten</button>
    </div>
  </form>
</template>

<style scoped>
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
  margin-top: 1rem;
}

.label {
  color: black;
  font-weight: bold;
}
</style>
