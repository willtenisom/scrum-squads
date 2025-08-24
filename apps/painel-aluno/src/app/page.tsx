"use client";

import { useState, useRef, FormEvent } from "react";
import DailyForm, { NewEntryData } from "./components/DailyForm";
import EntriesList, { Entry } from "./components/EntriesList";

import type { default as html2pdf } from "html2pdf.js";

export default function DailyScrumPage() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [isExporting, setIsExporting] = useState(false);
  const squadsContainerRef = useRef<HTMLDivElement>(null);

  const [userEmail, setUserEmail] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [pendingEntry, setPendingEntry] = useState<NewEntryData | null>(null);

  const handleAddEntry = (newEntry: NewEntryData) => {
    if (!userEmail) {
      setPendingEntry(newEntry);
      setIsModalOpen(true);
    } else {
      addEntryToList(newEntry);
    }
  };

  const addEntryToList = (entryToAdd: NewEntryData) => {
    setEntries((prevEntries) =>
      [...prevEntries, entryToAdd].sort((a, b) =>
        a.memberName.localeCompare(b.memberName)
      )
    );
  };

  const handleEmailSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailInput = e.currentTarget.elements.namedItem(
      "email"
    ) as HTMLInputElement;
    const email = emailInput.value;

    if (email && email.includes("@")) {
      setUserEmail(email);
      setIsModalOpen(false);

      if (pendingEntry) {
        addEntryToList(pendingEntry);
        setPendingEntry(null);
      }
    } else {
      alert("Por favor, insira um e-mail válido.");
    }
  };

  const handleDeleteEntry = (memberId: string, entryIndex: number) => {
    if (confirm("Tem certeza que deseja remover este registro?")) {
      setEntries((prevEntries) =>
        prevEntries.filter((_entry, index) => index !== entryIndex)
      );
    }
  };

  const handleExportPdf = async () => {
    if (!userEmail) {
      alert(
        "Por favor, adicione pelo menos um registro e informe seu e-mail antes de exportar."
      );
      return;
    }
    if (!squadsContainerRef.current || entries.length === 0) {
      alert("Adicione registros antes de exportar.");
      return;
    }
    setIsExporting(true);
    try {
      const html2pdf = (await import("html2pdf.js")).default;
      const config = {
        margin: 10,
        filename: `daily-scrum-${new Date().toLocaleDateString("pt-BR")}.pdf`,
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };
      await html2pdf().from(squadsContainerRef.current).set(config).save();
      alert("PDF gerado com sucesso!");
    } catch (error) {
      console.error("Erro ao gerar o PDF:", error);
      alert("Ocorreu um erro ao gerar o PDF.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <>
      {}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Informe seu e-mail para continuar
            </h2>
            <p className="text-gray-600 mb-6">
              Este e-mail será usado para o envio do relatório.
            </p>
            <form onSubmit={handleEmailSubmit}>
              <label
                htmlFor="email"
                className="font-semibold text-sm text-gray-700"
              >
                Seu e-mail
              </label>
              <input
                type="email"
                name="email"
                required
                className="p-3 mt-2 border border-gray-300 rounded-lg w-full text-base focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="email"
              />
              <div className="flex justify-end mt-6">
                <button
                  type="submit"
                  className="bg-primary text-white py-2 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-sm"
                >
                  Salvar e Continuar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- CONTEÚDO PRINCIPAL DA PÁGINA --- */}
      <main className="p-4 sm:p-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <div className="flex justify-between items-start mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-primary">
                📋 Daily Scrum - Quadro por Squads
              </h1>
              {}
              {userEmail && (
                <div className="text-right text-sm">
                  <span className="font-semibold text-gray-500">
                    Relatório de:
                  </span>
                  <p className="text-gray-800">{userEmail}</p>
                </div>
              )}
            </div>

            <DailyForm onAddEntry={handleAddEntry} />

            <div className="flex justify-center my-6">
              <button
                onClick={handleExportPdf}
                disabled={isExporting || entries.length === 0}
                className="bg-success text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed shadow-sm"
              >
                {isExporting ? "Gerando PDF..." : "Exportar Registros como PDF"}
              </button>
            </div>

            <div className="border-t border-gray-200 my-8"></div>

            <div ref={squadsContainerRef}>
              <EntriesList
                entries={entries}
                onDeleteEntry={handleDeleteEntry}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
