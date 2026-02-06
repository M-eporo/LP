document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    // 1文字ずつspan化 - <br>保持
    const wrapChars = (el) => {
        if (!el) return [];

        // すでに処理済みなら二重にしない
        if (el.dataset.charsWrapped === "1") {
            return Array.from(el.querySelectorAll(".char"));
        }
        el.dataset.charsWrapped = "1";

        // 子ノードを走査して、テキストノードだけを分解
        const nodes = Array.from(el.childNodes);
        const frag = document.createDocumentFragment();

        nodes.forEach((node) => {
            if (node.nodeType === Node.TEXT_NODE) {
            // 改行やスペースも含めて1文字ずつ
            Array.from(node.textContent).forEach((ch) => {
                const span = document.createElement("span");
                span.className = "char";
                // 半角スペースが潰れないように
                span.textContent = ch === " " ? "\u00A0" : ch;
                frag.appendChild(span);
            });
            } else if (node.nodeType === Node.ELEMENT_NODE) {
            // <br> など要素ノードはそのまま残す
            frag.appendChild(node);
            }
        });

      el.textContent = "";
      el.appendChild(frag);

      return Array.from(el.querySelectorAll(".char"));
    };
//Header, Firstview
    // const cover = document.querySelector(".js-intro-cover");
    const firstview = document.querySelector(".firstview .bg");
    const logo = document.querySelector(".header .container .js-logo");
    const navItems = document.querySelectorAll(".header .container .inner .pc-nav .pc-sns .js-sns-item");
    const primaryBtn = document.querySelector(".header .container .inner .js-primary-btn");
    const headerItems = [...navItems, primaryBtn];
    //Header Animation Set
    gsap.set([logo, ...headerItems], {
        autoAlpha: 0,
        x: -20,
        filter: "blur(20px)",
    });
    //Firstview Animation Set
    gsap.set(firstview, { 
        WebkitMaskImage: "radial-gradient(circle at center, black 0%, transparent 0%)" 
        }
    );
    // gsap.set(cover, 
    //     { autoAlpha: 1 }
    // );
    const pageMainTitle = document.querySelector("#firstview .js-page-main-title");
    const pageSubTitle  = document.querySelector("#firstview .js-page-sub-title");
    const mainChars = wrapChars(pageMainTitle);
    const subChars  = wrapChars(pageSubTitle);
    //Main Title Animation Set
    gsap.set([...mainChars, ...subChars], {
        autoAlpha: 0,
        y: 30,
        // x: -30,
        rotationX: -45,
        filter: "blur(20px)",
        transformPerspective: 600,
        transformOrigin: "50% 50%",
    });
    
    const firstviewTl = gsap.timeline();
    firstviewTl.to(
        firstview, {
            WebkitMaskImage: "radial-gradient(circle at center, black 0%, black 100%, transparent 110%)" ,
            duration: 0.8,
            ease: "power2.in",
        }
    ).to(
        logo, {
            autoAlpha: 1,
            x: 0,
            filter: "blur(0px)",
            duration: 0.6,
        }, ">-0.4",
    ).to(
        headerItems, {
            autoAlpha: 1,
            x: 0,
            filter: "blur(0px)",
            stagger: 0.1,
            ease: "power2.out",
            duration: 0.8,
        }, ">-0.4"
    ).to(
        mainChars, {
            autoAlpha: 1,
            // x: 0,
            y: 0,
            rotationX: 0,
            filter: "blur(0px)",
            stagger: 0.05,
            ease: "power2.out",
            duration: 0.8,
        }, ">-1"
    ).to(
        subChars, {
            autoAlpha: 1,
            // x: 0,
            y: 0,
            rotationX: 0,
            filter: "blur(0px)",
            stagger: 0.05,
            ease: "power2.out",
            duration: 0.8 ,
        }, "-=1"
    );

//Problems Section
    //Svg Line Animation
    const linePath__problems = document.querySelector("#problems .js-line-svg .js-path");
    const mainImage__problems = document.querySelector("#problems .container .js-img-wrap");
    if(!linePath__problems) return;

    if(linePath__problems) {
        const pathLength__problems = linePath__problems.getTotalLength();
        gsap.set(linePath__problems, {
            strokeDasharray:  pathLength__problems,
            strokeDashoffset: pathLength__problems
        });
        gsap.to(linePath__problems, {
            scrollTrigger: { 
                trigger: mainImage__problems,
                start: "top 70%",
                end: "top 30%",
                scrub: 1,
            },
            strokeDashoffset: 0,
        });
    }

    //Text Animation
    const text__problems = document.querySelectorAll("#problems .container .text-wrap .js-text");   
    const chars__problems = gsap.utils.toArray(text__problems).forEach((text) => {
        const chars = wrapChars(text);
        gsap.from(chars, {
            scrollTrigger: {
                trigger: "#problems .container .js-text-wrap",
                start: "top 90%",
                end: "bottom 30%",
                // toggleActions: "play reverse play reverse"
            },
            visibility: "hidden",
            duration: 0.3,
            stagger: 0.06,
            
        })
    });

//Resolve Section
    const resolve = document.querySelector(".resolve .bg");
    gsap.set(resolve, {
        maskImage: "linear-gradient(180deg, #000 60%, #0000 90%)",
        WebkitMaskImage: "linear-gradient(180deg, #000 60%, #0000 90%)",
        maskSize: "100% 0%",
        WebkitMaskImage: "100% 0%",
        maskPosition: "top",
        WebkitMaskPosition: "top",
    });
    gsap.to(resolve, {
        scrollTrigger: {
            trigger: resolve,
            start: "top 60%",
            
        },
        maskSize: "100% 100%",
        WebkitMaskSize: "100% 100%",
        duration: 2,
        ease: "power2.out",
    })

