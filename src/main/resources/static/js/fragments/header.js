const meunLines = document.querySelectorAll(".meun-line");
const meunLineSubs = document.querySelectorAll(".meun-line-sub");
const subMenubarOut = document.querySelector(".sub-menubar-out");
subMenubarOut.classList.add("menu-line-visible");

let menuToggleFlag = false;

let preTarget = null;

menuLineClear();

for(let i = 0; i < meunLines.length; i++) {
    const menuLine = meunLines[i];
    const menuLineSub = meunLineSubs[i];

    menuLine.onclick = (e) => {
        menuLineClear();
        if(e.target == preTarget) {
            subMenubarOut.classList.add("menu-line-visible");
            preTarget = null;
        }else{
            preTarget = e.target;
            subMenubarOut.classList.remove("menu-line-visible");
            menuLineSub.classList.remove("menu-visible");
        }
        
    }
}

function menuLineClear() {
    for(let i = 0; i < meunLineSubs.length; i++){
        meunLineSubs[i].classList.add("menu-visible");
    }
}