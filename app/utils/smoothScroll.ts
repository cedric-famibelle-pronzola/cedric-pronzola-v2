export const smoothScrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    const navbar = document.querySelector('header');

    const isMobile = window.innerWidth < 768; // 768px is the md breakpoint in Tailwind

    const navbarHeight = navbar ? navbar.getBoundingClientRect().height : 80;
    const additionalOffset = isMobile ? 20 : 20; // Additional padding, can be adjusted
    
    const elementPosition = element.getBoundingClientRect().top;

    const offsetPosition = elementPosition + window.pageYOffset - navbarHeight - additionalOffset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  }
}; 
