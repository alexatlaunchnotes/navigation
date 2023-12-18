import { gsap } from 'gsap';

const init = (): void => {
    const dropdownWrap = document.querySelector("[data-attribute='dropdown-wrap']") as HTMLElement;
    const dropdownLinks = document.querySelectorAll("[data-attribute='dropdown-link']");
    const dropdownContents = document.querySelectorAll("[data-attribute='dropdown-content']");
    const dropdownBg = document.querySelector("[data-attribute='dropdown-bg']") as HTMLElement;
  
    console.log("ready");
  
    gsap.defaults({
      duration: 0.4
    });
  
    // Pre-hide all content and the wrap
    gsap.set(dropdownContents, { opacity: 0, y: -6 });
    gsap.set(dropdownWrap, { display: "none" });
  
    dropdownLinks.forEach((link, index) => {
      link.addEventListener('click', function (e) {
        e.stopPropagation();
  
        let currentContent = dropdownContents[index] as HTMLElement;
  
        // If the clicked link's content is already active, hide the dropdown
        if (currentContent.classList.contains('active')) {
          hideDropdown();
          return;
        }
  
        let previousContent = document.querySelector(".active") as HTMLElement | null;
  
        // If no previous active links
        if (!previousContent) {
          dropdownWrap.style.display = "flex";
          gsap.fromTo(dropdownBg, {
            height: '0rem',
            opacity: 0,
          }, {
            height: '42rem',
            opacity: 1,
            duration: 0.6,
            ease: "power3.out"
          });
          gsap.to(currentContent, {
            opacity: 1,
            y: 0,
            ease: "power3.out",
            duration: 0.4,
            delay: 0.3,
            onComplete: function () {
              currentContent.style.pointerEvents = 'auto';
            }
          });
          currentContent.classList.add("active");
        } else {
          gsap.to(previousContent, {
            opacity: 0,
            y: -6,
            duration: 0.5,
            onComplete: function () {
              if (previousContent) {
                previousContent.style.pointerEvents = 'none';
                previousContent.style.zIndex = '0';
              }
            }
          });
          previousContent?.classList.remove("active");
          gsap.to(currentContent, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
            onStart: function () {
              currentContent.style.pointerEvents = 'auto';
              currentContent.style.zIndex = '1';
            }
          });
          currentContent.classList.add("active");
        }
      });
    });
  
    dropdownContents.forEach(content => {
      content.addEventListener('click', function (e) {
        e.stopPropagation();
      });
    });
  
    // Hide dropdown when clicking outside
    document.addEventListener('click', function () {
      hideDropdown();
    });
  
    function hideDropdown(): void {
      gsap.to(dropdownContents, {
        opacity: 0,
        y: -6,
        duration: 0.5,
        onComplete: function () {
          dropdownContents.forEach(content => {
            (content as HTMLElement).style.pointerEvents = 'none';
            (content as HTMLElement).style.zIndex = '0';
          });
        }
      });
      gsap.to(dropdownBg, {
        height: '0rem',
        opacity: 0,
        duration: 0.6,
        ease: "power3.out"
      });
      dropdownContents.forEach(content => content.classList.remove("active"));
      setTimeout(() => {
        if (dropdownWrap) {
          dropdownWrap.style.display = "none";
        }
      }, 600);
    }
  };
  

document.addEventListener("DOMContentLoaded", init)