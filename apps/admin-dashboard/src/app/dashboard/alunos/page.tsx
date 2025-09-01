import Pagination from "@/components/ui/pagination";
import Search from "@/components/ui/search";
import Table from "@/components/alunos/table";
import { CreateAluno } from "@/components/alunos/buttons";
import { lusitana } from "@/components/ui/fonts";
import { InvoicesTableSkeleton } from "@/components/ui/skeletons";
import { Suspense } from "react";
import { fetchAlunos, fetchAlunosPages } from "@/lib/data";

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

  const alunos = await fetchAlunos(query, currentPage);
  const totalPages = await fetchAlunosPages(query);

  return (
    <div className="w-full space-y-6">
      {}
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-black">Alunos</h1>
      </div>

      {}
      <div className="flex items-center justify-between gap-2">
        <Search placeholder="Buscar alunos..." />
        <CreateAluno />
      </div>

      {}
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <div className="mt-6">
          <Table alunos={alunos} />
        </div>
      </Suspense>

      {}
      <div className="flex w-full justify-center">
        <Pagination totalPages={totalPages} currentPage={currentPage} />
      </div>
    </div>
  );
}
