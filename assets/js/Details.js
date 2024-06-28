// Toogling The form

const modal = document.querySelector(".layer-form");
const form = document.querySelector(".form");
const Project_button = document.querySelectorAll(".new-project");
document.addEventListener("click", function (event) {
  console.log(!form.contains(event.target));
  console.log(!modal.classList.contains("hidden"));
  console.log(
    !(event.target == Project_button[0] || event.target == Project_button[1])
  );
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

class Project {
  constructor(id, image, name, description, startDate, endDate) {
    this.id = id;
    this.image = image;
    this.name = name;
    this.description = description;
    this.startDate = startDate;
    this.endDate = endDate;
    this.status = "Incomplet";
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const imageInput = document.getElementById("image").files[0];
  const nameInput = document.getElementById("name").value;
  const descriptionInput = document.getElementById("description").value;
  const startDateInput = document.getElementById("start-date").value;
  const endDateInput = document.getElementById("end-date").value;
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
});

const projectDetails = document.querySelector(".project-details");
const projectD = JSON.parse(localStorage.getItem("selectedProject"));

if (projectD) {
  projectDetails.innerHTML = `



   <article class="flex items-center text-center gap-8 mx-auto justify-between">
             <div
              class="flex items-start flex-col gap-8 justify-start text-start w-1/2"
            >
             <div class=" flex items-center justify-between">
  <h1 class="font-medium text-6xl main-title">
    ${projectD.name}
    </h1>

</div>
              
              <p class="font-light text-gray-600 text-xl">
              ${projectD.description}
              </p>
              <div class="flex w-full justify-between">
                <div>
                  <div>Start Date</div>
                  <div>${projectD.startDate}</div>
                </div>
                <div>
                  <div>End Date</div>
                  <div>${projectD.endDate}</div>
                </div>
                <div>
                  <div>Status</div>
                  <div class="project-status">${projectD.status}</div>
                </div>
              </div>
            </div>
             <div class=" flex justify-center details-image">
        <img class="rounded-xl w-full h-auto object-cover" src="${
          projectD.image
        }" alt="${projectD.name}">

    </div>
          </article>
          
<div class="w-full mt-16">
  <h3 class="text-2xl font-bold mb-4">Tasks</h3>
  <table class="min-w-full bg-white border rounded-lg shadow-lg">
    <thead>
      <tr>
        <th class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Name</th>
        <th class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Description</th>
        <th class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Status</th>
        <th class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Actions</th>
      </tr>
    </thead>
    <tbody>
      ${projectD.tasks.map(
        (task) => `
        <tr>
          <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">${task.name}</td>
          <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">${task.description}</td>
          <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">${task.status}</td>
          <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
            <button class="px-4 py-2 bg-green-500 text-white rounded mr-2 mark-task-completed" data-task-id="${task.id}">
              <i class="fa-solid fa-check"></i>
            </button>
            <button class="px-4 py-2 bg-red-500 text-white rounded mr-2 delete-task" data-task-id="${task.id}">
              <i class="fa-solid fa-trash"></i>
            </button>
            <button class="px-4 py-2 bg-yellow-500 text-white rounded modify-task" data-task-id="${task.id}">
              <i class="fa-solid fa-edit"></i>
            </button>
          </td>
        </tr>
      `
      )}
    </tbody>
  </table>
</div>
          <div class="w-full flex justify-between mt-32">
            <button class="px-8 py-2 bg-cyan-400 rounded-full">
              Add Tasks
            </button>
            <button class="px-8 py-2 bg-amber-300 rounded-full modifier-button">
              Modifier
            </button>
            <button class="px-8 py-2 bg-red-400 rounded-full delete-button">Supprimer</button>
            <button class="px-8 py-2 bg-green-600 rounded-full complete-button" ${
              projectD.status === "Completed" ? "disabled" : ""
            }>
              Mark as Completed
            </button>
            <button class="flex items-center gap-2 retour-button">
              <i class="fa-solid fa-arrow-rotate-left"></i>
              <p>Retour</p>
            </button>
          </div>
       
    `;

  const deleteButton = document.querySelector(".delete-button");
  const completeButton = document.querySelector(".complete-button");
  const retourButton = document.querySelector(".retour-button");

  completeButton.addEventListener("click", () => {
    projectD.status = "Completed";
    document.querySelector(".project-status").innerText = "Completed";
    completeButton.disabled = true;

    const projects = JSON.parse(localStorage.getItem("projects")) || [];
    const updatedProjects = projects.map((project) =>
      project.id === projectD.id ? projectD : project
    );
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
    localStorage.setItem("selectedProject", JSON.stringify(projectD));
  });

  retourButton.addEventListener("click", () => {
    window.location.href = "../index.html"; //
  });

  deleteButton.addEventListener("click", () => {
    const projects = JSON.parse(localStorage.getItem("projects")) || [];
    const updatedProjects = projects.filter(
      (project) => project.id !== projectD.id
    );
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
    localStorage.removeItem("selectedProject");
    window.location.href = "../index.html";
  });
} else {
  projectDetails.innerHTML = '<p class="text-red-500">No project selected.</p>';
}

const modifierButton = document.querySelector(".modifier-button"); // Ensure this selector matches your button's class
const formEditLayer = document.querySelector(".layer-form-edit");
const editForm = document.querySelector(".form-edit");

modifierButton.addEventListener("click", () => {
  document.getElementById("edit-name").value = projectD.name;
  document.getElementById("edit-description").value = projectD.description;
  document.getElementById("edit-start-date").value = projectD.startDate;
  document.getElementById("edit-end-date").value = projectD.endDate;

  formEditLayer.classList.remove("hidden");
});

document.addEventListener("click", function (event) {
  console.log(!editForm.contains(event.target));
  console.log(!formEditLayer.classList.contains("hidden"));
  console.log(!(event.target == modifierButton));
  if (
    !editForm.contains(event.target) &&
    !formEditLayer.classList.contains("hidden")
  ) {
    if (!(event.target == modifierButton)) {
      formEditLayer.classList.add("hidden");
    }
  }
});

editForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("edit-name").value;
  const description = document.getElementById("edit-description").value;
  const startDate = document.getElementById("edit-start-date").value;
  const endDate = document.getElementById("edit-end-date").value;

  const imageInput = document.getElementById("edit-image").files[0];
  if (imageInput) {
    const reader = new FileReader();
    reader.onload = function (e) {
      projectD.image = e.target.result;
      saveProject();
    };
    reader.readAsDataURL(imageInput);
  } else {
    saveProject();
  }

  function saveProject() {
    projectD.name = name;
    projectD.description = description;
    projectD.startDate = startDate;
    projectD.endDate = endDate;

    const projects = JSON.parse(localStorage.getItem("projects")) || [];
    const updatedProjects = projects.map((project) =>
      project.id === projectD.id ? projectD : project
    );
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
    localStorage.setItem("selectedProject", JSON.stringify(projectD));

    formEditLayer.classList.add("hidden");
    window.location.reload();
  }
});
