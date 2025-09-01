import Pagination from "@/components/ui/pagination";
import Search from "@/components/ui/search";
import Table from "@/components/squads/table";
import { CreateSquadButton } from "@/components/squads/buttons";
import { InvoicesTableSkeleton } from "@/components/ui/skeletons";
import { Suspense } from "react";
import { fetchSquads, fetchSquadsPages } from "@/lib/data";

export default async function Page({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const squads = await fetchSquads(query, currentPage);
  const totalPages = await fetchSquadsPages(query);

  return (
    <div className="w-full space-y-6">
      {}
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-black">Squads</h1>
      </div>

      {}
      <div className="flex items-center justify-between gap-2">
        <Search placeholder="Buscar squads..." />
        <CreateSquadButton />
      </div>

      {}
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <div className="mt-6 overflow-hidden rounded-lg border">
          <Table squads={squads} />
        </div>
      </Suspense>

      {}
      <div className="flex w-full justify-center">
        <Pagination totalPages={totalPages} currentPage={currentPage} />
      </div>
    </div>
  );
}
