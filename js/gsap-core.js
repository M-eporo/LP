document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

    const wrapChars = (el) => {
        if (!el) return [];
        if (el.dataset.charsWrapped === "1") {
            return Array.from(el.querySelectorAll(".char"));
        }
        el.dataset.charsWrapped = "1";
        const nodes = Array.from(el.childNodes);
        const frag = document.createDocumentFragment();
        nodes.forEach((node) => {
            if (node.nodeType === Node.TEXT_NODE) {
            Array.from(node.textContent).forEach((ch) => {
                const span = document.createElement("span");
                span.className = "char";
                span.textContent = ch === " " ? "\u00A0" : ch;
                frag.appendChild(span);
            });
            } else if (node.nodeType === Node.ELEMENT_NODE) {
            frag.appendChild(node);
            }
        });
      el.textContent = "";
      el.appendChild(frag);
      return Array.from(el.querySelectorAll(".char"));
    };
    const commonAnimFrom = {
        autoAlpha: 0, filter: "blur(10px)", y: 10
    };
    const commonAnimTo = {
        autoAlpha: 1, filter: "blur(0px)", y: 0, duration: 0.6
    };

//Header, Firstview
    const logo = document.querySelector(".header .container .js-logo");
    const navItems = document.querySelectorAll(".header .container .inner .pc-nav .pc-sns .js-sns-item");
    const primaryBtn = document.querySelector(".header .container .inner .js-primary-btn");
    const headerItems = [...navItems, primaryBtn];
    const hamburgerBtn = document.querySelector(".header .js-hamburger-btn");
    gsap.set([logo, hamburgerBtn, ...headerItems], {
        autoAlpha: 0,
        x: -20,
        filter: "blur(20px)",
    });
    gsap.set("#firstview .bg", { 
        maskImage: "radial-gradient(circle at center, black 0%, transparent 0%)",
        WebkitMaskImage: "radial-gradient(circle at center, black 0%, transparent 0%)" 
        }
    );
    const mainSplide = document.querySelector("#firstview .bg .splide");
    gsap.set(mainSplide, {
        opacity: 0, 
    });
    const yellowMist = document.querySelector("#firstview .bg .text-wrapper .svg-yellow");
    gsap.set(yellowMist, { opacity: 0});

    const pageMainTitle = document.querySelector("#firstview .js-page-main-title");
    const pageSubTitle  = document.querySelector("#firstview .js-page-sub-title");
    const mainChars = wrapChars(pageMainTitle);
    const subChars  = wrapChars(pageSubTitle);

    gsap.set([mainChars, subChars], {
        autoAlpha: 0,
        y: 5,
        rotationX: -90,
        filter: "blur(10px)",
        transformPerspective: 600,
        transformOrigin: "bottom",
    });
    gsap.set("#problems .container .js-catch", {
        autoAlpha: 0,
        y: 10,
        filter: "blur(10px)",
    })
    let mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
        const firstviewTl = gsap.timeline();
        firstviewTl.to("#firstview .bg", {
            maskImage: "radial-gradient(circle at center, black 0%, black 100%, transparent 110%)",
            WebkitMaskImage: "radial-gradient(circle at center, black 0%, black 100%, transparent 110%)" ,
            duration: 1,
            ease: "power2.in",
        }
        ).to(mainSplide, { opacity: 1 }, "<"
        ).to(yellowMist, { opacity: 0.5 }, "<"
        ).to(logo, {
            autoAlpha: 1,
            x: 0,
            filter: "blur(0px)",
            duration: 0.6,
        }, ">-0.4",
        ).to(headerItems, {
            autoAlpha: 1,
            x: 0,
            filter: "blur(0px)",
            stagger: 0.1,
            ease: "power2.out",
            duration: 0.8,
        }, ">-0.4"
        ).to(mainChars, {
            autoAlpha: 1,
            y: 0,
            rotationX: 0,
            filter: "blur(0px)",
            stagger: 0.05,
            ease: "power2.out",
            duration: 0.8,
        }, ">-1"
        ).to(pageMainTitle, { opacity: 1 }, "<"
        ).to(subChars, {
            autoAlpha: 1,
            y: 0,
            rotationX: 0,
            filter: "blur(0px)",
            stagger: 0.05,
            ease: "power2.out",
            duration: 0.8,
        }, "-=1"
        ).to(pageSubTitle, { opacity: 1 }, "<"
        ).to("#problems .container .js-catch", {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.8,
        });
    });
    mm.add("(max-width: 1023px)", () => {
        const firstviewTl = gsap.timeline();
        firstviewTl.to("#firstview .bg", {
            maskImage: "radial-gradient(circle at center, black 0%, black 100%, transparent 110%)",
            WebkitMaskImage: "radial-gradient(circle at center, black 0%, black 100%, transparent 110%)" ,
            duration: 1,
            ease: "power2.in",
        }
        ).to(mainSplide, { opacity: 1 }, "<"
        ).to(yellowMist, { opacity: 0.5 }, "<"
        ).to(logo, {
            autoAlpha: 1,
            x: 0,
            filter: "blur(0px)",
            duration: 0.6,
        }, ">-0.4",
        ).to(hamburgerBtn, {
            autoAlpha: 1,
            x: 0,
            filter: "blur(0px)",
            ease: "power2.out",
            duration: 0.6,
        }, ">-0.4"
        ).to(mainChars, {
            autoAlpha: 1,
            y: 0,
            rotationX: 0,
            filter: "blur(0px)",
            stagger: 0.05,
            ease: "power2.out",
            duration: 0.8,
        }, ">-1"
        ).to(pageMainTitle, { opacity: 1 }, "<"
        ).to(subChars, {
            autoAlpha: 1,
            y: 0,
            rotationX: 0,
            filter: "blur(0px)",
            stagger: 0.05,
            ease: "power2.out",
            duration: 0.8 ,
        }, "-=1"
        ).to(pageSubTitle, { opacity: 1 }, "<"
        ).to("#problems .container .js-catch", {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.8,
        });
    });
