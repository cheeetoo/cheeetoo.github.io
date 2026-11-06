const more = document.getElementById("more");
document.getElementById("more-toggle").onclick = (e) => {
  e.target.replaceWith(more);
  more.hidden = false;
};

for (const b of document.querySelectorAll(".note-toggle")) {
  b.onclick = () => document.getElementById(b.dataset.note).toggleAttribute("hidden");
}

const email = document.getElementById("copy-email");
const label = email.textContent;
email.onclick = async () => {
  try {
    await navigator.clipboard.writeText(email.dataset.email);
  } catch {
    return (email.textContent = email.dataset.email);
  }
  email.textContent = "copied!";
  setTimeout(() => (email.textContent = label), 1500);
};
