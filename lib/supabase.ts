import { createClient } from '@supabase/supabase-js'

const getSupabaseConfig = () => {
    let url = process.env.NEXT_PUBLIC_SUPABASE_URL
    let key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    // Fallback if missing or invalid
    if (!url || !url.startsWith('http')) {
        url = 'https://placeholder.supabase.co'
    }
    if (!key) {
        key = 'placeholder-key'
    }
    return { url, key }
}

const { url, key } = getSupabaseConfig()

export const supabase = createClient(url, key)
