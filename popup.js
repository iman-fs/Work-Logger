const btn = document.getElementById("btn");
const error = document.getElementById("error");
const input = document.getElementById("log-body");

// listen for actions
chrome.runtime.onMessage.addListener((request) => {
  if (request.action === "added") {
    window.close();
  } else if (request.action === "reading") {
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
    action: "add",
    data: {
      description,
    },
  });
});
