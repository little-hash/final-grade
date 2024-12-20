let characters = []; // To store characters from db.json

// Fetch the data from db.json
fetch("db.json")
    .then(response => response.json())
    .then(data => {
        characters = data.characters;
        displayCharacters(characters);
    })
    .catch(error => console.error("Error loading character data:", error));

// Function to display characters
function displayCharacters(filteredCharacters) {
    const characterGrid = document.getElementById("character-grid");
    characterGrid.innerHTML = ""; // Clear the grid before rendering
    filteredCharacters.forEach(character => {
        const characterCard = document.createElement("div");
        characterCard.className = "character-card";
        characterCard.innerHTML = `
            <img src="${character.image}" alt="${character.name}" />
            <h2>${character.name}</h2>
            <p><strong>Element:</strong> ${character.element}</p>
            <p><strong>Weapon:</strong> ${character.weapon}</p>
            <p><strong>Rarity:</strong> <span class="rarity-stars">${"⭐".repeat(character.rarity)}</span></p>
            <p><strong>Region:</strong> ${character.region}</p>
        `;
        characterCard.onclick = () => showCharacterDetails(character);
        characterGrid.appendChild(characterCard);
    });
}

// Function to filter characters by search query
function filterCharacters() {
    const query = document.getElementById("search-bar").value.toLowerCase();
    const filteredCharacters = characters.filter(character =>
        character.name.toLowerCase().includes(query)
    );
    displayCharacters(filteredCharacters);
}

// Function to show character details
function showCharacterDetails(character) {
    document.getElementById("character-grid").style.display = "none";
    const details = document.getElementById("character-details");
    details.style.display = "block";
    document.getElementById("details-name").textContent = character.name;
    document.getElementById("details-image").src = character.image;
    document.getElementById("details-element").textContent = character.element;
    document.getElementById("details-weapon").textContent = character.weapon;
    document.getElementById("details-rarity").textContent = "⭐".repeat(character.rarity);
    document.getElementById("details-region").textContent = character.region;
    document.getElementById("details-info").textContent = character.details || "No additional details available.";
}

// Function to go back to the character grid
function showCharacterGrid() {
    document.getElementById("character-details").style.display = "none";
    document.getElementById("character-grid").style.display = "flex";
}