//Circle Button
    gsap.from(".circle-btn", {
        scrollTrigger: {
            trigger: "#problems",
            start: "top 0",
            once: true,
        },
        autoAlpha: 0,
    });
//Problems Section
    mm.add("(min-width: 600px)", () => {
        const linePath__problems = document.querySelector("#problems .js-line-svg .js-path");
        const mainImage__problems = document.querySelector("#problems .container .js-img-wrap");
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
        const text__problems = document.querySelectorAll("#problems .container .text-wrap .js-text");   
        const chars = gsap.utils.toArray(text__problems).flatMap((text) => {
            return wrapChars(text);
        });
        gsap.from(chars, {
            scrollTrigger: {
                trigger: "#problems .container .js-text-wrap",
                start: "top 90%",
                end: "bottom 30%",
            },
            visibility: "hidden",
            duration: 0.3,
            stagger: 0.04,
        }, ">");
    });
    mm.add("(max-width: 599px)", () => {
        const linePath__problems = document.querySelector("#problems .js-line-svg .js-path");
        const mainImage__problems = document.querySelector("#problems .container .js-img-wrap");
        const pathLength__problems = linePath__problems.getTotalLength();
        gsap.set(linePath__problems, {
            strokeDasharray:  pathLength__problems,
            strokeDashoffset: pathLength__problems
        });
        gsap.to(linePath__problems, {
            scrollTrigger: { 
                trigger: mainImage__problems,
                start: "top 50%",
                end: "bottom 50%",
                scrub: 1,
                onLeave: self => self.disable(false, true),
            },
            strokeDashoffset: 0,
        });
        const text__problems_first = document.querySelector("#problems .container .text-wrap .js-text:first-child"); 
        const text__problems_last = document.querySelector("#problems .container .text-wrap .js-text:last-child"); 
        const firstChars = wrapChars(text__problems_first);
        const lastChars = wrapChars(text__problems_last);
        const problemsTextTl = gsap.timeline({
            scrollTrigger: {
                trigger: "#problems .container .js-text-wrap",
                start: "top 90%",
                end: "bottom 30%",
            },
        });
        problemsTextTl
            .from(firstChars, {
                visibility: "hidden",
                duration: 0.3,
                stagger: 0.06,
            })
            .from(lastChars, {
                visibility: "hidden",
                duration: 0.3,
                stagger: 0.04,
            }, ">-0.1");
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
    });
