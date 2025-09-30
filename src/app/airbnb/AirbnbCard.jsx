import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";

export default function AirbnbCard({ airbnb, isFavorite, toggleFavorite }) {
  return (
    <div className="airbnb-card">
      <div className="airbnb-image-container">
        {airbnb.images?.picture_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={airbnb.images.picture_url}
            alt={airbnb.name}
            className="airbnb-image"
          />
        ) : (
          <div className="airbnb-image-placeholder">Sin foto</div>
        )}

        <button
          onClick={() => toggleFavorite(airbnb._id)}
          className="favorite-button"
        >
          <FontAwesomeIcon
            icon={isFavorite ? solidHeart : regularHeart}
            className={`favorite-icon ${
              isFavorite ? "favorited" : "not-favorited"
            }`}
          />
        </button>
      </div>

      <div className="airbnb-content">
        <h3 className="airbnb-name">{airbnb.name}</h3>

        {airbnb.summary && <p className="airbnb-summary">{airbnb.summary}</p>}

        {airbnb.listing_url && (
          <>
            <a
              href={airbnb.listing_url}
              target="_blank"
              rel="noreferrer"
              className="airbnb-url"
            >
              Ver en Airbnb
            </a>
            <br />
          </>
        )}
        <Link href={`/airbnb/${airbnb._id}`} className="airbnb-url">
          Ver detalle
        </Link>
      </div>
    </div>
  );
}
