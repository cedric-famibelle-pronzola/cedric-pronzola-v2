export const smoothScrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    const navbar = document.querySelector('header');
    const navbarHeight = navbar ? navbar.getBoundingClientRect().height : 80;
    
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - navbarHeight - 20; // Extra 20px padding
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  }
}; 
