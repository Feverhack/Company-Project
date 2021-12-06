const headerEl = document.querySelector("header");
const scrollToTop = document.querySelector(".scrollToTop");

window.addEventListener("scroll", () => {
    let height =headerEl.getBoundingClientRect().height;

    if(window.pageYOffset - height > 800){
        if(!headerEl.classList.contains("sticky")){
            headerEl.classList.add("sticky");
        } 
    }else {
        headerEl.classList.remove("sticky");
    }

    if(window.pageYOffset > 2000){
        scrollToTop.style.display = "block";
    } else {
        scrollToTop.style.display = "none";
    }
});

const glide = new Glide(".glide");
const captionsEl = document.querySelectorAll(".slide-caption");

glide.on(["mount.after", "run.after"],() => {
    const caption = captionsEl[glide.index];
anime({
    targets: caption.children,
    opacity:[0,1],
    duration:400,
    easing:"linear",
    delay: anime.stagger(400,{start:300}),
    translateY:[anime.stagger([40, 10]), 0]

});
}) ;
 
glide.on("run.before",() =>{
    document.querySelectorAll(".slide-caption > *").forEach(el =>{
        el.style.opacity = 0;
    })
})

glide.mount();

const isotope = new Isotope(".cases", {
    layoutMode: "fitRows",
    itemSelector :".case-item"
});


const filterBtns = document.querySelector(".filter-btns");

filterBtns.addEventListener("click" , e => {
    let {target} =e ;
    const filterOption = target.getAttribute("data-filter");
    if(filterOption){
        document.querySelectorAll(".filter-btn.active").forEach(btn => btn.classList.remove("active"));
        target.classList.add("active");

        isotope.arrange({filter:filterOption})
    }
})

const staggeringOption = {
    delay:300,
    distance: "50px",
    duration: 500,
    easing: "ease-in-out",
    origin: "bottom"
};

ScrollReveal().reveal(".feature", {...staggeringOption,interval:350 });
ScrollReveal().reveal(".service-item", {...staggeringOption,interval:350 });
// ... staggeringOption 指上面的stagger 所有 delay，distance 等 功能，後加interval 每個單獨加 350 出現。


ScrollReveal().reveal(".data-section", {
    beforeReveal: ()=> {
        anime({
            targets : ".data-piece .num",
            innerHTML: el =>{
                return [ 0 ,el.innerHTML];
            },
            duration:2000,
            round : 1,
            easing:"easeInExpo"
        });
        dataSectionEl.style.backgroundPosition = `center calc(50% - ${dataSectionEl.getBoundingClientRect().bottom / 5 }px)`; 
        // 這裡要注意字符串 '' enter左邊    ,  分別 `` ← tab
    }
});

const dataSectionEl = document.querySelector(".data-section");
window.addEventListener("scroll",() => {

    const bottom = dataSectionEl.getBoundingClientRect().bottom;
    const top = dataSectionEl.getBoundingClientRect().top;

    if(bottom >= 0 && top <= window.innerHeight) {
        dataSectionEl.style.backgroundPosition = `center calc(50% - ${bottom / 5 }px)`; 
    }
}) ;
// 流暢滾動效果
const scroll = new SmoothScroll('nav a[href*="#"], .scrollToTop a[href*="#"]' , {
    header:"header",
    offset:80
});
// 關閉全屏導航
document.addEventListener("scrollStart" , ()=>{
    if(headerEl.classList.contains("open")){
        headerEl.classList.remove("open");
    }
});

const exploreBtnEls = document.querySelectorAll(".explore-btn");

exploreBtnEls.forEach(exploreBtnEl =>{
    exploreBtnEl.addEventListener("click",()=> {
        scroll.animateScroll(document.querySelector("#about-us"));
        });
});

// 實現 響應式


//折疊按鈕
const burgerEl = document.querySelector(".burger");
burgerEl.addEventListener("click" , () =>{
    headerEl.classList.toggle("open")
});




