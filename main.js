const moreToggle = document.getElementById("more-toggle");
const more = document.getElementById("more");
moreToggle.addEventListener("click", () => {
  moreToggle.replaceWith(more);
  more.hidden = false;
});

for (const toggle of document.querySelectorAll(".note-toggle")) {
  const note = document.getElementById(toggle.getAttribute("aria-controls"));
  toggle.addEventListener("click", () => {
    note.hidden = !note.hidden;
    toggle.setAttribute("aria-expanded", String(!note.hidden));
  });
}

const copyEmail = document.getElementById("copy-email");
copyEmail.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(copyEmail.dataset.email);
    copyEmail.textContent = "copied!";
  } catch {
    copyEmail.textContent = copyEmail.dataset.email;
    return;
  }
  setTimeout(() => (copyEmail.textContent = "email me"), 1500);
});

for (const el of document.querySelectorAll("[data-shuffle]")) {
  const kids = Array.from(el.children);
  const movable = kids.filter((k) => !k.hasAttribute("data-fixed"));
  for (let i = movable.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [movable[i], movable[j]] = [movable[j], movable[i]];
  }
  let m = 0;
  for (const k of kids.map((k) => (k.hasAttribute("data-fixed") ? k : movable[m++]))) {
    el.appendChild(k);
  }
}
