// This function fetches navigation links and builds the nav bar.
// It will be called by any page that includes this script.
function loadNavigation() {
	fetch('assets/data/nav.json')
		.then(response => response.json())
		.then(navLinks => {
			const navContainer = document.getElementById('main-nav');

			// If the nav container doesn't exist on the page, just stop.
			if (!navContainer) return;

			const ul = document.createElement('ul');

			navLinks.forEach(link => {
				const li = document.createElement('li');
				const a = document.createElement('a');
				a.textContent = link.text;
				a.href = link.url;

				// Highlight the link for the current page
				if (window.location.pathname.endsWith('/' + link.url) || (window.location.pathname.endsWith('/') && link.url === 'index.html')) {
					a.classList.add('active');
				}

				li.appendChild(a);
				ul.appendChild(li);
			});

			navContainer.appendChild(ul);
		})
		.catch(error => console.error("Error loading navigation:", error));
}

// When the page content is loaded, run our navigation function.
document.addEventListener('DOMContentLoaded', loadNavigation);