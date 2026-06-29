// ======================================
// RUNAWAY STUDIO
// Premium Website Script
// ======================================

// ==============================
// AOS
// ==============================

AOS.init({
    duration:1000,
    once:true
});

// ==============================
// Mobile Menu
// ==============================

const menuBtn = document.getElementById("menu-btn");
const navMenu = document.querySelector(".nav-menu");

if(menuBtn){

    menuBtn.onclick=()=>{

        navMenu.classList.toggle("show");

    }

}

// ==============================
// Navbar Scroll
// ==============================

const navbar=document.querySelector(".navbar");

window.addEventListener("scroll",()=>{

    if(window.scrollY>50){

        navbar.style.background="rgba(5,7,13,.92)";
        navbar.style.backdropFilter="blur(25px)";
        navbar.style.boxShadow="0 10px 30px rgba(0,0,0,.35)";

    }

    else{

        navbar.style.background="rgba(5,7,13,.55)";
        navbar.style.boxShadow="none";

    }

});

// ==============================
// Typing Animation
// ==============================

const typing=document.getElementById("typing");

const words=[

"Wedding Photography",

"Cinematic Videography",

"Graduation Session",

"Creative Studio",

"Commercial Production"

];

let wordIndex=0;
let charIndex=0;
let deleting=false;

function typeEffect(){

    if(!typing) return;

    const current=words[wordIndex];

    if(!deleting){

        typing.textContent=current.substring(0,charIndex++);

        if(charIndex>current.length){

            deleting=true;

            setTimeout(typeEffect,1800);

            return;

        }

    }

    else{

        typing.textContent=current.substring(0,charIndex--);

        if(charIndex<0){

            deleting=false;

            wordIndex++;

            if(wordIndex>=words.length){

                wordIndex=0;

            }

        }

    }

    setTimeout(typeEffect,deleting?45:90);

}

typeEffect();

// ==============================
// Scroll Progress
// ==============================

const progress=document.createElement("div");

progress.id="progress";

document.body.appendChild(progress);

window.addEventListener("scroll",()=>{

    const total=document.documentElement.scrollHeight-window.innerHeight;

    const value=(window.scrollY/total)*100;

    progress.style.width=value+"%";

});

// ==============================
// Back To Top
// ==============================

const topBtn=document.createElement("button");

topBtn.innerHTML="↑";

topBtn.id="topBtn";

document.body.appendChild(topBtn);

window.addEventListener("scroll",()=>{

    if(window.scrollY>400){

        topBtn.classList.add("show");

    }

    else{

        topBtn.classList.remove("show");

    }

});

topBtn.onclick=()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

};

// ==============================
// Active Menu
// ==============================

const sections=document.querySelectorAll("section");

const navLinks=document.querySelectorAll(".nav-menu a");

window.addEventListener("scroll",()=>{

    let current="";

    sections.forEach(section=>{

        const top=section.offsetTop-120;

        if(pageYOffset>=top){

            current=section.getAttribute("id");

        }

    });

    navLinks.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href")==="#"+current){

            link.classList.add("active");

        }

    });

});
