document.addEventListener('DOMContentLoaded', () => {
	fetch('assets/data/exhibits.json')
		.then(response => response.json())
		.then(data => {
			document.getElementById('page-title').textContent = data.title;

			const container = document.getElementById('exhibits-container');

			// Add intro paragraph
			const intro = document.createElement('p');
			intro.textContent = data.intro;
			container.appendChild(intro);

			// Add (a) Exhibits subsection title
			const exhibitSubtitle = document.createElement('p');
			exhibitSubtitle.innerHTML = `(a) <i>Exhibits</i>.`;
			container.appendChild(exhibitSubtitle);

			// Create and populate the table
			const table = document.createElement('table');
			table.className = 'exhibits-table'; // Use a specific class for styling

			const thead = document.createElement('thead');
			thead.innerHTML = `<tr><th>Exhibit No.</th><th>Description</th></tr>`;
			table.appendChild(thead);

			const tbody = document.createElement('tbody');
			data.exhibits.forEach(exhibit => {
				const row = document.createElement('tr');
				row.innerHTML = `
                    <td>${exhibit.number}</td>
                    <td><a href="${exhibit.url}" target="_blank">${exhibit.description}</a></td>
                `;
				tbody.appendChild(row);
			});
			table.appendChild(tbody);
			container.appendChild(table);

			// Add footnotes
			const footnotesContainer = document.createElement('div');
			footnotesContainer.className = 'footnotes';
			data.footnotes.forEach(note => {
				const p = document.createElement('p');
				p.textContent = note;
				footnotesContainer.appendChild(p);
			});
			container.appendChild(footnotesContainer);

			// Add Financial Statements section
			const fsSection = document.createElement('div');
			fsSection.className = 'financial-statements';
			const fsTitle = document.createElement('p');
			fsTitle.innerHTML = `(b) <b><i>${data.financialStatements.title}</i></b>.`;
			const fsDesc = document.createElement('p');
			fsDesc.textContent = data.financialStatements.description;
			fsSection.appendChild(fsTitle);
			fsSection.appendChild(fsDesc);
			container.appendChild(fsSection);
		})
		.catch(error => console.error('Error fetching exhibits data:', error));
});