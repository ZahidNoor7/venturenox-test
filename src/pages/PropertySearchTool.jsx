import { useState } from "react";

const properties = [
  {
    id: 1,
    address: "Forsmannstraße 5",
    postcode: "22303",
    type: "Flat",
    rooms: 5,
    area: 48,
  },
  {
    id: 2,
    address: "Steinstraße 12",
    postcode: "20095",
    type: "Terraced house",
    rooms: 7,
    area: 63,
  },
  {
    id: 3,
    address: "Himmelstraße 2",
    postcode: "22299",
    type: "Semi-detached",
    rooms: 3,
    area: 22,
  },
  {
    id: 4,
    address: "Alte Schleuse 23",
    postcode: "21107",
    type: "Terraced house",
    rooms: 4,
    area: 54,
  },
];

const PropertySearchTool = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [selectedProperties, setSelectedProperties] = useState([]);

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const handleCheckboxChange = (id) => {
    setSelectedProperties((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleFilterChange = (type) => setFilterType(type);

  const filteredProperties = properties.filter(
    (prop) =>
      prop.address.includes(searchTerm) &&
      (filterType === "All" || prop.type === filterType)
  );

  const selectedItems = properties.filter((prop) =>
    selectedProperties.includes(prop.id)
  );

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Property Search Tool</h1>
      <input
        type="text"
        onChange={handleSearch}
        placeholder="Search Address"
        className="w-full p-2 border rounded-md mb-4"
      />
      <h2 className="text-xl font-semibold">Selected Properties</h2>
      <table className="w-full border mt-2">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Address</th>
            <th className="border p-2">Postcode</th>
            <th className="border p-2">Rooms</th>
            <th className="border p-2">Area (m²)</th>
          </tr>
        </thead>
        <tbody>
          {selectedItems.map((prop) => (
            <tr key={prop.id} className="border">
              <td className="border p-2">{prop.address}</td>
              <td className="border p-2">{prop.postcode}</td>
              <td className="border p-2">{prop.rooms}</td>
              <td className="border p-2">{prop.area}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2 className="text-xl font-semibold mt-4">Property Types</h2>
      <div className="flex gap-4 mb-4">
        {["All", "Flat", "Terraced house", "Semi-detached"].map((type) => (
          <button
            key={type}
            onClick={() => handleFilterChange(type)}
            className={`px-3 py-1 border rounded-md ${
              filterType === type ? "bg-blue-500 text-white" : "bg-gray-100"
            }`}
          >
            {type}
          </button>
        ))}
      </div>
      <h2 className="text-xl font-semibold">Search Results</h2>
      <table className="w-full border mt-2">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">✔</th>
            <th className="border p-2">Address</th>
            <th className="border p-2">Postcode</th>
            <th className="border p-2">Property Type</th>
            <th className="border p-2">Rooms</th>
            <th className="border p-2">Area (m²)</th>
          </tr>
        </thead>
        <tbody>
          {filteredProperties.map((prop) => (
            <tr key={prop.id} className="border">
              <td className="border p-2 text-center">
                <input
                  type="checkbox"
                  checked={selectedProperties.includes(prop.id)}
                  onChange={() => handleCheckboxChange(prop.id)}
                />
              </td>
              <td className="border p-2">{prop.address}</td>
              <td className="border p-2">{prop.postcode}</td>
              <td className="border p-2">{prop.type}</td>
              <td className="border p-2">{prop.rooms}</td>
              <td className="border p-2">{prop.area}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PropertySearchTool;
