// Github Username
const username = "Shubhanflash22";
const repoContainer = document.getElementById("repo-container");

async function fetchRepos() {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
        const repos = await response.json();

        // Clear the "Loading..." text
        repoContainer.innerHTML = "";

        repos.forEach(repo => {
            // Skip forked repos if you want only your own work (optional)
            // if (repo.fork) return; 

            // Create the card div
            const card = document.createElement("div");
            card.className = "card";

            // Determine language color (optional simple logic)
            const lang = repo.language || "Code";

            card.innerHTML = `
                <h3>${repo.name}</h3>
                <p class="tech-stack">${lang}</p>
                <p>${repo.description || "No description provided."}</p>
                <div class="card-links">
                    <a href="${repo.html_url}" target="_blank" class="link">View Code &rarr;</a>
                    ${repo.homepage ? `<a href="${repo.homepage}" target="_blank" class="link">Live Demo &rarr;</a>` : ''}
                </div>
            `;

            repoContainer.appendChild(card);
        });

    } catch (error) {
        repoContainer.innerHTML = `<p>Error loading projects. Please check your connection.</p>`;
        console.error("Error fetching repos:", error);
    }
}

// Run the function when the page loads
fetchRepos();