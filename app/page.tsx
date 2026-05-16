import { Header } from "@/components/sections/header"
import { Hero } from "@/components/sections/hero"
import { About } from "@/components/sections/about"
import { Services } from "@/components/sections/services"
import { SocialProof } from "@/components/sections/social-proof"
import { Showcase } from "@/components/sections/showcase"
import { Contact } from "@/components/sections/contact"
import { WhatsAppFloat } from "@/components/ui/whatsapp-float"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-neon-cyan selection:text-black">
      <Header />
      <Hero />
      <About />
      <Services />
      <SocialProof />
      <Showcase />
      <Contact />
      <WhatsAppFloat />
    </main>
  );
}
