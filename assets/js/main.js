const navtab = document.querySelectorAll(".navtab li");

navtab.forEach((li) => {
  li.addEventListener("click", () => {
    document
      .querySelectorAll(".navtab li")
      .forEach((el) => el.classList.remove("active"));
    li.classList.toggle("active");
  });
});
