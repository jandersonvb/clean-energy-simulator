"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, "Nome é obrigatório"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().min(10, "Telefone é obrigatório"),
  cpf: z.string().min(11, "CPF é obrigatório"),
  city: z.string().min(2, "Cidade é obrigatória"),
  state: z.string().length(2, "Estado deve ter 2 letras"),
  supply: z.enum(["MONOPHASIC", "BIPHASIC", "TRIPHASIC"]),
  bill: z.number().min(1, "Conta deve ser positiva"),
});
type FormType = z.infer<typeof formSchema>;

export default function SimulationPage() {
  const [result, setResult] = useState<null | {
    years: number[];
    saved: number[];
    original: number[];
  }>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState,
    setValue,
    reset,
  } = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: { supply: "MONOPHASIC" },
  });

  const onSubmit = async (data: FormType) => {
    setApiError(null);
    setLoading(true);

    // Calcula economia
    const discount = 0.25;
    const yearsArr = [1, 3, 5];
    const bill = Number(data.bill);

    const original = yearsArr.map((years) => bill * 12 * years);
    const saved = original.map((val) => val * discount);

    // Envia para a API
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error || "Failed to save lead.");
      }
      setSuccess(true);
      setResult({ years: yearsArr, saved, original });
      reset();
      toast.success("Lead salvo com sucesso!");
    } catch (err: unknown) {
      setApiError((err as Error).message);
      setResult(null);
      toast.error(`Erro ao salvar lead: ${(err instanceof Error ? err.message : "Erro desconhecido")}`);
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <Card className="w-full max-w-xl shadow-2xl rounded-2xl border-0">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold tracking-tight">
            Simulação de Economia de Energia
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo</Label>
              <Input {...register("name")} id="name" placeholder="Seu nome" />
              <span className="text-xs text-red-500">{formState.errors.name?.message}</span>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input {...register("email")} id="email" placeholder="voce@email.com" />
              <span className="text-xs text-red-500">{formState.errors.email?.message}</span>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input {...register("phone")} id="phone" placeholder="11999999999" />
              <span className="text-xs text-red-500">{formState.errors.phone?.message}</span>
            </div>
            <div className="space-y-2">
              <Label htmlFor="cpf">CPF</Label>
              <Input {...register("cpf")} id="cpf" placeholder="12345678900" />
              <span className="text-xs text-red-500">{formState.errors.cpf?.message}</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">Cidade</Label>
                <Input {...register("city")} id="city" placeholder="Cidade" />
                <span className="text-xs text-red-500">{formState.errors.city?.message}</span>
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">Estado (UF)</Label>
                <Input {...register("state")} id="state" maxLength={2} placeholder="MG" />
                <span className="text-xs text-red-500">{formState.errors.state?.message}</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="supply">Tipo de Fornecimento</Label>
              <Select
                value={undefined}
                defaultValue="MONOPHASIC"
                onValueChange={(value) => setValue("supply", value as FormType["supply"])}
              >
                <SelectTrigger id="supply">
                  <SelectValue placeholder="Selecione o tipo de fornecimento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MONOPHASIC">Monofásico</SelectItem>
                  <SelectItem value="BIPHASIC">Bifásico</SelectItem>
                  <SelectItem value="TRIPHASIC">Trifásico</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bill">Conta Mensal (R$)</Label>
              <Input
                {...register("bill", { valueAsNumber: true })}
                id="bill"
                type="number"
                step="0.01"
                placeholder="200.00"
              />
              <span className="text-xs text-red-500">
                {formState.errors.bill?.message}
              </span>
            </div>
            <Button
              type="submit"
              className="w-full mt-4 bg-green-600 text-white hover:bg-green-700"
              disabled={loading}
            >
              {loading ? "Calculando..." : "Simular e Economizar"}
            </Button>
          </form>

          {apiError && (
            <div className="mt-4 text-red-700 bg-red-100 border border-red-300 rounded p-2 text-center">
              {apiError}
            </div>
          )}

          {result && (
            <div>
              <Button onClick={() => setSuccess(true)} className="w-full mt-4">
                Ver Economia Estimada
              </Button>
              {success && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50">
                  <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
                    <h2 className="font-semibold mb-2 text-lg text-center">Economia Estimada</h2>
                    <ul className="space-y-1 text-center">
                      {result.years.map((y, i) => (
                        <li key={y}>
                          <b>{y} ano{y > 1 && "s"}:</b> Economize <b>R$ {result.saved[i].toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</b> <span className="text-gray-600">(de R$ {result.original[i].toLocaleString("pt-BR", { minimumFractionDigits: 2 })})</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-2 text-center">Nossa equipe entrará em contato com você em breve com sua proposta!</p>
                    <Button onClick={() => setSuccess(false)} className="w-full mt-4  bg-green-600 text-white hover:bg-green-700">
                      Fechar
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
          {success && (
            <div className="text-green-700 text-center mt-2 font-semibold">Lead salvo com sucesso!</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
