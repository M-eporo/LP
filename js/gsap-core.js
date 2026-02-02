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
    const cover = document.querySelector(".js-intro-cover");
    const firstview = document.querySelector("#firstview");
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
    gsap.set(cover, 
        { autoAlpha: 1 }
    );
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
            WebkitMaskImage: "radial-gradient(circle at center, black 0%, black 100%, transparent 150%)" ,
            duration: 1,
            ease: "power2.in",
        }
    ).to(
        cover, { 
            autoAlpha: 0,
            duration: 0.6 
        }, "-=0.3"
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
    const svgLine__problems = document.querySelector("#problems .js-line-svg .js-path");
    const mainImage__problems = document.querySelector("#problems .container .js-img-wrap");
    if(!svgLine__problems) return;

    if(svgLine__problems) {
        const svgLineLength__problems = svgLine__problems.getTotalLength();
        gsap.set(svgLine__problems, {
            strokeDasharray:  svgLineLength__problems,
            strokeDashoffset: svgLineLength__problems
        });
        gsap.to(svgLine__problems, {
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
                markers: true,
                trigger: "#problems .container .js-text-wrap",
                start: "top 90%",
                end: "bottom 30%",
                toggleActions: "play reverse play reverse"
            },
            visibility: "hidden",
            autoAlpha: 0,
            duration: 0.5,
            stagger: 0.06,
            
        })
    });

//Resolve Section




});

window.addEventListener("load", () => {
  ScrollTrigger.refresh();
});
document.fonts?.ready.then(() => {
  ScrollTrigger.refresh();
});