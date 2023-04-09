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
const modalTitle = document.querySelector(".modal-title");
const submitEdit = document.querySelector("#submit-edit");
const addMovie = document.querySelector(".add-movie");
const clearMovies = document.querySelector(".clear-movies");
const errorMsg = document.querySelector("#error");
// edit modal inputs
const nameInput = document.querySelector("#movie-name-input");
const yearInput = document.querySelector("#movie-year-input");
const runtimeInput = document.querySelector("#movie-runtime-input");
const ratingInput = document.querySelector("#movie-rating-input");
const castInput = document.querySelector("#movie-cast-input");
const plotInput = document.querySelector("#movie-plot-input");

// Allow user to add movie
addMovie.addEventListener("click", () => {
	modal.showModal();
	modalTitle.textContent = "Add Movie";
	nameInput.value = "";
	yearInput.value = "";
	runtimeInput.value = "";
	ratingInput.value = "";
	castInput.value = "";
	plotInput.value = "";
	submitEdit.value = "Add to database";
});

// Clear all movies
clearMovies.addEventListener("click", () => {
	movieData = {};
	// Clear ui
	movieContainer.innerHTML = "";
	// Add changes
	addToUI();
});

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
			if (e.target.textContent === "Edit") {
				// console.log(e.target.parentElement.id);
				modal.showModal();
				modalTitle.textContent = "Edit Movie";
				submitEdit.value = "Save changes";
				nameInput.value = itemKey;
				ratingInput.value = movie.rating;
				runtimeInput.value = movie.runtime;
				yearInput.value = movie.year;
				plotInput.value = movie.plot;
				castInput.value = movie.cast;
			}
			if (e.target.textContent === "Delete") {
				// console.log("delete");
				delete movieData[itemKey];
				e.target.parentElement.remove();
			}
		});
		// Insert into container
		movieContainer.appendChild(element);
	});
};

// Change submit button incase user changes title
nameInput.addEventListener("keyup", (e) => {
	if (!Object.keys(movieData).includes(nameInput.value)) {
		modalTitle.textContent = "Add Movie";
		submitEdit.value = "Add to database";
	} else {
		modalTitle.textContent = "Edit Movie";
		submitEdit.value = "Save changes";
	}
});

// Close modal
editModal.addEventListener("click", () => {
	modal.close();
});

// Submit edit in modal
submitEdit.addEventListener("click", (e) => {
	e.preventDefault();
	if (
		nameInput.value === "" ||
		ratingInput.value === "" ||
		ratingInput.value < 0 ||
		ratingInput.value > 10 ||
		runtimeInput === "" ||
		runtimeInput.value < 0 ||
		runtimeInput.value > 500 ||
		yearInput.value === "" ||
		yearInput.value < 1890 ||
		yearInput.value > 3000 ||
		plotInput.value === "" ||
		castInput.value === ""
	) {
		console.log("Please fillm fields");
		errorMsg.classList.toggle("hidden");
		setTimeout(() => {
			errorMsg.classList.toggle("hidden");
		}, 3000);
	} else {
		if (Object.keys(movieData).includes(nameInput.value)) {
			// console.log("movie exists");
			movieData[nameInput.value].rating = ratingInput.value;
			movieData[nameInput.value].runtime = runtimeInput.value;
			movieData[nameInput.value].year = yearInput.value;
			movieData[nameInput.value].plot = plotInput.value;
			movieData[nameInput.value].cast = castInput.value;

			// Clear ui
			movieContainer.innerHTML = "";
			// Add changes
			addToUI();
			// Close modal
			modal.close();
		} else {
			movieData[nameInput.value] = {
				rating: ratingInput.value,
				runtime: runtimeInput.value,
				year: yearInput.value,
				plot: plotInput.value,
				cast: castInput.value,
			};
			// Clear ui
			movieContainer.innerHTML = "";
			// Add changes
			addToUI();
			// Close modal
			modal.close();
		}
	}
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
		<p class="movie-runtime">${runtime} minutes</p>
		<div class="movie-rating">${rating} / 10</div>
		<p class="movie-cast">Cast: ${cast}</p>
		<p class="movie-plot">Plot: ${plot}</p>
		<button class="edit-movie">Edit</button>
		<button class="delete-movie">Delete</button>
	`;
	return article;
};

// Running
addToUI();
