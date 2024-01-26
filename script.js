function locomotiveani() {
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

locomotiveani();

// gsap.to(".nav-part1 svg", {
//     scrollTrigger:{
//         trigger:".page1",
//         scroller: ".main",
//         markers: true,
//         start: "top 50%",
//         end:"top 55%",
//         scrub: 2
//     },
//     transform: "translateY(-100%)",
// })
// gsap.to(".nav-part2 .links", {
//     transform: "translateY(-100%)",
//     opacity: 0,
//     scrollTrigger:{
//         trigger:".main",
//         scroller: ".main",
//         markers: true,
//         start: "top 10%",
//         end:"top 15%",
//         scrub: 2
//     },
// })
// gsap.to(".nav-part1 .two", {
//     scrollTrigger:{
//         trigger:".page1",
//         scroller: ".main",
//         markers: true,
//         start: "top 50%",
//         end:"top 55%",
//         scrub: 2
//     },
//     margin: "0%",
// })



 
function videoanimation() {
    let play = document.querySelector('.play');
    let video = document.querySelector('.video');

    video.addEventListener("mouseenter", function () {
        gsap.to(play, {
            scale: 1,
            opacity: 1
        })
    })

    video.addEventListener("mouseleave", function () {
        gsap.to(play, {
            scale: 0,
            opacity: 0
        })
    })

    video.addEventListener("mousemove", function (dets) {
        gsap.to(play, {
            left: dets.x - 70,
            top: dets.y - 80
        })
    })
}
videoanimation();

function loadinganimation() {
    gsap.from('.page1 h1 span', {
        y: 100,
        opacity: 0,
        delay: 0.5,
        duration: 0.9,
        stagger: 0.3

    })

    gsap.from('.page1 .video', {
        scale: 0.9,
        opacity: 0,
        delay: 1.3,
        duration: 0.5,

    })
}
loadinganimation();


function cursoranimation() {
    var cursor = document.querySelector('.cursor');
    document.addEventListener("mousemove", function (dets) {
        gsap.to(".cursor", {
            left: dets.x,
            top: dets.y
        })

    })

    // document.querySelector('#child1').addEventListener("mouseenter",function(){
    //     gsap.to('.cursor',{
    //     transform: 'translate(-50%,-50%) scale(1)'
    //     })
    // })
    // document.querySelector('#child1').addEventListener("mouseleave",function(){
    //     gsap.to('.cursor',{
    //     transform: 'translate(-50%,-50%) scale(0)'
    //     })
    // })
    document.querySelectorAll('.child').forEach(function (elem) {
        elem.addEventListener("mouseenter", function () {
            gsap.to('.cursor', {
                transform: 'translate(-50%,-50%) scale(1)',
                opacity: 1
            })
        })
    })
    document.querySelectorAll('.child').forEach(function (elem) {
        elem.addEventListener("mouseleave", function () {
            gsap.to('.cursor', {
                transform: 'translate(-50%,-50%) scale(0)',
                opacity: 0
            })
        })
    })
}

cursoranimation();