export default function Logo() {
  return (
    <div>
      <header className="flex items-center gap-2">
        <img src="/supabase-logo.svg" alt="app-logo" className="w-8 h-8" />
        <h1 className="text-lg font-bold dark:text-white">Task Manager</h1>
      </header>
    </div>
  );
}
