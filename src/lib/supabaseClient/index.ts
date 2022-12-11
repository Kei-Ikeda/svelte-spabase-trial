// https://github.com/supabase/auth-helpers/blob/main/packages/sveltekit/README.md
import { createClient } from '@supabase/auth-helpers-sveltekit'
import { env } from '$env/dynamic/public'

export const supabase = createClient(env.PUBLIC_SUPABASE_URL, env.PUBLIC_SUPABASE_ANON_KEY)
