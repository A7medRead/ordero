export function Header() {
  return (
    <header className="h-16 border-b flex items-center justify-between px-6">
      <h1 className="font-semibold">
        Dashboard
      </h1>

      <button className="text-sm text-red-500">
        Logout
      </button>
    </header>
  );
}