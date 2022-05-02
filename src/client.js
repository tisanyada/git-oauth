import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://guhgntqbwgeuyczdniud.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1aGdudHFid2dldXljemRuaXVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTEzMjQxMTUsImV4cCI6MTk2NjkwMDExNX0.-G6i2v3apXi_mOR-v-gRMIh1Dt2f5j0nffWf0KJILuA')

export {
    supabase
}