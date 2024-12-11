function toggleTheme() {
    const body = document.body;
    const sunIcon = document.getElementById("sun_icon");
    const moonIcon = document.getElementById("moon_icon");
    

    body.classList.toggle("dark-theme");
    

    if (body.classList.contains("dark-theme")) {
        moonIcon.style.display = "none";
        sunIcon.style.display = "block";
    } else {
        moonIcon.style.display = "block";
        sunIcon.style.display = "none";
    }
    

    localStorage.setItem("theme", body.classList.contains("dark-theme") ? "dark" : "light");
}

window.onload = function() {
    const body = document.body;
    const savedTheme = localStorage.getItem("theme");
    
    if (savedTheme && savedTheme === "dark") {
        body.classList.add("dark-theme");
        document.getElementById("sun_icon").style.display = "block";
        document.getElementById("moon_icon").style.display = "none";
    } else {
        body.classList.remove("dark-theme");
        document.getElementById("sun_icon").style.display = "none";
        document.getElementById("moon_icon").style.display = "block";
    }
};

window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav a");

    let currentSection = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            currentSection = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href").includes(currentSection)) {
            link.classList.add("active");
        }
    });
});