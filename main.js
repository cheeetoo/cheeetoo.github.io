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
  setTimeout(() => (copyEmail.textContent = "Email me"), 1500);
});

const reading = document.getElementById("reading");
fetch("reading.txt")
  .then((r) => (r.ok ? r.text() : ""))
  .then((text) => {
    const list = reading.querySelector("ul");
    const thisYear = String(new Date().getFullYear());
    const entries = text
      .split("\n")
      .map((line, i) => ({ line: line.trim(), i }))
      .filter(({ line }) => line && !line.startsWith("#"))
      .map(({ line, i }) => {
        const starred = line.startsWith("*");
        const [date, title, url] = line.replace(/^\*\s*/, "").split("|").map((s) => s.trim());
        return { date, title, url, starred, i };
      })
      .sort((a, b) => b.date.localeCompare(a.date) || b.i - a.i);
    for (const { date, title, url, starred } of entries) {
      const [year, month, day] = date.split("-");
      const time = document.createElement("time");
      time.dateTime = date;
      time.textContent = new Date(year, month - 1).toLocaleString("en", { month: "short" });
      if (day) time.textContent += ` ${Number(day)}`;
      if (year !== thisYear) time.textContent += ` ${year}`;
      const name = document.createElement(url ? "a" : "span");
      name.textContent = title;
      if (url) name.href = url;
      const li = document.createElement("li");
      li.append(time, " ", name, starred ? " ★" : "");
      list.append(li);
    }
    reading.hidden = !entries.length;
  });
