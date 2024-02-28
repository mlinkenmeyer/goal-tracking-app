import React, { useState } from "react";

function JournalFilter({ sortBy, setSortBy, sortedEntries }) {

    return(
        <div>
            <strong>Sort by</strong>
            <select
                style={{ width: "200px" }}
                name="category"
                id="filter-category"
                onChange={(e) => sortedEntries(e.target.value)}
            >
                <option value="id-ascend">ID (Ascending) (Default)</option>
                <option value="id-descend">ID (Descending)</option>
                <option value="old-new">Date: Oldest to Newest</option>
                <option value="new-old">Date: Newest to Oldest</option>
                <option value="goal-id">Goal ID</option>
            </select>

            
        </div>
    )
}

export default JournalFilter;