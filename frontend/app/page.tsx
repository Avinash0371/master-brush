import { HeroSection } from '../components/home/hero';
import { ProcessSteps } from '../components/home/process-steps';
import { ServiceShowcase } from '../components/home/service-showcase';
import { Testimonials } from '../components/home/testimonials';
import { FaqTrust } from '../components/home/faq-trust';
import { ProjectGallery } from '../components/home/project-gallery';
import { Footer } from '../components/footer';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <ProcessSteps />
      <ServiceShowcase />
      <ProjectGallery />
      <Testimonials />
      <FaqTrust />
      <Footer />
    </main>
  );
}
