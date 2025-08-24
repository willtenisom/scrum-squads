"use client";

import { squadNames } from "../lib/data";

export type Entry = {
  memberId: string;
  memberName: string;
  squadId: string;
  doneMessage: string;
  blockerMessage: string;
};

interface EntriesListProps {
  entries: Entry[];
  onDeleteEntry: (memberId: string, entryIndex: number) => void;
}
const squadHeaderStyles: Record<string, string> = {
  "1": "bg-squad1 text-gray-800",
  "2": "bg-squad2 text-[#0369a1]",
  "3": "bg-squad3 text-[#047857]",
  "4": "bg-squad4 text-[#6d28d9]",
  "5": "bg-squad5 text-[#b91c1c]",
};

export default function EntriesList({
  entries,
  onDeleteEntry,
}: EntriesListProps) {
  const entriesBySquad = entries.reduce(
    (acc, entry) => {
      (acc[entry.squadId] = acc[entry.squadId] || []).push(entry);
      return acc;
    },
    {} as Record<string, Entry[]>
  );

  if (entries.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 italic">
        Nenhum registro adicionado ainda
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {Object.entries(entriesBySquad).map(([squadId, squadEntries]) => (
        <div key={squadId} className="rounded-lg overflow-hidden">
          <div
            className={`p-4 font-semibold flex items-center gap-2 ${squadHeaderStyles[squadId] || "bg-gray-200"}`}
          >
            <span>👥</span>
            <span>{squadNames[squadId]}</span>
          </div>
          <div className="grid gap-4 mt-4">
            {squadEntries.map((entry, index) => (
              <div
                key={`${entry.memberId}-${index}`}
                className="relative p-4 bg-gray-50 border-l-4 border-primary rounded-r-lg shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="font-semibold mb-2 text-gray-800">
                  {entry.memberName}
                </div>
                <div className="text-success mb-1 text-sm">
                  {entry.doneMessage}
                </div>
                <div
                  className={`text-sm ${entry.blockerMessage.includes("Impedimento") ? "text-danger font-medium" : "text-gray-600"}`}
                >
                  {entry.blockerMessage}
                </div>
                <button
                  onClick={() => onDeleteEntry(entry.memberId, index)}
                  className="absolute top-3 right-3 text-red-500 hover:text-red-700 p-1 text-lg rounded-full hover:bg-red-100 transition-colors"
                  aria-label="Deletar registro"
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
