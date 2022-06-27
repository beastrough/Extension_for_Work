if ((document.querySelector("vim-test-image") || document.querySelector("vim-image-set") || document.querySelector("vim-image-set-interactive") || document.querySelector("vim-dnd-image-set") || document.querySelector("vim-dnd-image-audio")) !== null) {
  document.querySelector(".b-vc-step__container").style.padding = "10px 10px 70px";
}

if (document.querySelector("temp-vim-next-slide-button") !== null) {
  let elStyle = document.createElement("link");
  elStyle.setAttribute("rel", "stylesheet");
  let elClass = chrome.runtime.getURL("../css/vimButtonStyles.css");
  elStyle.setAttribute("href", elClass);
  document.querySelector("head").append(elStyle);
  let btns = document.querySelectorAll("temp-vim-next-slide-button");
  for (let i = 0; i < btns.length; ++i) {
    let btnLink = btns[i].getAttribute("uuid");
    let link = document.createElement("a");
    link.setAttribute("target", "_blank");
    if ((btnLink === "") || (btnLink === null)) {
      chrome.runtime.sendMessage({id:"msg2"}, function (response) {
        let address = response;
        link.setAttribute("href", "https://content-vimbox.skyeng.ru" + address);
      });
    }
    else link.setAttribute("href", "https://content-vimbox.skyeng.ru/cms/step-store/update/id/" + btnLink);
    let btnCaption = btns[i].getAttribute("title");
    if ((btnCaption === "") || (btnCaption === null)) link.innerText = "Next" 
    else link.innerText = String(btnCaption);
    link.className = "vim-button";
    btns[i].append(link);
  }
}

if ((document.querySelector("vim-autopilot-lesson-plan") !== null) || (document.querySelector("ma-autopilot-lesson-plan") !== null) || (document.querySelector("vim-autopilot-placeholder-image") !== null) || (document.querySelector("vim-autopilot-teacher-stub") !== null)) {
  let styles = document.createElement("link");
  styles.setAttribute("rel", "stylesheet");
  let autopilotStyle = chrome.runtime.getURL("../css/autopilotPlanStyles.css");
  styles.setAttribute("href", autopilotStyle);
  document.querySelector("head").append(styles);
  let lessonTag = ((document.querySelector("vim-autopilot-lesson-plan") ?? document.querySelector("ma-autopilot-lesson-plan")) ?? document.querySelector("vim-autopilot-placeholder-image")) ?? document.querySelector("vim-autopilot-teacher-stub");
  let contentContainer = document.querySelector(".b-vc-step__container");
  contentContainer.classList.add("contentContainer");
  let planContainer = document.createElement("aside");
  planContainer.className = "planContainer";
  contentContainer.parentNode.insertBefore(planContainer, contentContainer);
  planContainer.appendChild(lessonTag);
  let mainContainer = document.createElement("div");
  planContainer.parentNode.insertBefore(mainContainer, planContainer);
  mainContainer.appendChild(planContainer);
  mainContainer.appendChild(contentContainer);
  let mobileScreen = document.location.href.split("?")[1].indexOf("forceMobile=true");
  if (mobileScreen === -1) {
    mainContainer.className = "mainContainer";
    planContainer.classList.add("planContainer_desktop");
  }
  if (lessonTag.tagName.toLowerCase() === "vim-autopilot-teacher-stub") {
    let stubContainer = document.createElement('div');
    stubContainer.className = "stubContainer";
    lessonTag.append(stubContainer);
    let stubTitle = document.createElement('h2');
    stubTitle.className = "stubTitle";
    stubTitle.innerText = lessonTag.getAttribute("title");
    stubContainer.append(stubTitle);
    let stubSubtitle = document.createElement('h3');
    stubSubtitle.className = "stubSubtitle";
    stubSubtitle.innerText = lessonTag.getAttribute("description");
    stubContainer.append(stubSubtitle);
  }
  if ((lessonTag.tagName.toLowerCase() === "vim-autopilot-lesson-plan") || (lessonTag.tagName.toLowerCase() === "ma-autopilot-lesson-plan")) {
    let lessonPlan = JSON.parse(lessonTag.getAttribute("items"));
    let containerTitle = document.createElement('h2');
    containerTitle.className = "containerTitle";
    lessonTag.append(containerTitle);
    containerTitle.innerText = 'Lesson plan';
    for (let i = 0; i < lessonPlan.length; ++i) {
      let planItem = document.createElement("div");
      lessonTag.append(planItem);
      planItem.className = "planItem";
      let planTitle = document.createElement("h3");
      planTitle.className = "planTitle";
      planItem.append(planTitle);
      planTitle.innerText = lessonPlan[i].title;
      let planSubtitle = document.createElement("h4");
      planSubtitle.className = "planSubtitle";
      planItem.append(planSubtitle);
      planSubtitle.innerText = lessonPlan[i].subtitle;
    }

    let currentItem = lessonTag.getAttribute("current-item-index");
    let planItems = lessonTag.querySelectorAll(".planItem");
    let titles = lessonTag.querySelectorAll(".planTitle");
    for (let i = 0; i < currentItem - 1; ++i) {
      planItems[i].classList.add("img-checked");
    }
    planItems[currentItem - 1].classList.add("img-empty");
    titles[currentItem - 1].classList.add("planTitle_current-color");
    for (let i = currentItem; i < lessonPlan.length; ++i) {
      planItems[i].classList.add("img-empty");
      titles[i].classList.add("planTitle_next-color");
    }
  }

  else if (lessonTag.tagName.toLowerCase() === "vim-autopilot-placeholder-image") {
    let sideImg = document.createElement("img");
    sideImg.className = "sideImg";
    planContainer.append(sideImg);
    let imgId;
    if (mobileScreen === -1) {
      imgId = document.querySelector("vim-autopilot-placeholder-image").getAttribute("resource-id");
    } 
    else if (mobileScreen !== -1) {
      imgId = document.querySelector("vim-autopilot-placeholder-image").getAttribute("mobile-resource-id");
    }
    chrome.runtime.sendMessage({id:"msg1",imageId:imgId}, function (response) {
      let imgLink = response;
      sideImg.setAttribute("src", imgLink);
    });
  }
}

if (document.querySelector("span[vim-grammar-color]") !== null) {
  let gramStyles = document.createElement("link");
  gramStyles.setAttribute("rel", "stylesheet");
  let gramFile = chrome.runtime.getURL("../css/grammarCard.css");
  gramStyles.setAttribute("href", gramFile);
  document.querySelector("head").append(gramStyles);
}

if (document.querySelector("vim-autopilot-test-image-item") !== null) {
  let testStyles = document.createElement("link");
  testStyles.setAttribute("rel", "stylesheet");
  let testFile = chrome.runtime.getURL("../css/autopilotTestImage.css");
  testStyles.setAttribute("href", testFile);
  document.querySelector("head").append(testStyles);
  let testContainer = document.querySelectorAll("vim-autopilot-test-image");
  testContainer.className = "testContainer";
  let allImages = document.querySelectorAll("vim-autopilot-test-image-item");
}