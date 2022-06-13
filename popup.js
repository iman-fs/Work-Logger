const btn = document.getElementById("btn");
const error = document.getElementById("error");
const input = document.getElementById("log-body");

chrome.runtime.onMessage.addListener((request) => {
  if (request.message === "added") {
    alert("sucess");
  } else if (request.message === "reading") {
    alert("reading records");
  }
});

btn.addEventListener("click", () => {
  const description = input.value;
  if (!description) {
    error.innerText = "please fill the description";
    return;
  }
  chrome.runtime.sendMessage({
    message: "add",
    data: {
      description,
    },
  });
});
