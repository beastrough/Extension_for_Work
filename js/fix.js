var launch = document.getElementById("launch");

// когда кнопка нажата — находим активную вкладку и запускаем нужную функцию
launch.addEventListener("click", async () => {
  // получаем доступ к активной вкладке
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  let frames = await chrome.webNavigation.getAllFrames({tabId: tab.id});
  if ((tab.url.split("/id/")[0] === "https://content-vimbox.skyeng.ru/cms/step/update") || (tab.url.split("/id/")[0] === "https://content-vimbox.skyeng.ru/cms/step-store/update")) {
    // выполняем скрипт
    let frame0 = frames[0].frameId;
    chrome.scripting.executeScript({
    // скрипт будет выполняться во вкладке, которую нашли на предыдущем этапе
    // вызываем нужную функцию
      target: {
        tabId: tab.id,
        frameIds: [frame0],
      },
      files: ["js/sendNextSlide.js"]
    });
    let frame1 = frames[1].frameId;
    chrome.scripting.executeScript({
    // скрипт будет выполняться во вкладке, которую нашли на предыдущем этапе
    // вызываем нужную функцию
      target: {
        tabId: tab.id,
        frameIds: [frame1],
      },
      files: ["js/blocksScript.js"]
    });
  }

  else if (tab.url.split("/id/")[0] === "https://content-vimbox.skyeng.ru/resource/audio/edit") {
    let frame0 = frames[0].frameId;
    chrome.scripting.executeScript({
    // скрипт будет выполняться во вкладке, которую нашли на предыдущем этапе
    // вызываем нужную функцию
      target: {
        tabId: tab.id,
        frameIds: [frame0],
      },
      files: ["js/fixResource.js"]
    });
  }

  else alert("Open the resource manager or the step editor");

  chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
      if (request.id === "msg1") {
        let img = String(request.imageId);
        if ((img.toLowerCase() !== "null") || (desktop !== "")) {
          fetch("https://content-vimbox.skyeng.ru/resource/image/edit/id/" + img)
            .then(desktopRes => desktopRes.text())
            .then(imgLink => sendResponse(imgLink.slice(imgLink.indexOf("<img src=") + 10, imgLink.indexOf("?width="))));
        }
      }
      if (request.id === "msg2") {
        chrome.tabs.sendMessage(tab.id, {id:"urlRequest"}, function(response) {
          let lnk = response;
          if (lnk.method === "direct") {
            sendResponse(lnk.url);
          }
          else if (lnk.method === "fetch") {
            fetch("https://content-vimbox.skyeng.ru/cms/step/update/id/" + lnk.url)
              .then(nextRes => nextRes.text())
              .then(nextLink => sendResponse("/cms/step/update/id/" + nextLink.split("p-cms-step__step-navigation-goto\" ")[1].split("p-cms-step__step-navigation-go-ff")[0].split(lnk.url)[1].split(",")[1]));
          }
        });
      }
      return true;
    }
  );
});