import Pagination from "@/components/ui/pagination";
import Search from "@/components/ui/search";
import Table from "@/components/turmas/table";
import { CreateTurma } from "@/components/turmas/buttons";

import { InvoicesTableSkeleton } from "@/components/ui/skeletons";
import { Suspense } from "react";
import { fetchTurmas, fetchTurmasPages } from "@/lib/data";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const turmas = await fetchTurmas(query, currentPage);
  const totalPages = await fetchTurmasPages(query);

  return (
    <div className="w-full space-y-6">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-black">Turmas</h1>
      </div>

      <div className="flex items-center justify-between gap-2">
        <Search placeholder="Buscar turmas..." />
        <CreateTurma />
      </div>

      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <div className="mt-6">
          <Table turmas={turmas} />
        </div>
      </Suspense>

      <div className="flex w-full justify-center">
        <Pagination totalPages={totalPages} currentPage={currentPage} />
      </div>
    </div>
  );
}
