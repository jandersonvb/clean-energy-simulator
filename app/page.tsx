import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";


export default function Home() {
  return (
    <div className="landing-page">
      <header className="bg-green-600 text-white py-2 flex flex-col items-center">
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
        <section className="about mb-8 flex justify-center">

          <div className="w-full max-w-md">
            <div className="scroll-m-20 text-2xl font-semibold tracking-tight text-gray-800 text-center">
              Sobre Nós
            </div>
            <div className="mt-4 p-6 bg-white shadow rounded-lg text-gray-600 text-center">
              No Simulador de Energia Limpa, fornecemos ferramentas de ponta para ajudar
              indivíduos e organizações a explorar opções de energia sustentável.
            </div>
          </div>
        </section>
        <section className="features mb-12 text-center">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight text-gray-800">
            Funcionalidades
          </h2>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="card bg-white shadow rounded-lg p-6">
              <div className="icon mb-4 text-green-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-8 h-8 mx-auto"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Simule consumo e economia de energia
              </h3>
              <p className="text-gray-600">
                Utilize nossas ferramentas para calcular o consumo e identificar oportunidades de economia.
              </p>
            </div>
            <div className="card bg-white shadow rounded-lg p-6">
              <div className="icon mb-4 text-green-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-8 h-8 mx-auto"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 2a10 10 0 0110 10c0 5.523-4.477 10-10 10S2 17.523 2 12A10 10 0 0112 2zm0 4a6 6 0 100 12 6 6 0 000-12zm0 2a4 4 0 110 8 4 4 0 010-8z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Explore fontes de energia renovável
              </h3>
              <p className="text-gray-600">
                Descubra opções de energia limpa e sustentável para sua casa ou empresa.
              </p>
            </div>
            <div className="card bg-white shadow rounded-lg p-6">
              <div className="icon mb-4 text-green-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-8 h-8 mx-auto"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v3m0 12v3m9-9h-3m-12 0H3m15.364 6.364l-2.121-2.121m-8.486 0l-2.121 2.121m12.728-12.728l-2.121 2.121m-8.486 0L6.636 6.636"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Otimize a eficiência energética
              </h3>
              <p className="text-gray-600">
                Aprenda como melhorar a eficiência energética e reduzir custos.
              </p>
            </div>
          </div>
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
      <footer className="bg-green-600 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 Simulador de Energia Limpa. Todos os direitos reservados.</p>
          <Link href="/admin/login" className="text-xs text-white hover:text-green-200 mt-2 inline-block">
            Área Administrativa
          </Link>

        </div>
      </footer>
    </div >
  );
}
