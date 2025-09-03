document.addEventListener('DOMContentLoaded', () => {
	fetch('data/management.json')
		.then(response => response.json())
		.then(data => {
			const container = document.getElementById('management-container');

			// 1. Create and add the main title
			const mainTitle = document.createElement('h1');
			mainTitle.textContent = data.pageTitle;
			container.appendChild(mainTitle);

			// 2. Create and add the team section title
			const teamTitle = document.createElement('h2');
			teamTitle.textContent = data.team.title;
			container.appendChild(teamTitle);

			// 3. Build and add the summary table
			const table = document.createElement('table');
			table.className = 'management-table';
			const thead = table.createTHead();
			thead.innerHTML = '<tr><th>Name</th><th>Age</th><th>Title</th></tr>';
			const tbody = table.createTBody();

			data.team.members.forEach(member => {
				const row = tbody.insertRow();
				row.innerHTML = `<td>${member.name}</td><td>${member.age}</td><td>${member.title}</td>`;
			});

			container.appendChild(table);

			// 4. Add the footnote
			const footnote = document.createElement('p');
			footnote.className = 'footnote';
			footnote.textContent = data.team.footnote;
			container.appendChild(footnote);

			// 5. Add the biographies
			data.team.members.forEach(member => {
				const bioHeading = document.createElement('p');
				bioHeading.innerHTML = `<strong>${member.name}</strong>`;
				container.appendChild(bioHeading);

				member.bio.forEach(paragraph => {
					const p = document.createElement('p');
					p.textContent = paragraph;
					container.appendChild(p);
				});
			});
		})
		.catch(error => console.error('Error fetching management data:', error));
});