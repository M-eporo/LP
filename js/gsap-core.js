document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    // 1文字ずつspan化（<br>は保持）
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

    //header animation
    const firstview = document.querySelector(".firstview");
    const logo = document.querySelector(".header .container .logo");
    const navItems = document.querySelectorAll(".header .container .inner .pc-nav .pc-sns .sns-item");
    const primaryBtn = document.querySelector(".header .container .inner .primary-btn");
    const headerItems = [...navItems, primaryBtn];
    gsap.set([logo, ...headerItems], {
        autoAlpha: 0,
        x: -20,
        filter: "blur(20px)",
    });
    //firstview animation
    gsap.set(firstview, { 
        WebkitMaskImage: "radial-gradient(circle at center, black 0%, transparent 0%)" 
        }
    );
    const pageMainTitle = document.querySelector(".firstview .js-page-main-title");
    const pageSubTitle  = document.querySelector(".firstview .js-page-sub-title");
    const mainChars = wrapChars(pageMainTitle);
    const subChars  = wrapChars(pageSubTitle);
    gsap.set([...mainChars, ...subChars], {
      autoAlpha: 0,
      y: 30,
      // x: -30,
      rotationX: -45,
      filter: "blur(20px)",
      transformPerspective: 600,
      transformOrigin: "50% 50%",
    });
    

    const firstviewTl = gsap.timeline();;
    firstviewTl.to(
        firstview, {
            WebkitMaskImage: "radial-gradient(circle at center, black 0%, black 100%, transparent 150%)" ,
            duration: 1,
            ease: "power2.in",
        }
    ).to(
        logo, {
            autoAlpha: 1,
            x: 0,
            filter: "blur(0px)",
            duration: 0.6,
        }, ">",
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
})