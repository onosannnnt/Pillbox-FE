import { createClient } from "@supabase/supabase-js";
import { nanoid } from "nanoid";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const uploadImage = async (path: string, file: File) => {
  const fileName = `${path}/` + nanoid();

  const { error } = await supabase.storage
    .from("medicines")
    .upload(fileName, file);
  if (error) {
    throw error;
  }
  const { data } = await supabase.storage
    .from("medicines")
    .getPublicUrl(fileName);
  return data.publicUrl;
};
