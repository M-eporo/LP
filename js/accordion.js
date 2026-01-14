const listItems = [...document.querySelectorAll(".js-list-item")];

const openAnime = (panel, isClosing, isDelay = false) => {
  const height = panel.scrollHeight;
  const keyframes = isClosing
    ? [{ height: height + "px" }, { height: 0 }]
    : [{ height: 0 }, { height: height + "px" }];

  const timing = {
    duration: 200,
    easing: "ease-in",
    fill: "both",
    delay: isDelay ? 90 : 0,
  };

  return new Animation(new KeyframeEffect(panel, keyframes, timing), document.timeline);
};

const rotationAnime = (icon, isClosing, isDelay = false) => {
  const keyframes = isClosing
    ? [{ transform: "rotate(45deg)" }]
    : [{ transform: "rotate(180deg)" }];

  const timing = {
    duration: 200,
    easing: "ease-in",
    fill: "both",
    delay: isDelay ? 90 : 0,
  };

  return new Animation(new KeyframeEffect(icon, keyframes, timing), document.timeline);
};

const listItemAnime = (item, isClosing, isDelay = false, index = 0) => {
  const keyframes = isClosing
    ? [{ transform: "translate(0px)", opacity: 1 }, { transform: "translate(15px, 10px)", opacity: 0 }]
    : [{ transform: "translate(15px, 10px)", opacity: 0 }, { transform: "translate(0px)", opacity: 1 }];

  const timing = {
    duration: 200,
    easing: "ease-in",
    fill: "both",
    delay: isDelay ? 90 * 0.9 * index : 0,
  };

  return new Animation(new KeyframeEffect(item, keyframes, timing), document.timeline);
};

listItems.forEach((li) => {
  const button = li.querySelector(".accordion-header");
  const panel = li.querySelector(".js-inner-list");

  if (!button || !panel) return;

  const isOpened = li.dataset.open === "opened";
  button.setAttribute("aria-expanded", isOpened ? "true" : "false");

  if (isOpened) {
    panel.removeAttribute("hidden");
  } else {
    panel.setAttribute("hidden", "");
  }
});

const openItem = async (li) => {
  const button = li.querySelector(".accordion-header");
  const icon = li.querySelector(".js-icon");
  const panel = li.querySelector(".js-inner-list");
  if (!button || !panel || !icon) return;

  panel.removeAttribute("hidden");

  const animes = [
    rotationAnime(icon, false),
    openAnime(panel, false),
  ];

  await Promise.all(
    animes.map((a) => {
      a.play();
      return a.finished;
    })
  );

  const innerItems = [...li.querySelectorAll(".js-inner-list-item")];
  innerItems.forEach((innerItem, idx) => {
    const a = listItemAnime(innerItem, false, true, idx);
    a.play();
  });

  
  li.dataset.open = "opened";
  button.setAttribute("aria-expanded", "true");
};

const closeItem = async (li) => {
  const button = li.querySelector(".accordion-header");
  const icon = li.querySelector(".js-icon");
  const panel = li.querySelector(".js-inner-list");
  if (!button || !panel || !icon) return;

  const innerItems = [...li.querySelectorAll(".js-inner-list-item")];
  const innerAnimes = innerItems.map((innerItem) => listItemAnime(innerItem, true));

  await Promise.all(
    innerAnimes.map((a) => {
      a.play();
      return a.finished;
    })
  );

  const animes = [openAnime(panel, true), rotationAnime(icon, true)];
  animes.forEach((a) => a.play());

  const closePanelAnime = animes[0];
  closePanelAnime.finished.then(() => {
    panel.setAttribute("hidden", "");
  });

  li.dataset.open = "closed";
  button.setAttribute("aria-expanded", "false");
};

listItems.forEach((li) => {
  const button = li.querySelector(".accordion-header");
  if (!button) return;

  button.addEventListener("click", async () => {
    const isOpened = li.dataset.open === "opened";
    if (isOpened) {
      await closeItem(li);
    } else {
      await openItem(li);
    }
  });
});
