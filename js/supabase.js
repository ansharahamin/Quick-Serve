import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
export const SUPABASE_URL = "https://evxouosmxozepjtcfnut.supabase.co";
export const SUPABASE_ANON_KEY = "sb_publishable_YDvUOyNabwmsAbknCDo1-A_mFEp3mKN";
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
