// This is our Master Builder script
// NEW: A routing map to connect URL hashes to JSON files
// NEW: A routing map to connect URL hashes to JSON files
const pageRoutes = {
	'home': '.page-home',
	'about': 'page-about',
	'relationships': 'page-relationships'
	// Add new pages here in the future!
};

// A simple "Router" to decide which page to load based on the URL
function getPageIdentifier() {
	// This looks at the URL for something like "#about"
	const hash = window.location.hash || '#home'; // Default to #home if no hash
	return hash.substring(1); // Remove the '#'
}

// The main function to render a page from a JSON file
function renderPage(pageId) {
	const appContainer = document.getElementById('app-container');
	appContainer.innerHTML = ''; // Clear the container first
	// NEW: Look up the filename in our route map
	const fileName = pageRoutes[pageId] || 'page-home'; // Default to home
	fetch(`assets/data/page-${pageId}.json`)
		.then(response => {
			if (!response.ok) {
				throw new Error('Page not found');
			}
			return response.json();
		})
		.then(pageData => {
			// Set the browser tab title
			document.title = pageData.title;

			// Loop through the components and build them
			pageData.components.forEach(component => {
				const element = buildComponent(component);
				if (element) {
					appContainer.appendChild(element);
				}
			});
		})
		.catch(error => {
			console.error('Error rendering page:', error);
			appContainer.innerHTML = `<h1>Error: Page not found</h1><p>Could not load the content for "${pageId}".</p>`;
		});
}

// The "Component Factory" - it builds HTML based on the component type
function buildComponent(component) {
	switch (component.type) {
		case 'header':
			const header = document.createElement(`h${component.level || 1}`);
			header.textContent = component.text;
			return header;

		case 'paragraph':
			const p = document.createElement('p');
			p.textContent = component.text;
			return p;

		case 'teamGrid':
			const gridContainer = document.createElement('div');
			gridContainer.className = 'team-grid';
			component.members.forEach(member => {
				const card = document.createElement('div');
				card.className = 'team-member-card';
				card.innerHTML = `
                    <img src="${member.imageUrl}" alt="Photo of ${member.name}">
                    <h2>${member.name}</h2>
                    <h3>${member.title}</h3>
                    <p>${member.bio}</p>
                `;
				gridContainer.appendChild(card);
			});
			return gridContainer;

		default:
			console.warn(`Unknown component type: ${component.type}`);
			return null;
	}
}

// This function sets up our SPA (Single-Page App) behavior
function initialize() {
	// Render the initial page based on the URL hash
	renderPage(getPageIdentifier());

	// Listen for changes in the URL hash (e.g., when a user clicks a nav link)
	window.addEventListener('hashchange', () => {
		renderPage(getPageIdentifier());
	});
}

// Start the application once the DOM is ready
document.addEventListener('DOMContentLoaded', initialize);