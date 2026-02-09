document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
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
    const pageMainTitle = document.querySelector("#firstview .js-page-main-title");
    const pageSubTitle  = document.querySelector("#firstview .js-page-sub-title");
    const mainChars = wrapChars(pageMainTitle);
    const subChars  = wrapChars(pageSubTitle);
    //Main Title Animation Set
    gsap.set([mainChars, subChars], {
        autoAlpha: 0,
        y: 30,
        rotationX: -45,
        filter: "blur(20px)",
        transformPerspective: 600,
        transformOrigin: "50% 50%",
    });
    
    const firstviewTl = gsap.timeline();
    firstviewTl.to(
        firstview, {
            WebkitMaskImage: "radial-gradient(circle at center, black 0%, black 100%, transparent 110%)" ,
            duration: 1,
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

    if(linePath__problems) {
        const pathLength__problems = linePath__problems.getTotalLength();
        gsap.set(linePath__problems, {
            strokeDasharray:  pathLength__problems,
            strokeDashoffset: pathLength__problems
        });
        gsap.to(linePath__problems, {
            scrollTrigger: { 
                trigger: mainImage__problems,
                start: "top 60%",
                end: "bottom 90%",
                scrub: 1,
                onLeave: self => self.disable(false, true),
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
    const cardsContainer = document.querySelector("#feature .container .js-cards-container");
    const linePath__feature = document.querySelector("#feature .pc.js-line-svg .js-path");
    const linePath__feature__sp = document.querySelector("#feature .sp.js-line-svg .js-path");

    //ライン - pc
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
                onLeave: self => self.disable(false,true),
            },
            strokeDashoffset: 0,
            
        });
    }
    //ライン - sp
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
                onLeave: self => self.disable(false, true),
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
        },
    });
    featureTitleTl
    .to(featureTitleChars, {
        scaleY: 1,
        duration: 0.6,
        ease: "back.out(4)",
        stagger: 0.09,
    })
    .to(featureTitle, {
        "--pseudo-opacity": 1,
        duration: 0.6,
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
    //First Section
    const programTitle = document.querySelector("#program .container .catch .js-program-title");
    const programTitleChars = wrapChars(programTitle);
    gsap.set(programTitleChars, {
        display: "inline-block",
        x: "14rem",
        autoAlpha: 0,
        filter: "blur(20px)",
        willChange: "transform",
    });
    gsap.set("#program .js-container", {
        backgroundColor: "transparent"
    });
    gsap.set([
        "#program .container .inner .js-intro",
        "#program .container .inner .js-box-container",
    ],{ xPercent: 50,
        autoAlpha: 0,
        filter: "blur(20px)",
        willChange: "transform"
    });
    
    const programTitleTl = gsap.timeline({
        scrollTrigger: {
            trigger: programTitle,
            start: "top 80%",
        }
    });
    programTitleTl
    .to("#program .js-container", {
        backgroundColor: "#b3c5db",
        duration: 2,
    })
    .to(programTitleChars, {
        x: 0,
        autoAlpha: 1,
        filter: "blur(0px)",
        duration: 0.6,
        stagger: 0.05,
        ease: "power3.out"
    }, "<")
    .from("#program .container .catch .js-program-sub-title", {
        y: "1rem",
        autoAlpha: 0,
        filter: "blur(20px)",
        duration: 0.6
    }, ">-0.3")
    .to(programTitle, {
        "--pseudo-opacity": 1,
        duration: 1,
    }, "<")
    .to("#program .container .inner .js-intro", {
        xPercent: 0,
        autoAlpha: 1,
        filter: "blur(0px)",
        ease: "power3.out",
        duration: 0.6,
    }, "-=1")
    .to("#program .container .inner .js-box-container", {
        xPercent: 0,
        autoAlpha: 1,
        filter: "blur(0px)",
        ease: "power3.out",
        duration: 0.6,
    }, "-=0.8");

    //Second Section
    const linePath__program = document.querySelector("#program .pc.js-line-svg .js-path");
    const linePath__program__sp = document.querySelector("#program .sp.js-line-svg .js-path");

    //ライン - pc
    if(linePath__program) {
        const pathLength__program = linePath__program.getTotalLength();
        gsap.set(linePath__program, {
            strokeDasharray:  pathLength__program,
            strokeDashoffset: pathLength__program
        });
        gsap.to(linePath__program, {
            scrollTrigger: { 
                trigger: "#program .domains",
                start: "top 55%",
                end: "bottom 40%",
                scrub: 1,
                onLeave: self => self.disable(false,true),
            },
            strokeDashoffset: 0,
        });
    }
    //ライン - sp
    if(linePath__program__sp) {
        const pathLength__program__sp = linePath__program__sp.getTotalLength();
        gsap.set(linePath__program__sp, {
            strokeDasharray: pathLength__program__sp,
            strokeDashoffset: pathLength__program__sp,
        });
        gsap.to(linePath__program__sp, {
            scrollTrigger: {
                trigger: "#program .domains",
                start: "top 40%",
                end: "bottom 40%",
                scrub: 1,
                onLeave: self => self.disable(false,true),
                markers: true,
            },
            strokeDashoffset: 0,
        })
    }

    const domainsTl = gsap.timeline({
        scrollTrigger: {
            trigger: "#program .domains",
            start: "top 80%",
        }
    });
    domainsTl
    .fromTo("#program .domains .js-domains-head", 
        {y: "2rem", autoAlpha: 0, filter: "blur(20px)"},
        {y: 0, autoAlpha: 1, filter: "blur(0px)", duration: 0.6},
    ).fromTo("#program .domains .domain-wrap",
        { rotation: 720, autoAlpha: 0, filter: "blur(20px)"},
        { rotation: 0, autoAlpha: 1, filter: "blur(0px)", duration: 1.5, ease: "power4.out" }
    )
    
    const objs = gsap.utils.toArray("#program .domains .obj");
    const paramsForObjs = objs.map((_, i) => ({
        phase: (i + 1)  * 0.8,
        radius: 100 - ((i + 1)* 10),
        speed: 1 + i * 0.1
    }));
    const setters = objs.map(obj => 
        gsap.quickSetter(obj, "y", "px")
    );
    let rotationDegree = 0;
    let radian = 0;
    gsap.ticker.add(trigonometry)
    function trigonometry(time) {
        setters.forEach((setY, i) => {
            const { phase, radius, speed } = paramsForObjs[i];
            setY(Math.sin(time * speed * 0.15 * phase) * radius * 0.8);
        });
        rotationDegree += 0.5;
        radian = rotationDegree * (Math.PI / 180);
        gsap.set(objs, {
            rotation: Math.cos(radian) * 45,
            stagger: 1
        });
    }

//Voice Section
    const voiceTl = gsap.timeline({
        scrollTrigger: {
            trigger: "#voice .container",
            start: "top 80%",
        }
    });
    voiceTl
    .from("#voice .container .js-catch", {
        y: "3rem",
        autoAlpha: 0,
        filter: "blur(20px)",
        duration: 0.6,
        ease: "power2.out"
    })
    .to("#voice .container .catch .js-voice-title", {
        "--transform-scale": "scale(1.0)",
        duration: 0.6,
        ease: "back.out(4)"
    })
    .to("#voice .container .catch .js-voice-title", {
        "--transform-scale": "scale(1.0) rotate(25deg)",
        yoyo: true,
        repeat: -1,
        repeatDelay: 0.6,
        ease: "power2.inOut"
    })

//Faq Section
    const faqTl = gsap.timeline({
        scrollTrigger: {
            trigger: "#faq .container",
            start: "top 80%",
        }
    });
    faqTl
    .from("#faq .container .js-catch", {
        y: "3rem",
        autoAlpha: 0,
        filter: "blur(20px)",
        duration: 0.6,
        ease: "power2.out"
    })
    .to("#faq .container .catch .js-faq-text", {
        "--transform-scale": "scale(1.0)",
        duration: 0.6,
        ease: "back.out(4)"
    })
    .to("#faq .container .catch .js-faq-text", {
        "--transform-scale": "scale(1.0) rotate(-25deg)",
        yoyo: true,
        repeat: -1,
        repeatDelay: 0.6,
        ease: "power2.inOut"
    });

//Cta Section
    const star = document.querySelector("#cta .star");
    const starPath = document.querySelector(".cta #motionPath-star");
    gsap.set(star, {
        motionPath: {
            path: starPath,
            align: starPath,
            alignOrigin: [0.5, 0.5],
            autoRotate: true,
            start: 0,
            end: 1
        },
        autoAlpha: 0
    });
    const ctaStarTl = gsap.timeline({
        scrollTrigger: {
            trigger: "#cta",
            start: "top 80%",
        },
        onComplete: () => {
            gsap.set(star, { clearProps: "all" });
            gsap.fromTo(star, {autoAlpha: 0},{autoAlpha: 1})
        }
    });
    
    ctaStarTl
    .to(star, { autoAlpha: 0.7, duration: 0.5 })
    .to(star, {
        motionPath: {
            path: "#motionPath-star",
            align: "#motionPath-star",
            alignOrigin: [0.5, 0.5],
            autoRotate: false,
            start: 0.2,
            end: 0.9
        },
        rotationZ: 720,
        rotationX: -720,
        duration: 3.5,
        ease: "power2.Out"
    }, "-=0.5")
    .to(star, { autoAlpha: 0, duration: 0.5, ease: "power1.out" }, "-=1")

    const ctaTl = gsap.timeline({
        scrollTrigger: {
            trigger: "#cta",
            start: "top 80%",
        },
    });
    ctaTl
    .from("#cta .js-catch", {
        y: "3rem",
        autoAlpha: 0,
        filter: "blur(20px)",
        duration: 0.6,
        ease: "power2.out"
    })
    .to("#cta .catch .js-cta-text", {
        "--transform-scale": "scale(1.0)",
        duration: 0.6,
        ease: "back.out(4)"
    })
    .to("#cta .catch .js-cta-text", {
        "--transform-scale": "scale(1.0) rotate(20deg)",
        yoyo: true,
        repeat: -1,
        repeatDelay: 0.6,
        ease: "power2.inOut"
    });
});

window.addEventListener("load", () => {
  ScrollTrigger.refresh();
});
document.fonts?.ready.then(() => {
  ScrollTrigger.refresh();
});