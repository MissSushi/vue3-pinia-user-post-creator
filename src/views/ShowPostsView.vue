<script setup lang="ts">
import { userPostStore } from '@/stores/userPostStore';
import { storeToRefs } from 'pinia';

const postStore = userPostStore();
const { userPosts } = storeToRefs(postStore);
const { deletePost, toggleEditPost } = postStore;

const saveEdit = (uuid: string, e: Event) => {
  const formData = new FormData(e.target as HTMLFormElement);
  const content = formData.get('content') as string;

  postStore.updatePost(uuid, content);
};
</script>

<template>
  <ul>
    <li v-for="post in userPosts" :key="post.uuid" class="post">
      <div v-if="!post.isEditing">
        <p class="postText">{{ post.content }}</p>
        <button @click="toggleEditPost(post.uuid)">Bearbeiten</button>
        <button @click="deletePost(post.uuid)">Löschen</button>
      </div>
      <form @submit.prevent="(e) => saveEdit(post.uuid, e)" v-else>
        <input type="hidden" name="uuid" :value="post.uuid" />
        <textarea name="content" :value="post.content"></textarea>
        <button type="submit">Speichern</button>
        <button @click="toggleEditPost(post.uuid)">Abbrechen</button>
      </form>
    </li>
  </ul>
</template>

<style scoped>
ul {
  padding: 0;
}
li {
  list-style-type: none;
}

.post {
  padding: 2rem;
  background-color: gray;
  margin-top: 2rem;
  border-radius: 1rem;
  max-width: 25rem;
  word-break: break-all;
}

.postText {
  color: black;
}
</style>
