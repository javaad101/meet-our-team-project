function loadNavigation() {
	fetch('assets/data/nav.json')
		.then(response => response.json())
		.then(navLinks => {
			const navContainer = document.getElementById('main-nav');
			if (!navContainer) return; // Exit if nav container isn't on the page

			const ul = document.createElement('ul');

			navLinks.forEach(link => {
				const li = document.createElement('li');
				const a = document.createElement('a');
				a.textContent = link.text;
				a.href = link.url;
				li.appendChild(a);
				ul.appendChild(li);
			});

			navContainer.innerHTML = ''; // Clear previous nav, if any
			navContainer.appendChild(ul);

			// Update active link on load and on hash change
			updateActiveNavLink();
			window.addEventListener('hashchange', updateActiveNavLink);
		});
}

function updateActiveNavLink() {
	const currentHash = window.location.hash || '#home';
	const navLinks = document.querySelectorAll('#main-nav a');
	navLinks.forEach(link => {
		if (link.getAttribute('href') === currentHash) {
			link.classList.add('active');
		} else {
			link.classList.remove('active');
		}
	});
}

document.addEventListener('DOMContentLoaded', loadNavigation);