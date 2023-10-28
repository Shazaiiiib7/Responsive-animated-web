function locomotive() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector(".main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy(".main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
    });


    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

}
locomotive();

function page1Animations() {
    var tl = gsap.timeline();
    var nav = document.querySelector("nav");
    tl.from(nav, {
        y: -140,
        duration: 0.7,
        ease: Power3,
    })
    tl.from(".text-area .text h1", {
        y: 250,
        duration: 0.5,
        ease: Power3,
        stagger: 0.3,
        opacity: 0,

    })
    var nav = document.querySelector("nav .menu-bar .left-menu-bar");
    gsap.to(nav, {
        y: -80,
        scrollTrigger: {
            trigger: ".text-area",
            scroller: ".main",
            start: "top 20%",
            end: "top 10%",
            scrub: 1,
        }
    })
}
page1Animations();
function page2Aniamtion() {
    var tl = gsap.timeline();
    var box = document.querySelectorAll(".page-2 .box");
    gsap.from(box, {
        opacity: 0,
        duration: 0.6,
        y: 80,
        stagger: 0.1,
        scrollTrigger: {
            trigger: box,
            scroller: ".main",
            start: "top 70%",
            end: "top 0%",
        }
    })
}
page2Aniamtion();
function page4Cursor() {
    var cursor = document.querySelector(".cursor");
    var productBox = document.querySelector(".page-4");

   
    productBox.addEventListener("mouseenter", function () {
        cursor.style.opacity  = 1; 
    })
    productBox.addEventListener("mouseleave", function () {
        cursor.style.opacity = 0;
    })
document.addEventListener("mousemove",function(dtls){

    cursor.style.transform = `translate(${dtls.clientX}px,${dtls.clientY}px)`
})




}
page4Cursor();