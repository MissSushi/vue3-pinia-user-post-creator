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
        <div class="buttonsContainer">
          <button @click="toggleEditPost(post.uuid)" class="editButton">Bearbeiten</button>
          <button @click="deletePost(post.uuid)" class="deleteButton">Löschen</button>
        </div>
      </div>
      <form @submit.prevent="(e) => saveEdit(post.uuid, e)" v-else>
        <input type="hidden" name="uuid" :value="post.uuid" />
        <div class="editPostContainer">
          <textarea name="content" :value="post.content" class="content"></textarea>
          <div class="buttons">
            <button type="submit" class="saveButton">Speichern</button>
            <button @click="toggleEditPost(post.uuid)" class="cancelButton">Abbrechen</button>
          </div>
        </div>
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
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.saveButton {
  border-radius: 25px;
  border: 0;
  margin-right: 1rem;
  color: white;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  padding-top: 0.4rem;
  padding-bottom: 0.4rem;
  color: rgb(43, 41, 41);
  font-weight: bold;
  letter-spacing: 0.05rem;
}

.cancelButton {
  appearance: none;
  border-radius: 25px;
  border: 2px solid;
  border-color: white;
  background-color: gray;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  padding-top: 0.4rem;
  padding-bottom: 0.4rem;
  color: rgb(43, 41, 41);
  font-weight: bold;
  letter-spacing: 0.05rem;
}

.editButton {
  border-radius: 25px;
  border: 0;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  padding-top: 0.4rem;
  padding-bottom: 0.4rem;
  color: rgb(43, 41, 41);
  font-weight: bold;
  letter-spacing: 0.05rem;
}

.deleteButton {
  border-radius: 25px;
  border: 2px solid;
  background-color: gray;
  border-color: white;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  padding-top: 0.4rem;
  padding-bottom: 0.4rem;
  margin-left: 1rem;
  color: rgb(43, 41, 41);
  font-weight: bold;
  letter-spacing: 0.05rem;
}
.buttonsContainer {
  display: flex;
  justify-content: center;
}

.editPostContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.buttons {
  display: flex;
  align-items: center;
  margin-top: 2rem;
}

.content {
  height: 6rem;
  width: 20rem;
  padding: 1rem;
}
</style>
