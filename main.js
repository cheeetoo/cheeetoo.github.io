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

document.getElementById("i-toggle").addEventListener("click", (e) => {
  e.preventDefault();
  const c = document.getElementById("contact");
  c.hidden = !c.hidden;
});
