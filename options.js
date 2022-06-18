//listen for actions from other pages
chrome.runtime.onMessage.addListener(async (request) => {
  //recieve logs from background.js
  if (request.action === "logsSent") {
    render(request.logs);
  }
});


chrome.runtime.sendMessage({
  action: "fetchAll",
});


function render(logs) {
  console.log(logs)
  const el = document.getElementById("log_table");
  el.innerHTML = `          
    <tr>
      <td colspan="3">loading logs...</td>
    </tr>
  `;


  content = logs.length === 0 ? `          
  <tr>
    <td colspan="3">no logs added yet</td>
  </tr>
` : ``
  logs.forEach((log) => {
    date = new Date(log.date).toLocaleDateString();
    content += `          
    <tr>
      <td class="lalign">${log.description}</td>
      <td>${date}</td>
      <td>action</td>
    </tr>
  `
  })

  el.innerHTML = content;
}

function test() {
  console.log("delete button clicked")
}

