import { supabase } from "../supabase-client";

const deleteTask = async (id: number) => {
  const { data, error } = await supabase.from("tasks").delete().eq("id", id);

  if (error) {
    throw error;
  }

  return { error, data };
};

export default deleteTask;
