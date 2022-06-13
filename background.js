function getRecords() {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(["logs"], (data) => {
      if (data.logs) {
        resolve(data.logs);
      } else {
        resolve([]);
      }
    });
  });
}
all_logs = [];
function setRecord(logs) {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.set({ logs }, (data) => {
      resolve();
    });
  });
}

async function addRecord(description) {
  const records = await getRecords();
  records.push({ description, date: Date.now() });
  await setRecord(records);
}
chrome.runtime.onMessage.addListener(async (request) => {
  console.log("here");
  if (request.message === "add") {
    await addRecord(request.data.description);
    chrome.runtime.sendMessage({
      message: "added",
    });
  } else if (request.message === "fetch records") {
    console.log("I got Hi");
  }
});
