// This line makes sure our code runs only after the whole HTML page is loaded.
document.addEventListener('DOMContentLoaded', function () {

	// STEP A: Go get the ingredients (Fetch the JSON data)
	fetch('team.json')
		.then(response => response.json()) // Convert the response into JSON format
		.then(teamMembers => { // Now we have the data, let's call it "teamMembers"

			// STEP B: Find the empty plate (Get the container element from our HTML)
			const container = document.getElementById('team-container');

			// STEP C: For each ingredient, prepare it and put it on the plate
			// (Loop through each person in our teamMembers array)
			teamMembers.forEach(member => {

				// Create a new div element for the card. It's just in memory for now.
				const card = document.createElement('div');
				card.className = 'team-member-card'; // Add our CSS class for styling

				// Use a template literal (the backticks ``) to easily build the HTML for the card.
				// We inject the data from our JSON object using ${...}
				card.innerHTML = `
                    <img src="${member.imageUrl}" alt="Photo of ${member.name}">
                    <h2>${member.name}</h2>
                    <h3>${member.title}</h3>
                    <p>${member.bio}</p>
                `;

				// Add the fully prepared card to our container in the HTML.
				container.appendChild(card);
			});
		})
		.catch(error => {
			// If anything goes wrong (like the JSON file is missing), log it to the console.
			console.error('Could not fetch team data:', error);
		});
});