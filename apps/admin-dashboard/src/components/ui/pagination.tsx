export default function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const pageHref = (p: number) => {
    const sp = new URLSearchParams();
    sp.set("page", String(p));
    return `?${sp.toString()}`;
  };
  return (
    <div className="flex items-center justify-center gap-2">
      <a
        className="rounded-xl border px-3 py-1 text-sm hover:bg-gray-100 aria-disabled:opacity-50"
        aria-disabled={currentPage <= 1}
        href={currentPage > 1 ? pageHref(currentPage - 1) : undefined}
      >
        Anterior
      </a>
      <span className="text-sm">
        Página {currentPage} de {totalPages}
      </span>
      <a
        className="rounded-xl border px-3 py-1 text-sm hover:bg-gray-100 aria-disabled:opacity-50"
        aria-disabled={currentPage >= totalPages}
        href={currentPage < totalPages ? pageHref(currentPage + 1) : undefined}
      >
        Próxima
      </a>
    </div>
  );
}
