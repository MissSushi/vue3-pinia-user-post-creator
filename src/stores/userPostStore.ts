import { defineStore } from 'pinia';

type UserPost = {
  content: string;
  uuid: string;
  isEditing: boolean;
};

type State = {
  userPosts: UserPost[];
};

type Actions = {
  addPost: (post: string) => void;
  updatePost: (uuid: string, post: string) => void;
  toggleEditPost: (uuid: string) => void;
  deletePost: (uuid: string) => void;
};

export const userPostStore = defineStore<'post', State, {}, Actions>('post', {
  state: () => ({
    userPosts: [] as UserPost[]
  }),
  actions: {
    addPost(newPost: string) {
      const post = {
        content: newPost,
        uuid: crypto.randomUUID(),
        isEditing: false
      };
      this.userPosts.push(post);
    },

    toggleEditPost(id: string) {
      const post = this.userPosts.find((post) => post.uuid === id);
      if (post) {
        post.isEditing = !post.isEditing;
      }
    },

    updatePost(id: string, updatedPost: string) {
      const post = this.userPosts.find((post) => post.uuid === id);
      if (post) {
        post.content = updatedPost;
        post.isEditing = !post.isEditing;
      }
    },

    deletePost(id: string) {
      this.userPosts = this.userPosts.filter((post) => post.uuid !== id);
    }
  },
  persist: {
    enabled: true
  }
});
