import React, { useState, useEffect } from 'react';
import { newsletterAPI } from '../../services/api';
import { toast } from 'react-toastify';
import { FaTrash, FaEnvelope } from 'react-icons/fa';
import AdminLayout from '../../components/admin/AdminLayout';

const AdminNewsletters = () => {
  const [newsletters, setNewsletters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNewsletters();
  }, []);

  const fetchNewsletters = async () => {
    try {
      const response = await newsletterAPI.getAll();
      setNewsletters(response.data);
    } catch (error) {
      toast.error('Failed to fetch newsletter subscriptions');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this subscription?')) {
      try {
        await newsletterAPI.delete(id);
        toast.success('Subscription deleted successfully');
        fetchNewsletters();
      } catch (error) {
        toast.error('Failed to delete subscription');
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const exportEmails = () => {
    const emails = newsletters.map(n => n.email).join('\n');
    const blob = new Blob([emails], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'newsletter-subscribers.txt';
    a.click();
    toast.success('Email list exported successfully');
  };

  return (
    <AdminLayout>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Newsletter Subscriptions</h2>
          <p className="text-gray-600 mt-2">Total Subscribers: {newsletters.length}</p>
        </div>
        {newsletters.length > 0 && (
          <button
            onClick={exportEmails}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Export Email List
          </button>
        )}
      </div>

      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : newsletters.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <p className="text-gray-500 text-lg">No newsletter subscriptions yet</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Email Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Subscribed Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {newsletters.map((newsletter) => (
                <tr key={newsletter._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <FaEnvelope className="mr-3 text-primary" />
                      <a 
                        href={`mailto:${newsletter.email}`}
                        className="text-gray-900 hover:text-primary transition"
                      >
                        {newsletter.email}
                      </a>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {formatDate(newsletter.createdAt)}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDelete(newsletter._id)}
                      className="text-red-600 hover:text-red-800 transition"
                      title="Delete subscription"
                    >
                      <FaTrash size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminNewsletters;