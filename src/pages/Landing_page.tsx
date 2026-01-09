// Componentes
import { Header, Hero, Gallery, About, Services, Contact, Footer } from "@/components/landing";

export const Landing_page = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Gallery />
        <About />
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};