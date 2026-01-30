import React, { useState, useEffect } from "react";
import { clientsAPI } from "../services/api";
import { FaQuoteLeft } from "react-icons/fa";

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await clientsAPI.getAll();
      setClients(response.data);
    } catch (error) {
      console.error("Error fetching clients:", error);
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "/placeholder-avatar.jpg";
    if (imagePath.startsWith("http")) return imagePath;
    return `http://localhost:3000/uploads/${imagePath}`;
  };

  if (loading) {
    return (
      <section id="clients" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Happy Clients
          </h2>
          <div className="text-center">Loading testimonials...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="clients" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">Happy Clients</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          What our clients say about us
        </p>

        {clients.length === 0 ? (
          <div className="text-center text-gray-500">
            No testimonials available yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {clients.map((client) => (
              <div
                key={client._id}
                className="bg-gray-50 rounded-lg p-8 shadow-md hover:shadow-lg transition duration-300"
              >
                <FaQuoteLeft className="text-primary text-3xl mb-4" />
                <p className="text-gray-700 mb-6 italic">
                  {client.description}
                </p>
                <div className="flex items-center">
                  <img
                    src={getImageUrl(client.image)}
                    alt={client.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                    onError={(e) => {
                      e.target.src = "/placeholder-avatar.jpg";
                    }}
                  />
                  <div>
                    <h4 className="font-bold text-lg">{client.name}</h4>
                    <p className="text-gray-600 text-sm">
                      {client.designation}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Clients;
