/* =========================================================
   A-Y-N-N BIRTHDAY EXPERIENCE
   Navigation + Background Music + Confetti
========================================================= */


/* ================= ELEMENTS ================= */

const screens = document.querySelectorAll(".screen");

const progressBar =
    document.getElementById("progressBar");

const backBtn =
    document.getElementById("backBtn");

const replayBtn =
    document.getElementById("replayBtn");

const bgMusic =
    document.getElementById("bgMusic");

const musicToggle =
    document.getElementById("musicToggle");

const nextButtons =
    document.querySelectorAll(".next-btn");

const revealItems =
    document.querySelectorAll(".reveal-item");


/* ================= VARIABLES ================= */

let currentScreen = 0;

let musicStarted = false;


/* ================= SHOW SCREEN ================= */

function showScreen(index) {

    if (index < 0 || index >= screens.length) {
        return;
    }


    screens.forEach((screen, i) => {

        screen.classList.toggle(
            "active",
            i === index
        );

    });


    currentScreen = index;


    /* ================= PROGRESS ================= */

    const progress =
        ((index + 1) / screens.length) * 100;

    progressBar.style.width =
        `${progress}%`;


    /* ================= BACK BUTTON ================= */

    if (index === 0) {

        backBtn.classList.remove("visible");

    } else {

        backBtn.classList.add("visible");

    }


    /* ================= FINAL CONFETTI ================= */

    if (index === screens.length - 1) {

        createConfetti();

    }
}


/* ================= NEXT BUTTONS ================= */

nextButtons.forEach(button => {

    button.addEventListener("click", () => {

        const nextScreen =
            Number(button.dataset.next) - 1;

        showScreen(nextScreen);

    });

});


/* ================= BACK BUTTON ================= */

backBtn.addEventListener("click", () => {

    if (currentScreen > 0) {

        showScreen(currentScreen - 1);

    }

});


/* ================= BACKGROUND MUSIC ================= */

function startBackgroundMusic() {

    if (musicStarted) {
        return;
    }


    bgMusic.volume = 0.35;


    const playPromise =
        bgMusic.play();


    if (playPromise !== undefined) {

        playPromise
            .then(() => {

                musicStarted = true;

                musicToggle.textContent = "♫";

            })
            .catch(() => {

                /*
                    Browser autoplay may be blocked.

                    Music will start after
                    the first user click.
                */

            });

    }

}


/* ================= FIRST USER CLICK ================= */

document.addEventListener(
    "click",
    () => {

        if (!musicStarted) {

            bgMusic.volume = 0.35;

            bgMusic.play()
                .then(() => {

                    musicStarted = true;

                    musicToggle.textContent = "♫";

                })
                .catch(() => {});

        }

    },
    { once: true }
);


/* ================= MUSIC TOGGLE ================= */

musicToggle.addEventListener("click", (event) => {

    event.stopPropagation();


    if (bgMusic.paused) {

        bgMusic.play()
            .then(() => {

                musicStarted = true;

                musicToggle.textContent = "♫";

            })
            .catch(() => {});

    } else {

        bgMusic.pause();

        musicToggle.textContent = "♪";

    }

});


/* ================= REVEAL ITEMS ================= */

revealItems.forEach(item => {

    const button =
        item.querySelector(".reveal-btn");


    button.addEventListener("click", () => {

        item.classList.toggle("open");

    });

});


/* ================= REPLAY ================= */

replayBtn.addEventListener("click", () => {

    /* Reset reveal items */

    revealItems.forEach(item => {

        item.classList.remove("open");

    });


    /* Restart music */

    bgMusic.currentTime = 0;

    bgMusic.volume = 0.35;


    bgMusic.play()
        .then(() => {

            musicStarted = true;

            musicToggle.textContent = "♫";

        })
        .catch(() => {});


    /* Return to first screen */

    showScreen(0);

});


/* ================= CONFETTI ================= */

function createConfetti() {

    const oldConfetti =
        document.querySelectorAll(".confetti");

    oldConfetti.forEach(item => {

        item.remove();

    });


    for (let i = 0; i < 70; i++) {

        const piece =
            document.createElement("span");


        piece.className = "confetti";


        piece.style.position = "fixed";

        piece.style.left =
            `${Math.random() * 100}%`;

        piece.style.top =
            `${Math.random() * -20}%`;

        piece.style.width =
            `${Math.random() * 6 + 4}px`;

        piece.style.height =
            `${Math.random() * 10 + 5}px`;

        piece.style.background =
            [
                "#c8a6ff",
                "#7de7ff",
                "#ff8fca",
                "#ffffff"
            ][
                Math.floor(Math.random() * 4)
            ];

        piece.style.zIndex = "300";

        piece.style.pointerEvents = "none";

        piece.style.borderRadius = "3px";


        const duration =
            Math.random() * 3 + 3;


        piece.animate(
            [
                {
                    transform:
                        "translateY(0) rotate(0deg)",

                    opacity: 1
                },

                {
                    transform:
                        "translateY(110vh) rotate(720deg)",

                    opacity: 0
                }
            ],
            {
                duration:
                    duration * 1000,

                easing: "ease-out",

                fill: "forwards"
            }
        );


        document.body.appendChild(piece);


        setTimeout(() => {

            piece.remove();

        }, duration * 1000);

    }

}


/* ================= PREVENT SCROLL ================= */

window.addEventListener(
    "wheel",
    event => {

        event.preventDefault();

    },
    {
        passive: false
    }
);


window.addEventListener(
    "touchmove",
    event => {

        event.preventDefault();

    },
    {
        passive: false
    }
);


/* ================= INITIAL STATE ================= */

showScreen(0);