// import { getServerSession } from '@supabase/auth-helpers-sveltekit'

export const load = async () => {
  return {
    title: 'Hello world!',
    content: 'Welcome to our blog. Lorem ipsum dolor sit amet...'
  };
}
