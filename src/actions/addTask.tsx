import { supabase } from "../supabase-client";

interface TaskProps {
  title: string;
  description: string;
  priority: string;
}

export const addTask = async ({ title, description, priority }: TaskProps) => {
  const { data, error } = await supabase
    .from("tasks")
    .insert({
      title,
      description,
      priority,
      completed: false,
      status: "todo",
    })
    .single();

  return { data, error };
};
