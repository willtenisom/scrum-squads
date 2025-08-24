"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { squadNames, squadsData, Member } from "../lib/data";

export type NewEntryData = {
  squadId: string;
  memberId: string;
  memberName: string;
  doneMessage: string;
  blockerMessage: string;
};

interface DailyFormProps {
  onAddEntry: (entry: NewEntryData) => void;
}

export default function DailyForm({ onAddEntry }: DailyFormProps) {
  const [selectedSquad, setSelectedSquad] = useState<string>("");
  const [selectedMember, setSelectedMember] = useState<string>("");
  const [task, setTask] = useState<string>("");
  const [module, setModule] = useState<string>("");
  const [section, setSection] = useState<string>("");
  const [item, setItem] = useState<string>("");
  const [blocker, setBlocker] = useState<string>("");

  const handleSquadChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedSquad(e.target.value);
    setSelectedMember("");
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const doneMessageParts = [];
    if (task) doneMessageParts.push(task);
    if (module) doneMessageParts.push(`Módulo ${module}`);
    if (section) doneMessageParts.push(`Seção ${section}`);
    if (item) doneMessageParts.push(`Item ${item}`);
    const doneMessage = doneMessageParts.join(" - ");

    if (!doneMessage) {
      alert("É necessário descrever a tarefa ou informar módulo e seção.");
      return;
    }

    const memberName =
      squadsData[selectedSquad]?.find((m) => m.id === selectedMember)?.nome ||
      "";

    onAddEntry({
      squadId: selectedSquad,
      memberId: selectedMember,
      memberName,
      doneMessage: `✅ Feito: ${doneMessage}`,
      blockerMessage: blocker
        ? `🚧 Impedimento: ${blocker}`
        : "✔️ Sem bloqueios",
    });

    setTask("");
    setModule("");
    setSection("");
    setItem("");
    setBlocker("");
    setSelectedMember("");

    document.getElementById("memberSelect")?.focus();
  };

  return (
    <div className="mb-8">
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end"
      >
        {/* Squad Select */}
        <div className="flex flex-col">
          <label
            htmlFor="squadSelect"
            className="mb-2 font-semibold text-sm text-gray-700"
          >
            Squad
          </label>
          <select
            id="squadSelect"
            value={selectedSquad}
            onChange={handleSquadChange}
            required
            className="p-3 border border-gray-300 rounded-lg w-full text-base focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="" disabled>
              Selecione o Squad
            </option>
            {Object.entries(squadNames).map(([id, name]) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </div>

        {/* Member Select */}
        <div className="flex flex-col">
          <label
            htmlFor="memberSelect"
            className="mb-2 font-semibold text-sm text-gray-700"
          >
            Membro
          </label>
          <select
            id="memberSelect"
            value={selectedMember}
            onChange={(e) => setSelectedMember(e.target.value)}
            required
            disabled={!selectedSquad}
            className="p-3 border border-gray-300 rounded-lg w-full text-base disabled:bg-gray-200 disabled:cursor-not-allowed focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="" disabled>
              Selecione um membro
            </option>
            {selectedSquad &&
              squadsData[selectedSquad].map((member: Member) => (
                <option key={member.id} value={member.id}>
                  {member.nome}
                </option>
              ))}
          </select>
        </div>

        {/* Inputs de Texto */}
        <div className="flex flex-col">
          <label
            htmlFor="doneInput"
            className="mb-2 font-semibold text-sm text-gray-700"
          >
            O que fez hoje?
          </label>
          <input
            type="text"
            id="doneInput"
            placeholder="Tarefas concluídas"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg w-full text-base focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="blockerInput"
            className="mb-2 font-semibold text-sm text-gray-700"
          >
            Impedimentos
          </label>
          <input
            type="text"
            id="blockerInput"
            placeholder="Problemas (opcional)"
            value={blocker}
            onChange={(e) => setBlocker(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg w-full text-base focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="moduleInput"
            className="mb-2 font-semibold text-sm text-gray-700"
          >
            Módulo
          </label>
          <input
            type="text"
            id="moduleInput"
            placeholder="Módulo"
            value={module}
            onChange={(e) => setModule(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg w-full text-base focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="sectionInput"
            className="mb-2 font-semibold text-sm text-gray-700"
          >
            Seção
          </label>
          <input
            type="number"
            id="sectionInput"
            placeholder="Seção"
            value={section}
            onChange={(e) => setSection(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg w-full text-base focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="itemInput"
            className="mb-2 font-semibold text-sm text-gray-700"
          >
            Item
          </label>
          <input
            type="number"
            id="itemInput"
            placeholder="Item (opcional)"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg w-full text-base focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {/* Botão Adicionar */}
        <button
          type="submit"
          className="bg-primary text-white p-3 rounded-lg font-semibold h-[50px] hover:bg-blue-700 transition-colors w-full shadow-sm"
        >
          + Adicionar Registro
        </button>
      </form>
    </div>
  );
}
