import React, { useState, useEffect } from "react";
import { projectsAPI } from "../services/api";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await projectsAPI.getAll();
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "/placeholder-project.jpg";
    if (imagePath.startsWith("http")) return imagePath;
    return `http://localhost:3000/uploads/${imagePath}`;
  };

  if (loading) {
    return (
      <section id="projects" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Our Projects</h2>
          <div className="text-center">Loading projects...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">Our Projects</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Explore our REALTRUST of successful projects
        </p>

        {projects.length === 0 ? (
          <div className="text-center text-gray-500">
            No projects available yet. Check back soon!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project._id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300"
              >
                <img
                  src={getImageUrl(project.image)}
                  alt={project.name}
                  className="w-full h-56 object-cover"
                  onError={(e) => {
                    e.target.src = "/placeholder-project.jpg";
                  }}
                />
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3">{project.name}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition">
                    Read More
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
