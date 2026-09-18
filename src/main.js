import { translations } from "./translations.js";


// ========================================
// LANGUAGE SWITCHER
// ========================================

const languageButtons = document.querySelectorAll(".lang");

let currentLanguage =
    localStorage.getItem("language") || "en";


// ========================================
// GET TRANSLATION
// ========================================

function getTranslation(object, path) {

    return path.split(".").reduce(
        (result, key) => result?.[key],
        object
    );

}


// ========================================
// CHANGE LANGUAGE
// ========================================

function changeLanguage(language) {

    const dictionary = translations[language];

    if (!dictionary) return;


    // HTML language attribute
    document.documentElement.lang = language;


    // Translate all elements
    document
        .querySelectorAll("[data-i18n]")
        .forEach(element => {

            const key = element.dataset.i18n;

            const value = getTranslation(
                dictionary,
                key
            );

            if (value !== undefined) {

                element.innerHTML = value;

            }

        });


    // Update active language
    languageButtons.forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.lang === language
        );

    });


    // Save language
    localStorage.setItem(
        "language",
        language
    );

    currentLanguage = language;
}


// ========================================
// LANGUAGE BUTTONS
// ========================================

languageButtons.forEach(button => {

    button.addEventListener("click", () => {

        const language =
            button.dataset.lang;

        changeLanguage(language);

    });

});


// ========================================
// INITIAL LANGUAGE
// ========================================

changeLanguage(currentLanguage);



// ========================================
// MOBILE BURGER MENU
// ========================================

// Находим кнопку по классу.
// Поэтому id="mobileMenu" больше не обязателен.

const mobileMenu =
    document.querySelector(".mobile-menu");

const mobileNav =
    document.getElementById("mobileNav");

const mobileClose =
    document.getElementById("mobileClose");


// ========================================
// OPEN MOBILE MENU
// ========================================

function openMobileMenu() {

    if (!mobileNav) return;

    mobileNav.classList.add("open");


    if (mobileMenu) {

        mobileMenu.setAttribute(
            "aria-expanded",
            "true"
        );

    }


    // Запрещаем прокрутку страницы
    document.body.style.overflow = "hidden";
}



// ========================================
// CLOSE MOBILE MENU
// ========================================

function closeMobileMenu() {

    if (!mobileNav) return;

    mobileNav.classList.remove("open");


    if (mobileMenu) {

        mobileMenu.setAttribute(
            "aria-expanded",
            "false"
        );

    }


    // Возвращаем прокрутку
    document.body.style.overflow = "";

}



// ========================================
// BURGER CLICK
// ========================================

if (mobileMenu) {

    mobileMenu.addEventListener(
        "click",
        openMobileMenu
    );

}



// ========================================
// CLOSE BUTTON
// ========================================

if (mobileClose) {

    mobileClose.addEventListener(
        "click",
        closeMobileMenu
    );

}



// ========================================
// CLOSE AFTER NAVIGATION
// ========================================

document
    .querySelectorAll(".mobile-nav-links a")
    .forEach(link => {

        link.addEventListener(
            "click",
            closeMobileMenu
        );

    });



// ========================================
// CLOSE WITH ESC
// ========================================

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            closeMobileMenu();

        }

    }
);



// ========================================
// CLOSE WHEN CLICKING OUTSIDE CONTENT
// ========================================

if (mobileNav) {

    mobileNav.addEventListener(
        "click",
        event => {

            // Если нажали именно на фон меню
            // закрываем его

            if (event.target === mobileNav) {

                closeMobileMenu();

            }

        }
    );

}



// ========================================
// RESET MOBILE MENU WHEN RESIZING
// ========================================

window.addEventListener(
    "resize",
    () => {

        // Если вернулись на desktop
        // меню должно закрыться

        if (window.innerWidth > 768) {

            closeMobileMenu();

        }

    }
);