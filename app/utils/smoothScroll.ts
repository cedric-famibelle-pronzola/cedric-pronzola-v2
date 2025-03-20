export const smoothScrollToSection = (id: string) => {
  console.log(`Attempting to scroll to: #${id}`);
  
  // Try to find the element
  const tryToScroll = () => {
    const element = document.getElementById(id);
    if (element) {
      console.log(`Found element #${id}, scrolling...`);
      
      const navbar = document.querySelector('header');
      const isMobile = window.innerWidth < 768; // 768px is the md breakpoint in Tailwind
      const navbarHeight = navbar ? navbar.getBoundingClientRect().height : 80;
      
      // Use more moderate offset that works for both versions
      const additionalOffset = isMobile ? 25 : 30;
      
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - navbarHeight - additionalOffset;
      
      // Use scrollTo for smooth scrolling
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      
      return true;
    }
    console.log(`Element #${id} not found yet...`);
    return false;
  };

  // If element is not found immediately, try a few times with a delay
  // This helps when sections are conditionally rendered or elements are
  // not yet in the DOM when the function is called
  if (!tryToScroll()) {
    // Try again after a short delay
    setTimeout(() => {
      if (!tryToScroll()) {
        // Try once more after a longer delay
        setTimeout(() => {
          if (!tryToScroll()) {
            // Final attempt with a longer delay
            setTimeout(tryToScroll, 300);
          }
        }, 200);
      }
    }, 100);
  }
}; 
