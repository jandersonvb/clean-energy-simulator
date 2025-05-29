"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Trash2, Download, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

type Lead = {
  id: number;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  city: string;
  state: string;
  supply: string;
  bill: string;
  createdAt: string;
};

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };


  // Buscar leads na API
  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/leads");
      const data = await res.json();
      setLeads(data);
    } catch (e) {
      toast.error("Erro ao buscar leads.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // Excluir lead
  const deleteLead = async (id: number) => {
    if (!window.confirm("Excluir este lead?")) return;
    try {
      const res = await fetch(`/api/leads?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      toast.success("Lead excluído!");
      fetchLeads();
    } catch {
      toast.error("Erro ao excluir lead.");
    }
  };

  // Exportar leads como CSV
  const exportLeads = () => {
    window.open("/api/leads/export", "_blank");
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8">
      <Card className="w-full max-w-4xl shadow-2xl rounded-2xl border-0">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Leads Capturados</CardTitle>
          <Button onClick={exportLeads} variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" /> Exportar CSV
          </Button>
          <Button onClick={handleLogout} variant="destructive" className="flex items-center gap-2">
            <LogOut className="w-4 h-4" /> Sair
          </Button>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center text-gray-500 py-8">Carregando leads...</div>
          ) : leads.length === 0 ? (
            <div className="text-center text-gray-400 py-8">Nenhum lead encontrado.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border border-gray-100 bg-white rounded-xl text-sm shadow">
                <thead>
                  <tr className="bg-blue-50">
                    <th className="p-2 text-left">Nome</th>
                    <th className="p-2 text-left">Cidade</th>
                    <th className="p-2 text-left">Estado</th>
                    <th className="p-2 text-left">Conta (R$)</th>
                    <th className="p-2 text-left">Criado em</th>
                    <th className="p-2 text-center"></th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map(lead => (
                    <tr key={lead.id} className="border-b">
                      <td className="p-2">{lead.name}</td>
                      <td className="p-2">{lead.city}</td>
                      <td className="p-2">{lead.state}</td>
                      <td className="p-2">R$ {Number(lead.bill).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</td>
                      <td className="p-2">{new Date(lead.createdAt).toLocaleString("pt-BR")}</td>
                      <td className="p-2 text-center">
                        <Button variant="destructive" size="icon" onClick={() => deleteLead(lead.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
