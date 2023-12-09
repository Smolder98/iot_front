import { Ref, ref } from 'vue'

interface IPost {
  userId: number
  id: number
  title: string
  body: string
}

const usePostFetch = () => {
  const posts: Ref<IPost[]> = ref([])
  const isLoading: Ref<boolean> = ref(false)

  const fetchPosts = async () => {
    isLoading.value = true
    await new Promise(resolve => setTimeout(resolve, 5000))
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    posts.value = await response.json()


    isLoading.value = false
  }

  return {
    posts,
    fetchPosts,
    isLoading
  }
}

export default usePostFetch

// export class PostService {
//   private static url = 'https://jsonplaceholder.typicode.com/posts'
//   private posts: Ref<IPost[]> = ref([])

//   getPosts() {
//     return this.posts
//   }

//   async fetchAll() {
//     try {
//       const response = await fetch(PostService.url)
//       this.posts.value = await response.json()
//     } catch (error) {
//       console.log(error);
//     }
//   }
// }