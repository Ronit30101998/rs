import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Bed, Bath, MapPin, Home as HomeIcon, Heart, Phone, Mail } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  image_url: string;
}

export default function PropertyDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    fetchProperty();
  }, [id]);

  const fetchProperty = async () => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setProperty(data);
      } else {
        setProperty(getSampleProperty(id || ''));
      }
    } catch {
      setProperty(getSampleProperty(id || ''));
    } finally {
      setLoading(false);
    }
  };

  const getSampleProperty = (propertyId: string): Property => {
    const sampleProperties: { [key: string]: Property } = {
      '1': {
        id: '1',
        title: 'Modern Downtown Penthouse',
        description: 'Stunning 3-bedroom penthouse with panoramic city views and state-of-the-art amenities. This luxurious property features floor-to-ceiling windows, a gourmet kitchen with premium appliances, spa-like bathrooms, and a private terrace perfect for entertaining. Located in the heart of the city with easy access to fine dining, shopping, and entertainment.',
        price: 2500000,
        location: 'Downtown District',
        bedrooms: 3,
        bathrooms: 3,
        area: '2,500 sqft',
        image_url: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      '2': {
        id: '2',
        title: 'Waterfront Luxury Villa',
        description: 'Exclusive beachfront property with private access, infinity pool, and sunset views. This magnificent villa offers direct beach access, spacious outdoor living areas, and breathtaking ocean views from every room. Features include a chef\'s kitchen, wine cellar, home theater, and a master suite with a private balcony overlooking the water.',
        price: 3200000,
        location: 'Oceanside',
        bedrooms: 4,
        bathrooms: 4,
        area: '3,200 sqft',
        image_url: 'https://images.pexels.com/photos/1797393/pexels-photo-1797393.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      '3': {
        id: '3',
        title: 'Contemporary Garden Estate',
        description: 'Sophisticated 4-bedroom home nestled in lush gardens with resort-like amenities. This stunning estate features expansive living spaces, high ceilings, and walls of glass that blur the line between indoor and outdoor living. Enjoy the heated pool, outdoor kitchen, and beautifully landscaped gardens that provide complete privacy.',
        price: 1800000,
        location: 'Suburban Haven',
        bedrooms: 4,
        bathrooms: 3,
        area: '3,500 sqft',
        image_url: 'https://images.pexels.com/photos/1722175/pexels-photo-1722175.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      '4': {
        id: '4',
        title: 'Urban Loft Development',
        description: 'Trendy 2-bedroom loft in vibrant neighborhood with modern finishes and high ceilings. This open-concept space features exposed brick, polished concrete floors, and oversized windows that flood the space with natural light. The building offers amenities including a fitness center, rooftop deck, and secure parking.',
        price: 950000,
        location: 'Arts District',
        bedrooms: 2,
        bathrooms: 2,
        area: '1,600 sqft',
        image_url: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      '5': {
        id: '5',
        title: 'Historic Manor House',
        description: 'Restored Victorian mansion combining classic architecture with modern conveniences. This meticulously preserved home features original hardwood floors, ornate moldings, and period details throughout. Updated with modern systems while maintaining its historic charm, including a newly renovated kitchen and spa bathrooms.',
        price: 2100000,
        location: 'Heritage District',
        bedrooms: 5,
        bathrooms: 4,
        area: '4,200 sqft',
        image_url: 'https://images.pexels.com/photos/2507007/pexels-photo-2507007.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      '6': {
        id: '6',
        title: 'Mountain View Retreat',
        description: 'Serene alpine property with breathtaking views, perfect for peaceful getaway. This mountain retreat offers panoramic vistas, a stone fireplace, vaulted ceilings, and a wrap-around deck. The perfect blend of rustic charm and modern comfort, with hiking trails right outside your door.',
        price: 1500000,
        location: 'Mountain Ridge',
        bedrooms: 3,
        bathrooms: 3,
        area: '2,800 sqft',
        image_url: 'https://images.pexels.com/photos/3617457/pexels-photo-3617457.jpeg?auto=compress&cs=tinysrgb&w=800'
      }
    };

    return sampleProperties[propertyId] || sampleProperties['1'];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-96 bg-gray-200 rounded-xl mb-8"></div>
            <div className="h-8 bg-gray-200 rounded w-2/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-8"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-white pt-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Property not found</h1>
          <button
            onClick={() => navigate('/')}
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Return to home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Properties
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="relative h-96 lg:h-[600px] rounded-xl overflow-hidden mb-6">
              <img
                src={property.image_url}
                alt={property.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="absolute top-4 right-4 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition"
              >
                <Heart
                  className={`w-6 h-6 ${
                    isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'
                  }`}
                />
              </button>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">{property.title}</h1>

            <div className="flex items-center gap-2 text-gray-600 mb-6">
              <MapPin className="w-5 h-5" />
              <span className="text-lg">{property.location}</span>
            </div>

            <div className="grid grid-cols-3 gap-6 py-6 border-y border-gray-200 mb-8">
              <div className="text-center">
                <Bed className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                <span className="text-2xl font-bold text-gray-900">{property.bedrooms}</span>
                <p className="text-gray-600">Bedrooms</p>
              </div>
              <div className="text-center">
                <Bath className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                <span className="text-2xl font-bold text-gray-900">{property.bathrooms}</span>
                <p className="text-gray-600">Bathrooms</p>
              </div>
              <div className="text-center">
                <HomeIcon className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                <span className="text-2xl font-bold text-gray-900">{property.area}</span>
                <p className="text-gray-600">Area</p>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Property</h2>
              <p className="text-gray-700 leading-relaxed text-lg">{property.description}</p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <li className="flex items-center gap-2 text-gray-700">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  Premium finishes throughout
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  Modern kitchen appliances
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  Energy-efficient systems
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  Secure parking available
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  Smart home technology
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  Close to amenities
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-xl p-8 sticky top-24">
              <div className="text-3xl font-bold text-blue-600 mb-6">
                ${property.price.toLocaleString()}
              </div>

              <div className="space-y-4 mb-6">
                <a
                  href="tel:+15551234567"
                  className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition"
                >
                  <Phone className="w-5 h-5" />
                  <span>+1 (555) 123-4567</span>
                </a>
                <a
                  href="mailto:hello@luxeproperties.com"
                  className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition"
                >
                  <Mail className="w-5 h-5" />
                  <span>hello@luxeproperties.com</span>
                </a>
              </div>

              <button
                onClick={() => navigate('/#contact')}
                className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition mb-3"
              >
                Request Information
              </button>

              <button className="w-full border-2 border-gray-300 text-gray-700 py-4 rounded-lg font-semibold hover:border-blue-600 hover:text-blue-600 transition">
                Schedule Tour
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
