import React, { useState } from "react";
import GameCard from "./GameCard";
import "./GamesList.css";

export default function GamesList() {
    const [items, setItems] = useState([]);
    const [status, setStatus] = useState("idle"); // idle | loading | success | error
    const [error, setError] = useState(null);

    async function handleLoad() {
        try {
            setStatus("loading");
            setError(null);


            const res = await fetch("https://corsproxy.io/?https://www.freetogame.com/api/games");

            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();

            setItems(Array.isArray(data) ? data : []);
            setStatus("success");
        } catch (e) {
            setStatus("error");
            setError(e.message || "Failed to fetch");
        }
    }

    return (
        <section className="games-list-root">
            <button className="load-btn" onClick={handleLoad} disabled={status === "loading"}>
                {status === "loading" ? "Loading..." : "Load"}
            </button>

            {status === "error" && <p className="error">Failed to load: {error}</p>}
            {status === "success" && items.length === 0 && <p className="empty">No games found.</p>}

            <ul className="games-ul">
                {items.map((g) => (
                    <li key={g.id} className="games-li">
                        <GameCard
                            title={g.title}
                            thumbnail={g.thumbnail}
                            genre={g.genre}
                            platform={g.platform}
                            publisher={g.publisher}
                            releaseDate={g.release_date}
                            shortDescription={g.short_description}
                            gameUrl={g.game_url}
                        />
                    </li>
                ))}
            </ul>
        </section>
    );
}