//About Section
    mm.add("(min-width: 1024px)", () => {
        const aboutTl = gsap.timeline({
            scrollTrigger: {
                trigger: "#about",
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
        };
        gsap.set("#about .container .catch .js-about-title", {"--pseudo-opacity": 1,})
        aboutTl
        .from(("#about .container .js-catch"), xMove__about)
        .from(("#about .container .js-catch"), autoAlpha__about, "<")
        .from(("#about .container .js-woman-img"), xMove__about, "<")
        .from(("#about .container .js-woman-img"), autoAlpha__about, "<")
        .from(("#about .container .js-text-wrap"), {...xMove__about, xPercent: 50}, "<")
        .from(("#about .container .js-text-wrap"), autoAlpha__about, "<");
    });
    mm.add("(max-width: 1023px)", () => {
        const aboutTitle = document.querySelector("#about .container .catch .js-about-title");
        const aboutTitleChars = wrapChars(aboutTitle);
        gsap.set(aboutTitleChars, {
            scaleY: 0,
            willChange: "transform",
            transformOrigin: "center bottom",
        });
        const aboutTl = gsap.timeline({
            scrollTrigger: {
                trigger: aboutTitle,
                start: "top 80%",
            },
        });
        aboutTl
        .to(aboutTitleChars, {
            scaleY: 1,
            duration: 0.3,
            ease: "back.out(4)",
            stagger: 0.09,
        })
        .fromTo("#about .container .catch .js-triangle-blue",
            commonAnimFrom, { ...commonAnimTo, duration: 0.3 }, "<")
        .to(aboutTitle, { "--pseudo-opacity": 1, duration: 0.3 })
        .fromTo("#about .container .catch .js-about-sub-title", commonAnimFrom, commonAnimTo, "<")
        .fromTo("#about .container .text-wrap .js-text-head", commonAnimFrom, commonAnimTo, "-=0.4")
        .fromTo("#about .container .text-wrap .text-content .js-text", commonAnimFrom, commonAnimTo, "-=0.4")
        .fromTo("#about .container .text-wrap .text-content .js-p-em", commonAnimFrom, commonAnimTo, "-=0.4")
        .fromTo("#about .container .text-wrap .text-content .js-about-list", commonAnimFrom, commonAnimTo,  "-=0.4")
        .fromTo("#about .container .text-wrap .text-content .js-last-fadein", commonAnimFrom, commonAnimTo, "-=0.4")
        .fromTo("#about .container .js-woman-img", 
            {...commonAnimFrom, y: 0, xPercent: 100},
            {...commonAnimTo, y: 0, xPercent: 0 ,ease: "power2.out"}, "-=0.3"
        );
    })
//Office Section
    const texts__office = ["#office .container .catch", "#office .container .intro"];
    gsap.set("#office .container .office-title .js-giraffe", {
        transformOrigin: "bottom center",
        scaleY: 0,
        scaleX: 1,
    });
    const officeTl = gsap.timeline({
        scrollTrigger: {
            trigger: "#office",
            start: "top 70%",
        }
    });
    officeTl
    .from("#office .js-office__splide", {
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
    }, "<")
    .to("#office .container .office-title .js-giraffe", {
        scaleY: 1,
        rotation: 0,
        duration: 0.6,
        ease: "back.out(4)"
    })

//Feature Section
    const linePath__feature = document.querySelector("#feature .pc.js-line-svg .js-path");
    const linePath__feature__sp = document.querySelector("#feature .sp.js-line-svg .js-path");
    const pathLength__feature = linePath__feature.getTotalLength();
    gsap.set(linePath__feature, {
        strokeDasharray:  pathLength__feature,
        strokeDashoffset: pathLength__feature
    });
    gsap.to(linePath__feature, {
        scrollTrigger: { 
            trigger: "#feature .container .js-cards-container",
            start: "top 40%",
            end: "bottom 40%",
            scrub: 1,
            onLeave: self => self.disable(false,true),
        },
        strokeDashoffset: 0,
    });
    const pathLength__feature__sp = linePath__feature__sp.getTotalLength();
    gsap.set(linePath__feature__sp, {
        strokeDasharray: pathLength__feature__sp,
        strokeDashoffset: pathLength__feature__sp,
    });
    gsap.to(linePath__feature__sp, {
        scrollTrigger: {
            trigger: "#feature .container .js-cards-container",
            start: "top 35%",
            end: "bottom 0%",
            scrub: 1,
            onLeave: self => self.disable(false, true),
        },
        strokeDashoffset: 0
    });
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
        duration: 0.3,
        ease: "back.out(4)",
        stagger: 0.09,
    })
    .to(featureTitle, {
        "--pseudo-opacity": 1,
        duration: 0.6,
    })
    .fromTo("#feature .container .catch .js-feature-sub-title",
        commonAnimFrom, commonAnimTo, "<"
    )
    .fromTo("#feature .container .js-cards-container", 
        { autoAlpha: 0, filter: "blur(10px)" },
        { autoAlpha: 1, filter: "blur(0px)", duration: 0.6 }, "-=0.2"
    )
    gsap.set("#feature .container .js-feature-bottom", {
        autoAlpha: 0,
        filter: "blur(10px)"
    });
    gsap.to("#feature .container .js-feature-bottom", {
        scrollTrigger: {
            trigger: "#feature .container .js-feature-bottom",
            start: "top 80%",
        },
        autoAlpha: 1,
        filter: "blur(0px)",
        duration: 1
    });

    gsap.set("#feature .container .feature-bottom .content-wrap .item.left-top .title .js-dog", {
        transformOrigin: "bottom center",
        scaleY: 0,
        scaleX: 1,
        rotation: -33,
    });
    gsap.to("#feature .container .feature-bottom .content-wrap .item.left-top .title .js-dog", {
        scrollTrigger: {
            trigger: "#feature .container .feature-bottom .item.left-top",
            start: "top 80%",
            end: "top 0"
        },
        scaleY: 1,
        rotation: -33,
        duration: 0.8,
        ease: "back.out(4)"
    });
    gsap.set("#feature .container .cards > .card:nth-child(1) .js-mogura", {
        transformOrigin: "bottom center",
        scaleY: 0,
        scaleX: 1,
    });
    mm.add("(min-width: 1024px)", () => {
        gsap.to("#feature .container .cards > .card:nth-child(1) .js-mogura", {
            scrollTrigger: {
                trigger: "#feature .container .cards .js-mogura-scroll-start",
                start: "top 60%",
                end: "top 0%",
            },
            scaleY: 1,
            duration: 0.6,
            ease: "back.out(4)"
        })
    });
    mm.add("(min-width: 600px) and (max-width: 1023px)", () => {
        gsap.to("#feature .container .cards > .card:nth-child(1) .js-mogura", {
            scrollTrigger: {
                trigger: "#feature .container .cards .js-mogura-scroll-start",
                start: "top 30%",
                end: "top 0%",
            },
            scaleY: 1,
            duration: 0.6,
            ease: "back.out(4)"
        })
    });
    mm.add("(max-width: 599px)", () => {
        gsap.to("#feature .container .cards > .card:nth-child(1) .js-mogura", {
            scrollTrigger: {
                trigger: "#feature .container .cards .js-mogura-scroll-start",
                start: "top 0%",
                end: "top 0%",
            },
            scaleY: 1,
            duration: 0.6,
            ease: "back.out(4)"
        })
    });
