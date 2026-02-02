const firstViewreSplide = new Splide(".splide.splider", {
  autoplay: true,
  type: "fade",
  rewind: true,
  pauseOnHover: false,
  pauseOnFocus: false,
  interval: 5000,
  speed: 2000,
  arrows: false,
  pagination: false,
  classes: {
		arrows: 'splide__arrows custom-arrows',
		arrow : 'splide__arrow custom-arrow',
		prev  : 'splide__arrow--prev custom-prev',
		next  : 'splide__arrow--next custom-next',
    pagination: 'splide__pagination custom-pagination',
    page: 'splide__pagination__page custom-pagination-page',
  },
}).mount();

const programSplide = new Splide(".splide.program__splide", {
  destroy: false,
  perPage: 3,
  perMove: 1,
  gap: "32px",
  arrows: false,
  pagination: false,
  wheel: false,
  rewind: true,
  autoplay: false,
  classes: {
    prev: 'splide__arrow--prev custom-prev',
    pagination: 'splide__pagination custom-pagination',
    page: 'splide__pagination__page custom-pagination-page',
  },
  breakpoints: {
    1280: {
      destroy: false,
      perPage: 2,
      focus: "left",
      trimSpace: true,
      gap: "16px",
      arrows: true,
      pagination: true,
      padding: {right: "10%"},
      omitEnd: true,
      trimSpace: true,
    },
    900: {
      perPage: 1,
      padding: {right: "20%"}
    },
    600: {
      focus: "center",
      gap: "16px",
      padding: {right: "0%"}
    }
  }
});

programSplide.mount();	

const officeSplide = new Splide(".splide.office__splide", {
  perPage: 3,
  perMove: 2,
  gap: "24px",
  autoplay: false,
  wheel: false,
  rewind: true,
  omitEnd: true,
  classes: {
    prev: 'splide__arrow--prev custom-prev',
		pagination: 'splide__pagination custom-pagination',
		page      : 'splide__pagination__page custom-pagination-page',
  },
  breakpoints: {
    1280: {
      perPage: 2,
      perMove: 1,
      focus: "left",
      omitEnd: true,
      trimSpace: true,
    },
    768: {
      perPage: 1,
      perMove: 1,
      omitEnd: false,
    }
  }
});
officeSplide.mount();
