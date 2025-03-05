import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { incrementView } from "../redux/slices/viewsSlice";

const BlogSingle = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [blog, setBlog] = useState(null);
  const views = useSelector((state) => state.views[id] || 0);

  useEffect(() => {
    if (!id) return;

    axios
      .get(`https://61791a83aa7f3400174047a6.mockapi.io/v1/GetBLogs/${id}`)
      .then((response) => {
        setBlog(response.data);
        dispatch(incrementView(id));
      })
      .catch((error) => console.error("Error fetching blog:", error));
  }, [id, dispatch]);

  if (!blog)
    return (
      <p className="text-center items-center justify-center flex h-screen">
        Loading...
      </p>
    );

  return (
    <div className="max-w-3xl mx-auto p-4">
      <img
        src={blog.Image}
        alt={blog.Title}
        className="w-full h-64 object-cover rounded-lg"
      />
      <h1 className="text-4xl font-bold mt-4">{blog.Title}</h1>
      <p className="text-gray-500 mt-2">Views: {views}</p>
      <p className="text-lg mt-4">{blog.Article}</p>{" "}
    </div>
  );
};

export default BlogSingle;
