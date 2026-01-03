import { Home, DollarSign, FileCheck, Users, Zap, Shield } from 'lucide-react';

const services = [
  {
    icon: Home,
    title: 'Property Search',
    description: 'Advanced search tools to find properties matching your exact requirements and preferences.'
  },
  {
    icon: DollarSign,
    title: 'Investment Consulting',
    description: 'Expert guidance on real estate investment opportunities and market analysis.'
  },
  {
    icon: FileCheck,
    title: 'Legal Support',
    description: 'Complete documentation and legal assistance throughout the transaction process.'
  },
  {
    icon: Users,
    title: 'Personal Agents',
    description: 'Dedicated agents to guide you through every step of your property journey.'
  },
  {
    icon: Zap,
    title: 'Fast Closing',
    description: 'Streamlined processes designed to close transactions quickly and efficiently.'
  },
  {
    icon: Shield,
    title: 'Secure Transactions',
    description: 'Fully protected transactions with escrow services and comprehensive safeguards.'
  }
];

export default function Services() {
  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Comprehensive real estate solutions tailored to meet your unique needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                className="p-8 rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="bg-blue-50 w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-100 transition">
                  <IconComponent className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
