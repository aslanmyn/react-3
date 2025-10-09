import React from "react";
import "./GameCard.css";

export default function GameCard({
                                     title,
                                     thumbnail,
                                     genre,
                                     platform,
                                     publisher,
                                     releaseDate,
                                     shortDescription,
                                     gameUrl
                                 }) {
    return (
        <article className="card">
            <div className="card-thumb-wrap">
                {thumbnail ? (
                    <img src={thumbnail} alt={title} className="card-thumb" />
                ) : (
                    <div className="card-thumb card-thumb--placeholder">No image</div>
                )}
            </div>

            <div className="card-body">
                <h3 className="card-title">{title}</h3>

                <p className="card-desc">{shortDescription}</p>

                <dl className="card-meta">
                    <div><dt>Genre</dt><dd>{genre}</dd></div>
                    <div><dt>Platform</dt><dd>{platform}</dd></div>
                    <div><dt>Publisher</dt><dd>{publisher}</dd></div>
                    <div><dt>Release</dt><dd>{releaseDate}</dd></div>
                </dl>

                {gameUrl && (
                    <a className="card-link" href={gameUrl} target="_blank" rel="noreferrer">
                        Open game page →
                    </a>
                )}
            </div>
        </article>
    );
}
