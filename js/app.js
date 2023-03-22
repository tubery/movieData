let movieData = {
	"The Darjeeling Limited": {
		plot: "A year after their father's funeral, three brothers travel across India by train in an attempt to bond with each other.",
		cast: ["Jason Schwartzman", "Owen Wilson", "Adrien Brody"],
		runtime: 151,
		rating: 7.2,
		year: 2007,
	},
	"The Royal Tenenbaums": {
		plot: "The eccentric members of a dysfunctional family reluctantly gather under the same roof for various reasons",
		rating: 7.6,
		year: 2001,
		cast: ["Gene Hackman", "Gwnyeth Paltrow", "Anjelica Huston"],
		runtime: 170,
	},
	"Fantastic Mr. Fox": {
		year: 2009,
		plot: "An urbane fox cannot resist returning to his farm raiding ways and then must help his community survive the farmers' retaliation.",
		cast: [
			"George Clooney",
			"Meryl Streep",
			"Bill Murray",
			"Jason Schwartzman",
		],
		runtime: 147,
		rating: 7.9,
	},
	"The Grand Budapest Hotel": {
		rating: 8.1,
		runtime: 159,
		year: 2014,
		plot: "A writer encounters the owner of an aging high-class hotel, who tells him of his early years serving as a lobby boy in the hotel's glorious years under an exceptional concierge.",
		cast: ["Ralph Fiennes", "F. Murray Abraham", "Mathieu Amalric"],
	},
};

// Location to insert movies
const movieContainer = document.querySelector(".movie-container");

// Edit modal
modal = document.querySelector(".edit");
const editModal = document.querySelector(".close-edit");

// Loop through object and add to UI
const addToUI = () => {
	Object.keys(movieData).forEach((itemKey, index) => {
		const movie = movieData[itemKey];
		const element = createElement(
			itemKey,
			movie.rating,
			movie.runtime,
			movie.year,
			movie.plot,
			movie.cast,
			index
		);
		element.addEventListener("click", (e) => {
			// console.log(e.target.value);
			if (e.target.textContent === "Edit") {
				modal.showModal();
			}
			if (e.target.textContent === "Delete") {
				console.log("delete");
				console.log(e.target.parentElement);
			}
		});

		// Insert into container
		movieContainer.appendChild(element);
	});
};

// Close modal
editModal.addEventListener("click", () => {
	modal.close();
});

// Create element for movies
const createElement = (
	name,
	rating,
	runtime,
	year,
	plot,
	cast,
	movieNumber
) => {
	const article = document.createElement("article");
	article.id = movieNumber;
	article.className = "movie";
	article.innerHTML = `
		<h2 class="movie-name">${name}</h2>
		<p class="movie-year">${year}</p>
		<p class="movie-runtime">${runtime}</p>
		<div class="movie-rating">${rating}</div>
		<p class="movie-cast">${cast}</p>
		<p class="movie-plot">${plot}</p>
		<button class="edit-movie">Edit</button>
		<button class="delete-movie">Delete</button>
	`;
	return article;
};

// Running
addToUI();
