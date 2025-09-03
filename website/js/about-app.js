document.addEventListener('DOMContentLoaded', () => {
	fetch('data/about.json')
		.then(response => response.json())
		.then(data => {
			// Set the page title
			document.getElementById('page-title').textContent = data.title;

			// Get the main content container
			const contentContainer = document.getElementById('about-content');

			// Loop through the paragraphs array and create a <p> for each one
			data.paragraphs.forEach(text => {
				const p = document.createElement('p');
				p.textContent = text;
				contentContainer.appendChild(p);
			});
		})
		.catch(error => console.error('Error fetching about data:', error));
});