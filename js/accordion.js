const listItems = [...document.querySelectorAll(".js-list-item")];
const icons = [...document.querySelectorAll(".js-icon")];
const listContents = [...document.querySelectorAll(".js-inner-list")];

const openAnime = (list, isClosing, isDelay = false) => {
  const height = list.scrollHeight;
  const keyframes = isClosing
   ? [{ height: height + "px" }, { height: 0 }]
   : [{ height: 0 }, { height: height + "px" }];
  const timing = { duration: 200, easing: "ease-in", fill: "both", delay: isDelay ? 90 : 0 };
  const effect = new KeyframeEffect(list, keyframes, timing);
  const animation = new Animation(effect, document.timeline);
  return animation;
};

const rotationAnime = (icon, isClosing, isDelay = false) => {
  const keyframes = isClosing
   ? [{ transform: "rotate(45deg)" }]
   : [{ transform: "rotate(180deg)" }];
  const timing = { duration: 200, easing: "ease-in", fill: "both", delay: isDelay ? 90 : 0 };
  const effect = new KeyframeEffect(icon, keyframes, timing);
  const animation = new Animation(effect, document.timeline);
  return animation;
};

const listItemAnime = (listItem, isClosing, isDelay = false, index = 0) => {
  const keyframes = isClosing
   ? [{ transform: "translate(0px)", opacity: 1 }, { transform: "translate(15px, 10px)", opacity: 0 }]
   : [{ transform: "translate(15px, 10px)", opacity: 0 },{ transform: "translate(0px)", opacity: 1 }];
  const timing = { duration: 200, easing: "ease-in", fill: "both", delay: isDelay ? 90 * 0.9 * index : 0 };
  const effect = new KeyframeEffect(listItem, keyframes, timing);
  const animation = new Animation(effect, document.timeline);
  return animation;
};

listItems.forEach((listItem, index) => {
  listItem.addEventListener("click", (e) => {
    const targetIcon = e.currentTarget.querySelector(".js-icon");
    const targetInnerList = e.currentTarget.querySelector(".js-inner-list");
    const targetList = e.currentTarget;
    // const otherOpenedList = listItems.find((content) => content !== e.currentTarget && content.dataset.open === "opened");
    // const otherInnerList = otherOpenedList?.querySelector(".js-inner-list");
    // const otherIcon = otherOpenedList?.querySelector(".js-icon");
    if(listItem.dataset.open === "closed") {
      const animes = [
        rotationAnime(targetIcon, false),
        openAnime(targetInnerList, false),
      ];
      // if(otherOpenedList){
      //   const otherInnerListAnimations = [];
      //   const otherInnerListItems = [...otherOpenedList.querySelectorAll(".js-inner-list-item")];
      //   otherInnerListItems.forEach((otherInnerListItem, index) => {
      //     animes.push(listItemAnime(otherInnerListItem, true, false, index));
      //   });
      // }
      Promise.all(
        animes.map((anime) => {
          anime.play();
          return anime.finished;
        })
      ).then(() => {
        const innerListAnimations = [];
        const innerListItems = listItem.querySelectorAll(".js-inner-list-item");
        innerListItems.forEach((innerListItem, index) => {
          const innerListAnime = listItemAnime(innerListItem, false, true, index);
          innerListAnimations.push(innerListAnime);
        });
        // if(otherOpenedList){
        //   innerListAnimations.push(rotationAnime(otherIcon, true)); 
        //   innerListAnimations.push(openAnime(otherInnerList, true));
        // }
        innerListAnimations.forEach((innerListAnime) => {
          innerListAnime.play();
        });
      });
      listItem.dataset.open = "opened";
      // if(otherOpenedList) {
      //   otherOpenedList.dataset.open = "closed";
      // }
    } else if(listItem.dataset.open === "opened") {
      const innerListAnimations = [];
      const innerListItems = listItem.querySelectorAll(".js-inner-list-item");
      innerListItems.forEach((innerListItem, index) => {
        const innerListAnime = listItemAnime(innerListItem, true);
        innerListAnimations.push(innerListAnime);
      });
      Promise.all(
        innerListAnimations.map((innerListAnime, index) => {
          innerListAnime.play();
          return innerListAnime.finished;
        })
      ).then(() => {
        const animes = [openAnime(targetInnerList, true), rotationAnime(targetIcon, true)];
        animes.forEach(anime => {
          anime.play();
        });
        listItem.dataset.open = "closed";
      });      
    }
  });
});
  

