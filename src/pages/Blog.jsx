import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://61791a83aa7f3400174047a6.mockapi.io/v1/GetBLogs/")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setBlogs(response.data.reverse());
        } else {
          throw new Error("Invalid API response");
        }
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
        setError("Failed to fetch blogs");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <p className="text-center items-center justify-center flex h-screen">
        Loading...
      </p>
    );
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Blogs</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <Link
            to={`/blog/${blog.id}`}
            className="inline-block mt-2 hover:underline"
          >
            <div
              key={blog.id}
              className="p-4 border rounded-lg shadow-md bg-white"
            >
              <img
                src={blog.Image}
                alt={blog.Title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h2 className="text-xl font-semibold">{blog.Title}</h2>{" "}
              <p className="text-gray-600">{blog.Article?.slice(0, 100)}... </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Blog;
