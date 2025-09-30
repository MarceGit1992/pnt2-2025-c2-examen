"use client";

import { use, useEffect, useState } from "react";

export default function AirbnbDetail({ params }) {
  const { id } = use(params);
  const [airbnb, setAirbnb] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchAirbnb() {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `https://backendairbnb-befph8eegzabfudb.eastus2-01.azurewebsites.net/api/listings/${id}`,
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
        setAirbnb(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }
    fetchAirbnb();
  }, [id]);

  if (loading) return <p>Cargando detalle...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!airbnb) return <p>No se encontró la propiedad.</p>;

  return (
    <div className="airbnb-detail-container">
      <h2 className="airbnb-detail-title">{airbnb.name}</h2>
      {airbnb.images?.picture_url && (
        <img
          src={airbnb.images.picture_url}
          alt={airbnb.name}
          className="airbnb-detail-image"
        />
      )}
      {airbnb.summary && (
        <p className="airbnb-detail-summary">{airbnb.summary}</p>
      )}
      {airbnb.listing_url && (
        <a
          href={airbnb.listing_url}
          target="_blank"
          rel="noreferrer"
          className="airbnb-detail-url"
        >
          Ver en Airbnb
        </a>
      )}
    </div>
  );
}
