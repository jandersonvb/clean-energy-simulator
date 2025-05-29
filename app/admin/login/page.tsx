"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Senha inválida"),
});
type FormType = z.infer<typeof formSchema>;

export default function AdminLoginPage() {
  const router = useRouter();
  const { register, handleSubmit, formState } = useForm<FormType>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormType) => {
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      toast.error("Credenciais inválidas!");
      return;
    }
    toast.success("Login realizado!");
    router.push("/admin/leads");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <Card className="w-full max-w-md shadow-2xl rounded-2xl border-0">
        <CardHeader>
          <div className="flex flex-col items-center">
            <img src="/logo.png" alt="Logo" className="w-36 h-36 mb-4" />
            <CardTitle className="text-center text-2xl font-bold">Admin Login</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label htmlFor="email" className="mb-2">E-mail</Label>
              <Input {...register("email")} id="email" placeholder="admin@clean.com" />
              <span className="text-xs text-red-500">{formState.errors.email?.message}</span>
            </div>
            <div>
              <Label htmlFor="password" className="mb-2">Senha</Label>
              <Input {...register("password")} id="password" type="password" placeholder="Sua senha" />
              <span className="text-xs text-red-500">{formState.errors.password?.message}</span>
            </div>
            <Button type="submit" className="w-full mt-4  bg-green-600 text-white hover:bg-green-700">Entrar</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
