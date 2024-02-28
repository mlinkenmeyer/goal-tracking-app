import React, { useState } from "react";

function Search({ search, setSearch }) {

    return (
        <div>
            <input 
                style={{ width: "30%" }}
                type="text"
                placeholder="Search entries..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            ></input>
        </div>
    )
}

export default Search;