//Program Section
    const programTitle = document.querySelector("#program .container .catch .js-program-title");
    const programTitleChars = wrapChars(programTitle);
    gsap.set(programTitleChars, {
        display: "inline-block",
        x: "14rem",
        autoAlpha: 0,
        filter: "blur(10px)",
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
        filter: "blur(10px)",
        willChange: "transform"
    });
    
    const programTitleTl = gsap.timeline({
        scrollTrigger: {
            trigger: "#program .container",
            start: "top 60%",
        }
    });
    programTitleTl
    .to("#program .js-container", {
        backgroundColor: "#b3c5db",
        duration: 2,
    })
    .fromTo("#program .container .inner .js-circle-blue", 
        { autoAlpha: 0, filter: "blur(10px)" }, { autoAlpha: 1, filter: "blur(0px)" }, "<"
    )
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
    const linePath__program = document.querySelector("#program .pc.js-line-svg .js-path");
    const linePath__program__sp = document.querySelector("#program .sp.js-line-svg .js-path");
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
        },
        strokeDashoffset: 0,
    });
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
    gsap.set("#program .domains .list-wrap .js-lion", {
        transformOrigin: "bottom center",
        scaleY: 0,
        scaleX: 1,
    })
    gsap.to("#program .domains .list-wrap .js-lion", {
        scrollTrigger: {
                trigger: "#program .domains .list-wrap",
                start: "top 60%",
                end: "top 0%",
            },
            scaleY: 1,
            duration: 0.6,
            ease: "back.out(4)"
    })
