import { supabase } from "../supabase-client";

export const fetchTasks = async () => {
  const { data, error } = await supabase.from("tasks").select("*");
  return { data, error };
};
