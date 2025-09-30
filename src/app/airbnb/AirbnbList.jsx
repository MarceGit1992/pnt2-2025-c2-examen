"use client";

import { useEffect, useState } from "react";
import AirbnbCard from "./AirbnbCard";

export default function AirbnbList() {
  const [airbnbs, setAirbnbs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchAirbnbs() {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await fetch(
          `https://backendairbnb-befph8eegzabfudb.eastus2-01.azurewebsites.net/api/listings?pageSize=20&page=${page}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("HTTP " + response.status);
        }
        const data = await response.json();
        const arr = Array.isArray(data) ? data : data?.items || [];
        setAirbnbs(arr);

        const saved = localStorage.getItem("airbnbFavorites");
        if (saved) {
          setFavorites(JSON.parse(saved));
        }

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }
    fetchAirbnbs();
  }, [page]);

  function toggleFavorite(id) {
    let nuevos;
    if (favorites.includes(id)) {
      nuevos = favorites.filter((f) => f !== id);
    } else {
      nuevos = [...favorites, id];
    }
    setFavorites(nuevos);
    localStorage.setItem("airbnbFavorites", JSON.stringify(nuevos));
  }

  if (loading) return <p>Cargando airbnbs...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="airbnb-container">
      <div className="airbnb-grid">
        {airbnbs.map((airbnb) => (
          <AirbnbCard
            key={airbnb._id}
            airbnb={airbnb}
            isFavorite={favorites.includes(airbnb._id)}
            toggleFavorite={toggleFavorite}
          />
        ))}
      </div>

      <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          ← Anterior
        </button>
        <span>Página {page}</span>
        <button onClick={() => setPage(page + 1)}>Siguiente →</button>
      </div>
    </div>
  );
}