//Cv Section

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
        duration: 3.5,
        ease: "power2.Out"
    }, "-=0.5"
    ).to(star, { rotationZ: 860, rotationX: -360, duration: 3}, "<"
    ).to(star, { autoAlpha: 0, duration: 0.5, ease: "power1.out" }, "-=1");
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


    gsap.set("#dog-tail", { transformOrigin: "bottom",rotation: -20})
    gsap.to("#dog-tail", {
        rotation: 20,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
    })
    gsap.set(["#whisker-top-r", "#whisker-bottom-r"], { transformOrigin: "left", rotation: 0});
    gsap.set(["#whisker-top-l", "#whisker-bottom-l"], { transformOrigin: "right", rotation: 0});
    gsap.to(["#whisker-top-r", "#whisker-bottom-r", "#whisker-top-l", "#whisker-bottom-l"], {
        rotation: gsap.utils.random(-40, 40),
        duration: gsap.utils.random(0.3, 0.7),
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        repeatRefresh: true
    });

    gsap.set("#panda-arm-r", { transformOrigin: "top right", rotation: 150, x: -5, y: 25 });
    gsap.to("#panda-arm-r", {
        rotation: 130,
        duration: 1,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
    });
    gsap.set(["#giraffe-horn-l", "#giraffe-horn-r"], {
        scaleY: 1,
        rotate: -5,
        transformOrigin: "bottom"
    });
    gsap.to(["#giraffe-horn-l", "#giraffe-horn-r"], {
        scaleY: 1.4,
        rotate: gsap.utils.random(-5, 5),
        duration: 0.8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        repeatRefresh: true
    });
    gsap.set("#lion-hair", { transformOrigin: "center", rotation: 0 })
    gsap.to("#lion-hair", { 
        rotation: 360,
        ease: "sine.inOut",
        duration: 5,
        repeat: -1,
        yoyo: true,
    });
});

window.addEventListener("load", () => {
  ScrollTrigger.refresh();
});
document.fonts?.ready.then(() => {
  ScrollTrigger.refresh();
});