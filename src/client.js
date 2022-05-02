import { createClient } from '@supabase/supabase-js'

const supabase = createClient(import.meta.env.VITE_APP_SUPABASE_APP_URL, import.meta.env.VITE_APP_SUPABASE_APP_ID)

export {
    supabase
}