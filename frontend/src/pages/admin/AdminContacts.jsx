import React, { useState, useEffect } from "react";
import { contactsAPI } from "../../services/api";
import { toast } from "react-toastify";
import { FaTrash, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import AdminLayout from "../../components/admin/AdminLayout";

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchContacts, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await contactsAPI.getAll();
      setContacts(response.data);
    } catch (error) {
      toast.error("Failed to fetch contacts");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      try {
        await contactsAPI.delete(id);
        toast.success("Contact deleted successfully");
        fetchContacts();
      } catch (error) {
        toast.error("Failed to delete contact");
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <AdminLayout>
      <div className="mb-6">
        <h2 className="text-3xl font-bold">Contact Form Submissions</h2>
        <p className="text-gray-600 mt-2">
          View and manage all contact form submissions
        </p>
      </div>

      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : contacts.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <p className="text-gray-500 text-lg">No contact submissions yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contacts.map((contact) => (
            <div
              key={contact._id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-800">
                  {contact.fullName}
                </h3>
                <button
                  onClick={() => handleDelete(contact._id)}
                  className="text-red-600 hover:text-red-800 transition"
                  title="Delete contact"
                >
                  <FaTrash size={18} />
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <FaEnvelope className="mr-3 text-primary" />
                  <a
                    href={`mailto:${contact.email}`}
                    className="hover:text-primary transition"
                  >
                    {contact.email}
                  </a>
                </div>

                <div className="flex items-center text-gray-600">
                  <FaPhone className="mr-3 text-primary" />
                  <a
                    href={`tel:${contact.mobileNumber}`}
                    className="hover:text-primary transition"
                  >
                    {contact.mobileNumber}
                  </a>
                </div>

                <div className="flex items-center text-gray-600">
                  <FaMapMarkerAlt className="mr-3 text-primary" />
                  <span>{contact.city}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  Submitted: {formatDate(contact.createdAt)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminContacts;
