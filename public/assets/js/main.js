const navtab = document.querySelectorAll(".navtab li");

navtab.forEach((li) => {
  li.addEventListener("click", () => {
    document
      .querySelectorAll(".navtab li")
      .forEach((el) => el.classList.remove("active"));
    li.classList.toggle("active");
  });
});

// Toogling The form

const modal = document.querySelector(".layer-form");
const form = document.querySelector(".form");
const Project_button = document.querySelectorAll(".new-project");
document.addEventListener("click", function (event) {
  if (!form.contains(event.target) && !modal.classList.contains("hidden")) {
    if (
      !(event.target == Project_button[0] || event.target == Project_button[1])
    ) {
      modal.classList.add("hidden");
    }
  }
});

Project_button.forEach((pel) => {
  pel.addEventListener("click", () => {
    modal.classList.toggle("hidden");
  });
});

//saving the object

class Project {
  constructor(id, image, name, description, startDate, endDate) {
    this.id = id;
    this.image = image;
    this.name = name;
    this.description = description;
    this.startDate = startDate;
    this.endDate = endDate;
    this.status = "Incomplet";
    this.tasks = [];
  }

  addTask(task) {
    this.tasks.push(task);
  }
  removeTask(taskId) {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
  }

  updateTask(taskId, updatedTask) {
    this.tasks = this.tasks.map((task) =>
      task.id === taskId ? updatedTask : task
    );
  }
}

class Task {
  constructor(id, name, description, status = "Incomplet") {
    this.id = id;
    this.name = name;
    this.description = description;
    this.status = status;
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let isValid = true;

  const imageInput = document.getElementById("image").files[0];
  const nameInput = document.getElementById("name").value;
  const descriptionInput = document.getElementById("description").value;
  const startDateInput = document.getElementById("start-date").value;
  const endDateInput = document.getElementById("end-date").value;

  const descriptionError = document.getElementById("description-error");
  if (descriptionInput.trim().length < 10) {
    isValid = false;
    descriptionError.textContent =
      "Description must be at least 10 characters long.";
    descriptionError.classList.remove("hidden");
  } else {
    descriptionError.classList.add("hidden");
  }

  const nameError = document.getElementById("name-error");
  const nameRegex = /^[a-zA-Z0-9 ]{3,50}$/;
  if (!nameRegex.test(nameInput)) {
    console.log("here must");
    isValid = false;
    nameError.textContent =
      "Project name must be 3-50 characters long and can only contain letters, numbers, and spaces.";
    nameError.classList.remove("hidden");
  } else {
    nameError.classList.add("hidden");
  }

  const startDateError = document.getElementById("start-date-error");
  const currentDate = new Date().setHours(0, 0, 0, 0);
  if (startDateInput === "") {
    isValid = false;
    startDateError.textContent = "Start date is required.";
    startDateError.classList.remove("hidden");
  } else if (new Date(startDateInput) <= currentDate) {
    isValid = false;
    startDateError.textContent = "Start date must be after today's date.";
    startDateError.classList.remove("hidden");
  } else {
    startDateError.classList.add("hidden");
  }

  const endDateError = document.getElementById("end-date-error");
  if (endDateInput === "") {
    isValid = false;
    endDateError.textContent = "End date is required.";
    endDateError.classList.remove("hidden");
  } else if (new Date(endDateInput) <= new Date(startDateInput)) {
    isValid = false;
    endDateError.textContent = "End date must be after the start date.";
    endDateError.classList.remove("hidden");
  } else {
    endDateError.classList.add("hidden");
  }
  if (isValid) {
    console.log("here");
    function generateUniqueId() {
      return Date.now() + Math.floor(Math.random() * 1000);
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      const projectImage = e.target.result;
      const project = new Project(
        generateUniqueId(),
        projectImage,
        nameInput,
        descriptionInput,
        startDateInput,
        endDateInput
      );

      let projects = JSON.parse(localStorage.getItem("projects")) || [];
      projects.push(project);
      localStorage.setItem("projects", JSON.stringify(projects));

      modal.classList.add("hidden");
    };
    reader.readAsDataURL(imageInput);
  } else {
    event.preventDefault();
  }
});

const projectsContainer = document.querySelector(".projects");

function appendProjectCard(project) {
  const card = document.createElement("div");

  card.innerHTML = `
      
      <div
              class="bg-white rounded-lg relative shadow-lg overflow-hidden flex flex-col h-auto"
            >
              <img
                src="${project.image}"
                alt="${project.name}"
                class="w-full image-card object-cover"
              />
              <div class="absolute top-5 left-5">
                <div
                  class="bg-purple-700 flex gap-2 items-center justify-center backdrop-blur-sm bg-opacity-70 rounded-full w-24 text-white text-sm font-light"
                >
                  ${
                    project.status == "Incomplet"
                      ? '<i class="fa-solid fa-spinner"></i>'
                      : '<i class="fa-solid fa-check"></i>'
                  }
                  <p>Status</p>
                </div>
              </div>

              <div class="p-6 flex flex-col flex-grow">
                <div class="flex justify-between items-center">
                  <h2 class="card-title text-black font-semibold text-2xl">
                  ${project.name}
                  </h2>
                  <p class="font-normal text-xl">Tasks : ${
                    project.tasks.length
                  }</p>
                </div>

                <p class="text-gray-500 mt-2">
                ${project.description}
                </p>
                <div class="mt-auto pt-7 flex justify-between items-center">
                  <div>
                    <p class="font-bold">Start Date</p>
                    <p>
                      <span class="size-5 font-normal text-1xl">${
                        project.startDate
                      }</span>
                    </p>
                  </div>
                  <div>
                    <p class="font-bold">End Date</p>
                    <p>
                      <span class="size-5 font-normal text-1xl">${
                        project.endDate
                      }</span>
                    </p>
                  </div>
                  <button
                    class="py-2 px-7 bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-xl"
                  >
                    <a href="./views/DetailsPage.html"> More Details </a>
                  </button>
                </div>
              </div>
            </div>
  `;
  card.addEventListener("click", () => {
    localStorage.setItem("selectedProject", JSON.stringify(project));
    window.location.href = "views/DetailsPage.html";
  });

  projectsContainer.appendChild(card);
}

function loadProjects() {
  const projects = JSON.parse(localStorage.getItem("projects")) || [];
  projects.forEach(appendProjectCard);
}

loadProjects();
