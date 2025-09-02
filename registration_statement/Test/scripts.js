// Wait for the HTML document to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
	// Fetch the JSON data
	fetch('management-content.json')
		.then(response => {
			// Check if the request was successful
			if (!response.ok) {
				throw new Error('Network response was not ok ' + response.statusText);
			}
			// Parse the JSON from the response
			return response.json();
		})
		.then(data => {
			// Once data is loaded, call the render function
			renderContent(data);
		})
		.catch(error => {
			// Log any errors to the console
			console.error('There has been a problem with your fetch operation:', error);
			document.getElementById('main-title').textContent = 'Error loading content.';
		});
});

// Function to render all the content onto the page
function renderContent(data) {
	// Set the main page title
	document.getElementById('main-title').textContent = data.pageTitle;

	// Render the team section
	renderTeam(data.team);

	// Render the committees section
	renderCommittees(data.committees);
}

// Function to render the management team section
function renderTeam(teamData) {
	document.getElementById('team-title').textContent = teamData.title;
	document.getElementById('team-description').textContent = teamData.description;

	const allMembers = [...teamData.members, ...teamData.nominees];
	const tableContainer = document.getElementById('team-table-container');

	// Create and populate the summary table
	const table = document.createElement('table');
	table.className = 'management-table';

	const thead = document.createElement('thead');
	thead.innerHTML = `<tr><th>Name</th><th>Age</th><th>Title</th></tr>`;
	table.appendChild(thead);

	const tbody = document.createElement('tbody');
	allMembers.forEach(member => {
		const row = document.createElement('tr');
		row.innerHTML = `<td>${member.name}</td><td>${member.age}</td><td>${member.title}</td>`;
		tbody.appendChild(row);
	});
	table.appendChild(tbody);
	tableContainer.appendChild(table);

	// Add the footnote
	document.getElementById('team-footnote').textContent = teamData.footnote;

	// Create and populate the biography sections
	const biosContainer = document.getElementById('team-bios');
	allMembers.forEach(member => {
		// Add a strong tag for the name
		const nameElement = document.createElement('p');
		const strongName = document.createElement('strong');
		strongName.textContent = member.name;
		nameElement.appendChild(strongName);
		nameElement.append(` — ${member.bio[0]}`); // Add the first paragraph
		biosContainer.appendChild(nameElement);

		// Add the rest of the bio paragraphs
		for (let i = 1; i < member.bio.length; i++) {
			const p = document.createElement('p');
			p.textContent = member.bio[i];
			biosContainer.appendChild(p);
		}
	});
}

// Function to render the committees section
function renderCommittees(committeesData) {
	document.getElementById('committees-title').textContent = committeesData.title;
	document.getElementById('committees-intro').textContent = committeesData.intro;

	// Helper function to render a single committee
	const renderCommittee = (committeeData, containerId) => {
		const container = document.getElementById(containerId);

		const title = document.createElement('h3');
		title.textContent = committeeData.title;
		container.appendChild(title);

		committeeData.description.forEach(pText => {
			const p = document.createElement('p');
			p.textContent = pText;
			container.appendChild(p);
		});

		const ul = document.createElement('ul');
		committeeData.responsibilities.forEach(itemText => {
			const li = document.createElement('li');
			li.textContent = itemText;
			ul.appendChild(li);
		});
		container.appendChild(ul);
	};

	renderCommittee(committeesData.auditCommittee, 'audit-committee');
	renderCommittee(committeesData.compensationCommittee, 'compensation-committee');
}