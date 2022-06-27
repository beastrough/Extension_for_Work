chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.id === "urlRequest") {
      if (document.location.href.split("/id/")[0] === "https://content-vimbox.skyeng.ru/cms/step/update") {
        let link = document.querySelector(".p-cms-step__step-navigation-go-ff").getAttribute("href");
        let resp = {method:"direct", url:link};
        sendResponse(resp);
      }
      else if (document.location.href.split("/id/")[0] === "https://content-vimbox.skyeng.ru/cms/step-store/update") {
        let fetchLink = document.querySelector(".p-cms-stepStore ").querySelector("a").getAttribute("href").split("?")[0];
        let prevId = fetchLink.split("/id/")[1];
        let resp = {method:"fetch", url:prevId};
        sendResponse(resp);
      }
    }
    return true;
  }
);