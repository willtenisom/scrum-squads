export function CardSkeleton() {
  return (
    <div className="rounded-xl bg-muted p-2 shadow-sm">
      <div className="flex p-4">
        <div className="h-5 w-5 bg-muted-foreground/20 rounded animate-pulse" />
        <div className="ml-2 h-5 w-24 bg-muted-foreground/20 rounded animate-pulse" />
      </div>
      <div className="truncate rounded-xl bg-background px-4 py-8 animate-pulse">
        <div className="h-7 w-full bg-muted-foreground/20 rounded" />
      </div>
    </div>
  );
}

export function TableRowSkeleton() {
  return (
    <tr className="w-full border-b border-border last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
      <td className="relative overflow-hidden whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex items-center gap-3">
          <div className="h-6 w-24 bg-muted-foreground/20 rounded animate-pulse" />
        </div>
      </td>
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-32 bg-muted-foreground/20 rounded animate-pulse" />
      </td>
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 bg-muted-foreground/20 rounded animate-pulse" />
      </td>
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 bg-muted-foreground/20 rounded animate-pulse" />
      </td>
      <td className="whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex justify-end gap-3">
          <div className="h-8 w-8 bg-muted-foreground/20 rounded animate-pulse" />
          <div className="h-8 w-8 bg-muted-foreground/20 rounded animate-pulse" />
        </div>
      </td>
    </tr>
  );
}

export function InvoicesTableSkeleton() {
  return (
    <div className="rounded-md border">
      <table className="w-full border-collapse text-sm">
        <tbody>
          {Array.from({ length: 5 }).map((_, i) => (
            <TableRowSkeleton key={i} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
