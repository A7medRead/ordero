import Link from "next/link";

const links = [
  {
    name: "Overview",
    href: "/dashboard",
  },
  {
    name: "Customers",
    href: "/dashboard/customers",
  },
  {
    name: "Categories",
    href: "/dashboard/categories",
  },
  {
    name: "Products",
    href: "/dashboard/products",
  },
  {
    name: "Orders",
    href: "/dashboard/orders",
  },
];

export function Sidebar() {
  return (
    <aside className="w-64 min-h-screen border-r bg-white p-6">
      <h2 className="text-2xl font-bold mb-8">
        Ordero
      </h2>

      <nav className="flex flex-col gap-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-md px-3 py-2 text-sm hover:bg-gray-100"
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}