// import { getServerSession } from '@supabase/auth-helpers-sveltekit'

// サーバーサイドで読み込む処理を書く
export const load = async () => {
  return {
    title: 'Hello world!',
    content: 'Welcome to our blog. Lorem ipsum dolor sit amet...'
  };
}
