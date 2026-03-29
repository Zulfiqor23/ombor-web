import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabaseUrl = "https://phidslxgtivlzuxjskso.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBoaWRzbHhndGl2bHp1eGpza3NvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQwNzk4MDIsImV4cCI6MjA4OTY1NTgwMn0.zj66FbwufcZParOjWZPCS_v96b_wzyq3_ZhTQS1otz0"

export const supabase = createClient(supabaseUrl, supabaseKey)
