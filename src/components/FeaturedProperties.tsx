import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bed, Bath, MapPin, Heart } from 'lucide-react';
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

export default function FeaturedProperties() {
  const navigate = useNavigate();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .limit(6);

      if (error) throw error;
      if (data && data.length === 0) {
        setProperties(sampleProperties);
      } else {
        setProperties(data || []);
      }
    } catch {
      setProperties(sampleProperties);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  const sampleProperties: Property[] = [
    {
      id: '1',
      title: 'Modern Downtown Penthouse',
      description: 'Stunning 3-bedroom penthouse with panoramic city views and state-of-the-art amenities.',
      price: 2500000,
      location: 'Downtown District',
      bedrooms: 3,
      bathrooms: 3,
      area: '2,500 sqft',
      image_url: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '2',
      title: 'Waterfront Luxury Villa',
      description: 'Exclusive beachfront property with private access, infinity pool, and sunset views.',
      price: 3200000,
      location: 'Oceanside',
      bedrooms: 4,
      bathrooms: 4,
      area: '3,200 sqft',
      image_url: 'https://images.pexels.com/photos/1797393/pexels-photo-1797393.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '3',
      title: 'Contemporary Garden Estate',
      description: 'Sophisticated 4-bedroom home nestled in lush gardens with resort-like amenities.',
      price: 1800000,
      location: 'Suburban Haven',
      bedrooms: 4,
      bathrooms: 3,
      area: '3,500 sqft',
      image_url: 'https://images.pexels.com/photos/1722175/pexels-photo-1722175.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '4',
      title: 'Urban Loft Development',
      description: 'Trendy 2-bedroom loft in vibrant neighborhood with modern finishes and high ceilings.',
      price: 950000,
      location: 'Arts District',
      bedrooms: 2,
      bathrooms: 2,
      area: '1,600 sqft',
      image_url: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '5',
      title: 'Historic Manor House',
      description: 'Restored Victorian mansion combining classic architecture with modern conveniences.',
      price: 2100000,
      location: 'Heritage District',
      bedrooms: 5,
      bathrooms: 4,
      area: '4,200 sqft',
      image_url: 'https://images.pexels.com/photos/2507007/pexels-photo-2507007.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '6',
      title: 'Mountain View Retreat',
      description: 'Serene alpine property with breathtaking views, perfect for peaceful getaway.',
      price: 1500000,
      location: 'Mountain Ridge',
      bedrooms: 3,
      bathrooms: 3,
      area: '2,800 sqft',
      image_url: 'https://images.pexels.com/photos/3617457/pexels-photo-3617457.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];

  if (loading) {
    return (
      <section id="properties" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900">Featured Properties</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-xl h-96 animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="properties" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Properties</h2>
          <p className="text-gray-600 text-lg">Discover our handpicked selection of premium properties</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map(property => (
            <div
              key={property.id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={property.image_url}
                  alt={property.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <button
                  onClick={() => toggleFavorite(property.id)}
                  className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition"
                >
                  <Heart
                    className={`w-6 h-6 ${
                      favorites.includes(property.id)
                        ? 'fill-red-500 text-red-500'
                        : 'text-gray-600'
                    }`}
                  />
                </button>
                <div className="absolute top-4 left-4 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold">
                  ${property.price.toLocaleString()}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{property.title}</h3>
                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <MapPin className="w-4 h-4" />
                  <span>{property.location}</span>
                </div>
                <p className="text-gray-600 text-sm mb-4">{property.description}</p>

                <div className="grid grid-cols-3 gap-4 py-4 border-y border-gray-100">
                  <div className="text-center">
                    <Bed className="w-5 h-5 mx-auto text-gray-400 mb-1" />
                    <span className="text-gray-900 font-semibold">{property.bedrooms}</span>
                    <p className="text-xs text-gray-500">Bedrooms</p>
                  </div>
                  <div className="text-center">
                    <Bath className="w-5 h-5 mx-auto text-gray-400 mb-1" />
                    <span className="text-gray-900 font-semibold">{property.bathrooms}</span>
                    <p className="text-xs text-gray-500">Bathrooms</p>
                  </div>
                  <div className="text-center">
                    <span className="text-gray-900 font-semibold">{property.area}</span>
                    <p className="text-xs text-gray-500">Area</p>
                  </div>
                </div>

                <button
                  onClick={() => navigate(`/property/${property.id}`)}
                  className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
