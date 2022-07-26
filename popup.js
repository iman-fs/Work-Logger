const btn = document.getElementById("btn");
const error = document.getElementById("error");
const title_el = document.getElementById("title");
const body_el = document.getElementById("body");
const spent_hours_el = document.getElementById("spent-hours");

// listen for actions
chrome.runtime.onMessage.addListener((request) => {
  if (request.action === "added") {
    window.close();
  } else if (request.action === "reading") {
    alert("reading records");
  }
});

btn.addEventListener("click", () => {
  const title = title_el.value;
  const body = body_el.value;
  const spent_hours = spent_hours_el.value;
  let errors = [];

  if (!title) {
    errors.push("title");

  }

  if (!body) {
    errors.push("description");
  }

  if (!spent_hours) {
    errors.push("spent_hours");
  }

  if (errors.length > 0) {
    error.innerHTML = "";
    errors.forEach((err) => {
      error.innerHTML += `<li>${err} is required</li>`;
    }
    );

    return;
  }
  console.log("end")
  chrome.runtime.sendMessage({
    action: "add",
    data: {
      title,
      body,
      spent_hours,
    },
  });
});