//About Section
    const about = document.getElementById("about");
    const parent__about = gsap.utils.selector(about);
    const aboutTl = gsap.timeline({
        scrollTrigger: {
            trigger: about,
            start: "top 70%",
        }
    });
    const xMove__about = {
        xPercent: -50,
        filter: "blur(20px)",
        duration: 1.5,
        ease: "power4.out"
    };
    const autoAlpha__about = {
        autoAlpha: 0,
        duration: 1.5,
    }
    aboutTl
    .from(parent__about(".container .js-catch"), xMove__about)
    .from(parent__about(".container .js-catch"), autoAlpha__about, "<")
    .from(parent__about(".container .js-woman-img"), xMove__about, "<")
    .from(parent__about(".container .js-woman-img"), autoAlpha__about, "<")
    .from(parent__about(".container .js-text-wrap"), {...xMove__about, xPercent: 50}, "<")
    .from(parent__about(".container .js-text-wrap"), autoAlpha__about, "<");

//Office Section
    const office = document.getElementById("office");
    const parent__office = gsap.utils.selector(office);
    const texts__office = [parent__office(".container .catch"), parent__office(".container .intro")];
    const officeTl = gsap.timeline({
        scrollTrigger: {
            trigger: office,
            start: "top 50%",
        }
    });
    officeTl
    .from(parent__office(".js-office__splide"), {
        xPercent: -50,
        autoAlpha: 0,
        filter: "blur(20px)",
        duration: 1.5,
        ease: "power4.out"
    })
    .from([...texts__office], {
        xPercent: 50,
        autoAlpha: 0,
        filter: "blur(20px)",
        duration: 1.5,
        ease: "power4.out"
    }, "<");    

//Feature Section
    const feature = document.getElementById("feature");
    const container = document.querySelector("#feature .container");
    const cardsContainer = document.querySelector("#feature .container .js-cards-container");
    const linePath__feature = document.querySelector("#feature .pc.js-line-svg .js-path");
    const linePath__feature__sp = document.querySelector("#feature .sp.js-line-svg .js-path");

    //ライン - pc
    if(!linePath__feature) return;
    if(linePath__feature) {
        const pathLength__feature = linePath__feature.getTotalLength();
        gsap.set(linePath__feature, {
            strokeDasharray:  pathLength__feature,
            strokeDashoffset: pathLength__feature
        });
        gsap.to(linePath__feature, {
            scrollTrigger: { 
                trigger: cardsContainer,
                start: "top 65%",
                end: "bottom 40%",
                scrub: 1,
            },
            strokeDashoffset: 0,
        });
    }
    //ライン - sp
    if(!linePath__feature__sp) return;
    if(linePath__feature__sp) {
        const pathLength__feature__sp = linePath__feature__sp.getTotalLength();
        gsap.set(linePath__feature__sp, {
            strokeDasharray: pathLength__feature__sp,
            strokeDashoffset: pathLength__feature__sp,
        });
        gsap.to(linePath__feature__sp, {
            scrollTrigger: {
                trigger: cardsContainer,
                start: "top 35%",
                end: "bottom 0%",
                scrub: 1,
            },
            strokeDashoffset: 0
        })
    }
    //セクションメインタイトル
    const featureTitle = document.querySelector("#feature .container .catch .js-feature-title");
    const featureTitleChars = wrapChars(featureTitle);
    gsap.set(featureTitleChars, {
        scaleY: 0,
        willChange: "transform",
        transformOrigin: "center bottom",
    });
    const featureTitleTl = gsap.timeline({
        scrollTrigger: {
            trigger: featureTitle,
            start: "top 80%",
            // markers: true,
        },
    });
    featureTitleTl
    .to(featureTitleChars, {
        scaleY: 1,
        duration: 1,
        ease: "back.out(4)",
        stagger: 0.09,
    })
    .to(featureTitle, {
        "--pseudo-opacity": 1,
        duration: 1,
    });
    //セクションコンテンツ
    gsap.utils.toArray([cardsContainer, "#feature .container .js-feature-bottom"])
    .forEach((content) => {
        gsap.set(content, {
            autoAlpha: 0,
            filter: "blur(20px)"
        });
        gsap.to(content, {
            scrollTrigger: {
                trigger: content,
                start: "top 70%",
            },
            autoAlpha: 1,
            filter: "blur(0px)",
            duration: 1.2
        });
    })
    
//Program Section
    const programTitle = document.querySelector("#program .container .catch .js-program-title");
    const programTitleChars = wrapChars(programTitle);
    gsap.set(programTitleChars, {
        x: "14rem",
        autoAlpha: 0,
        filter: "blur(20px)",
        willChange: "transform",
    });
    gsap.set("#program .container", {
        xPercent: 100,
        autoAlpha: 0,
        filter: "blur(20px)",
        willChange: "transform",
    })
    
    const programTitleTl = gsap.timeline({
        scrollTrigger: {
            trigger: programTitle,
            start: "top 80%",
            markers: true,
            toggleActions: "play reverse play reverse"
        }
    });
    programTitleTl
    .to("#program .container", {
        xPercent: 0,
        duration: 1,
        ease: "power4.out"
    })
    .to("#program .container", {
        autoAlpha: 1,
        filter: "blur(0px)",
        duration: 1,
    }, "-=0.5")
    .to(programTitleChars, {
        x: 0,
        autoAlpha: 1,
        filter: "blur(0px)",
        duration: 1,
        stagger: 0.06,
        ease: "power4.out"
    }, "-=0.2")
    .to(programTitle, {
        "--pseudo-opacity": 1,
        duration: 1,
    }, ">")
    
    
});

window.addEventListener("load", () => {
  ScrollTrigger.refresh();
});
document.fonts?.ready.then(() => {
  ScrollTrigger.refresh();
});