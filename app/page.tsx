import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";


export default function Home() {
  return (
    <div className="landing-page">
      <header className="bg-gray-800 text-white py-2 flex flex-col items-center">
        <Image
          src="/logo.png"
          alt="Simulador de Energia Limpa Logo"
          width={150}
          height={150}
          className="mb-4"
          priority
        />
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-center">
          Simulador de Energia Limpa
        </h1>
        <p className="leading-7 text-lg text-center mt-2">
          Capacitando soluções de energia sustentável para um futuro melhor.
        </p>
      </header>
      <main className="main-content container mx-auto px-4 py-4 min-h-screen flex flex-col justify-center">
        <section className="about mb-12">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight text-gray-800">
            Sobre Nós
          </h2>
          <p className="leading-7 mt-4 text-gray-600">
            No Simulador de Energia Limpa, fornecemos ferramentas de ponta para ajudar
            indivíduos e organizações a explorar opções de energia sustentável.
          </p>
        </section>
        <section className="features mb-12">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight text-gray-800">
            Funcionalidades
          </h2>
          <ul className="mt-4 space-y-2 text-gray-600">
            <li className="flex items-center">
              <span className="mr-2">✔</span> Simule consumo e economia de energia
            </li>
            <li className="flex items-center">
              <span className="mr-2">✔</span> Explore fontes de energia renovável
            </li>
            <li className="flex items-center">
              <span className="mr-2">✔</span> Otimize a eficiência energética
            </li>
          </ul>
        </section>
        <section className="cta text-center">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight text-gray-800">
            Comece Agora
          </h2>
          <p className="leading-7 mt-4 text-gray-600">
            Junte-se a nós na construção de um futuro mais limpo e verde. Inicie sua simulação
            hoje mesmo!
          </p>
          <Link href="/simulation">
            <Button variant="default" className="mt-6">
              Começar Agora
            </Button>
          </Link>
        </section>
      </main>
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 Simulador de Energia Limpa. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div >
  );
}
