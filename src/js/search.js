class SearchHandler {
    constructor() {
        this.searchInput = document.querySelector('#navSearch');
        this.searchResults = document.querySelector('#searchResults');
        this.resultsGrid = document.querySelector('.results-grid');
        this.searchBtn = document.querySelector('.search-btn');
        this.clearBtn = document.querySelector('.clear-btn');
        
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        this.searchBtn.addEventListener('click', () => this.handleSearch());
        this.clearBtn.addEventListener('click', () => this.clearSearch());
        document.addEventListener('click', (e) => this.handleClickOutside(e));
    }

    handleSearch() {
        const query = this.searchInput.value.trim().toLowerCase();
        if (query) {
            this.displaySearchResults(query);
        }
    }

    clearSearch() {
        this.searchInput.value = '';
        this.searchResults.style.display = 'none';
    }

    handleClickOutside(e) {
        if (!e.target.closest('#searchResults') && 
            !e.target.closest('.nav-search')) {
            this.searchResults.style.display = 'none';
        }
    }

    displaySearchResults(query) {
        let filteredResults = [];

        // Search logic for categories, types, and names
        destinations.countries.forEach(country => {
            if (country.name.toLowerCase().includes(query)) {
                filteredResults.push(...country.cities); // Include all cities in the country
            } else {
                filteredResults.push(...country.cities.filter(city =>
                    city.name.toLowerCase().includes(query) || 
                    city.description.toLowerCase().includes(query)
                ));
            }
        });

        destinations.temples.forEach(temple => {
            if (temple.name.toLowerCase().includes(query) || 
                temple.description.toLowerCase().includes(query)) {
                filteredResults.push(temple);
            }
        });

        destinations.beaches.forEach(beach => {
            if (beach.name.toLowerCase().includes(query) || 
                beach.description.toLowerCase().includes(query)) {
                filteredResults.push(beach);
            }
        });

        // Render results
        this.resultsGrid.innerHTML = '';

        if (filteredResults.length === 0) {
            this.resultsGrid.innerHTML = '<p class="no-results">No destinations found matching your search.</p>';
            return;
        }

        filteredResults.forEach(dest => {
            const card = document.createElement('div');
            card.className = 'result-card';
            card.innerHTML = `
                <div class="card">
                    <img src="${dest.imageUrl || 'placeholder.jpg'}" alt="${dest.name}" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${dest.name}</h5>
                        <p class="card-text">${dest.description}</p>
                        <a href="#" class="btn btn-primary">Visit</a>
                    </div>
                </div>
            `;
            this.resultsGrid.appendChild(card);
        });

        this.searchResults.style.display = 'block';
    }
}
