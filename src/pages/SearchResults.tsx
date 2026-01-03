import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Bed, Bath, MapPin, Heart, Search } from 'lucide-react';
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

export default function SearchResults() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchInput, setSearchInput] = useState(query);

  useEffect(() => {
    if (query) {
      searchProperties(query);
    }
  }, [query]);

  const searchProperties = async (searchQuery: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .or(`title.ilike.%${searchQuery}%,location.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);

      if (error) throw error;

      if (data && data.length > 0) {
        setProperties(data);
      } else {
        const filtered = sampleProperties.filter(p =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setProperties(filtered);
      }
    } catch {
      const filtered = sampleProperties.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setProperties(filtered);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchInput)}`);
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

  return (
    <div className="min-h-screen bg-white pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </button>

        <div className="mb-8">
          <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-2 flex flex-col md:flex-row gap-2">
              <div className="flex-1 flex items-center gap-3 px-4 py-3">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search by location, property type..."
                  className="w-full outline-none text-gray-700"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition md:w-auto w-full"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            {query ? `Search Results for "${query}"` : 'All Properties'}
          </h1>
          <p className="text-gray-600 mt-2">
            {loading ? 'Searching...' : `${properties.length} properties found`}
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-xl h-96 animate-pulse"></div>
            ))}
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-16">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No properties found</h2>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
}
