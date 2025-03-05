import Blog from "./pages/Blog";
import ChatBot from "./pages/ChatBot";
import Header from "./components/Header";
import BlogSingle from "./pages/BlogSingle";
import { Routes, Route } from "react-router-dom";
import PropertySearchTool from "./pages/PropertySearchTool";

function App() {
  return (
    <div>
      <Header />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogSingle />} />
          <Route path="/property-search" element={<PropertySearchTool />} />
          <Route path="/chat" element={<ChatBot />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
