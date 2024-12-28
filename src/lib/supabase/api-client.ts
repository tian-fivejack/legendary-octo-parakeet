import envConfig from "@/env-config";
import { createClient } from "@supabase/supabase-js";

const supabaseClient = createClient(
  envConfig.supabaseUrl,
  envConfig.supabaseAnonKey
);

export default supabaseClient;
