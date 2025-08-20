// class CustomIntersectionObserver{
//   constructor(obj = {}){
//     this.observer = new IntersectionObserver((entries, observer) => {
//       entries.forEach((entry,i) => {
//         if(entry.isIntersecting){
//           obj.cbEnter(entry.target);
//           if(option?.once) {
//             observer.unobserve(entry.target);
//           }
//         } else if(obj.cbExit){
//           obj.cbExit(entry.target);
//         }
//       });
//     }
//     , option);
//   }

//   observe(targets){
//     targets.forEach(target => {
//       this.observer.observe(target);
//     });
//   }

//   unobserve(targets){
//     targets.forEach(target => {
//       this.observer.unobserve(target);
//     });
//   }
// }

// const targets = Array.from(document.querySelectorAll(".js-observer"));
// const cbEnter = entry => {
//   console.log("Enter");
  
//   entry.animate([
//     {color: "red"}
//   ],
//   {
//     duration: 1000,
//     fill: "forwards",
//     iterations: 1,
//   });
// };

// const cbExit = entry => {
//   console.log("Exit");
//   entry.animate([
//     {color: "revert"}
//   ],
//   {
//     duration: 1000,
//     fill: "forwards",
//     iterations: 1,
//   });
// };

// const option = {
//   root: null,
//   rootMargin: "0px",
//   threshold: 1,
// };

// const sample = new CustomIntersectionObserver({
//   cbEnter: cbEnter,
//   cbExit: cbExit,
//   option: option
// });
// sample.observe(targets);