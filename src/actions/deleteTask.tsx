import { supabase } from "../supabase-client";

export const deleteTask = async (id: number) => {
  const { data, error } = await supabase.from("tasks").delete().eq("id", id);

  if (error) {
    throw error;
  }

  return { error, data };
};
