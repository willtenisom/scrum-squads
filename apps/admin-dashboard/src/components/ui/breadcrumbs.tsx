import Link from "next/link";

type Breadcrumb = {
  label: string;
  href: string;
  active?: boolean;
};

export default function Breadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs: Breadcrumb[];
}) {
  return (
    <nav className="flex items-center gap-2 text-sm text-gray-600 mb-4">
      {breadcrumbs.map((crumb, i) => (
        <span key={i} className="flex items-center gap-2">
          {!crumb.active ? (
            <Link href={crumb.href} className="hover:underline">
              {crumb.label}
            </Link>
          ) : (
            <span className="font-semibold text-black">{crumb.label}</span>
          )}
          {i < breadcrumbs.length - 1 && <span>/</span>}
        </span>
      ))}
    </nav>
  );
}
