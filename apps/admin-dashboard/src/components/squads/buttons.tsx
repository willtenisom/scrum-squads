"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CreateSquadButton() {
  return (
    <Button asChild>
      <Link href="/dashboard/squads/criar">+ Criar Squad</Link>
    </Button>
  );
}

export function EditSquadButton({ id }: { id: string }) {
  return (
    <Button asChild variant="outline">
      <Link href={`/dashboard/squads/${id}/editar`}>Editar</Link>
    </Button>
  );
}
