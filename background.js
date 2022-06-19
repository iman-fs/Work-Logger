

//listen for actions from other pages
chrome.runtime.onMessage.addListener(async (request) => {
  //new log
  if (request.action === "add") {
    await addRecord(request.data.description);

    // inform popup.js of new insertion
    chrome.runtime.sendMessage({
      action: "added",
    });
  }
  // fetch records requested by options.js
  else if (request.action === "fetchAll") {
    const records = getRecords();
    records.then((all_logs) => {
      chrome.runtime.sendMessage({
        action: "logsSent",
        logs: all_logs,
      });
    });
  }
});



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

getRecords().then((logs) => {
  all_logs = logs;
})




//add one log to local storage
function setRecord(logs) {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.set({ logs }, (data) => {
      resolve();
    });
  });
}

// save new log
async function addRecord(description) {
  const records = await getRecords();
  records.push({ description, date: Date.now() });
  await setRecord(records);
}


// scheduled notifications 
chrome.alarms.create('reminder', {
  when: Date.now(),
  periodInMinutes: 10
});


chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "reminder") {
    chrome.notifications.create('test', {
      type: 'basic',
      iconUrl: 'icon.png',
      title: 'Work Log reminder',
      message: 'Hey, don\'t forget to add your work log!',
      priority: 2
    });

    setTimeout(() => {
      chrome.notifications.clear('test')
    }, 10000);
  }
});




