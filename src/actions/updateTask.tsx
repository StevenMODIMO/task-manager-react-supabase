import { supabase } from "../supabase-client";

interface TaskProps {
  title: string;
  description: string;
  priority: string;
  status: string;
  completed: boolean;
  id: number;
}

export const updateTask = async ({
  title,
  description,
  priority,
  status,
  completed,
  id,
}: TaskProps) => {
  const { error } = await supabase
    .from("tasks")
    .update({ title, description, priority, status, completed })
    .eq("id", id);

  return { error };
};
