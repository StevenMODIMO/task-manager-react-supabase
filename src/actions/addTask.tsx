import { supabase } from "../supabase-client";

interface TaskProps {
  title: string;
  description: string;
  priority: string;
  email: string;
}

export const addTask = async ({
  title,
  description,
  priority,
  email,
}: TaskProps) => {
  const { data, error } = await supabase
    .from("tasks")
    .insert({
      title,
      description,
      priority,
      completed: false,
      status: "todo",
      email,
    })
    .single();

  return { data, error };
};
