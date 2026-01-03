import Navigation from './components/Navigation';
import Hero from './components/Hero';
import FeaturedProperties from './components/FeaturedProperties';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-white">
      <Navigation />
      <Hero />
      <FeaturedProperties />
      <Services />
      <Testimonials />
      <ContactForm />
      <Footer />
    </div>
  );
}

export default App;
