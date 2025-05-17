export default function Logo() {
  return (
    <div>
      <header className="flex items-center gap-2 px-2">
        <img src="/supabase-logo.svg" alt="app-logo" className="w-12 h-12" />
        <h1 className="text-sm dark:text-white">Task Manager</h1>
      </header>
    </div>
  );
}
