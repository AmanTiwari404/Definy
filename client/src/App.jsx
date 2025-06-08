import { useState } from "react";
import axios from "axios";
import "./index.css";

function App() {
  const [query, setQuery] = useState("");
  const [definition, setDefinition] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault(); 
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/define", { query });
      setDefinition(res.data.definition);
    } catch (err) {
      setDefinition("Error fetching definition.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6 text-indigo-600">🔍Definy</h1>

      <form onSubmit={handleSearch} className="w-full max-w-md flex flex-col gap-4">
        <input
          type="text"
          placeholder="Enter a term..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-3 border rounded-lg shadow"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
          disabled={loading}
        >
          {loading ? "Loading..." : "Get Definition"}
        </button>
      </form>

      {definition && (
        <div className="mt-6 bg-white p-4 rounded-lg shadow max-w-md w-full">
          <strong>Definition:</strong>
          <p className="mt-2 text-gray-800">{definition}</p>
        </div>
      )}
    </div>
  );
}

export default App;
