import React, { useState } from "react";
import GameCard from "./GameCard";
import "./GamesList.css";

export default function GamesList() {
    const [items, setItems] = useState([]);
    const [status, setStatus] = useState("idle"); // idle | loading | success | error
    const [error, setError] = useState(null);


    const [search, setSearch] = useState("");

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


    const query = search.trim().toLowerCase();
    const filtered = query
        ? items.filter((g) => g.title?.toLowerCase().includes(query))
        : items;


    const clearSearch = () => setSearch("");

    return (
        <section className="games-list-root">
            {}
            <div className="search-row">
                <input
                    className="search-input"
                    type="text"
                    placeholder="Search by title…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    aria-label="Search games"
                />
                {search && (
                    <button className="clear-btn" onClick={clearSearch}>
                        Clear
                    </button>
                )}
                <button className="load-btn" onClick={handleLoad} disabled={status === "loading"}>
                    {status === "loading" ? "Loading..." : (status === "idle" ? "Load" : "Reload")}
                </button>
            </div>

            {status === "error" && <p className="error">Failed to load: {error}</p>}
            {status === "success" && filtered.length === 0 && (
                <p className="empty">No games match your search.</p>
            )}

            <ul className="games-ul">
                {filtered.map((g) => (
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
