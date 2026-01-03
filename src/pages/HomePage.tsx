import Hero from '../components/Hero';
import FeaturedProperties from '../components/FeaturedProperties';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';
import ContactForm from '../components/ContactForm';

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProperties />
      <Services />
      <Testimonials />
      <ContactForm />
    </>
  );
}
