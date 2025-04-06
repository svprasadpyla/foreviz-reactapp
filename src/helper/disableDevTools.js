// Function to disable keyboard shortcuts
export const disableDevToolsShortcuts = (event) => {
    // Ctrl + Shift + I, J, C or
    if ((event.ctrlKey && event.shiftKey && ['I', 'J', 'C'].includes(event.key.toUpperCase()))){
      event.preventDefault();
      return false;
    }

    //  Ctrl + U
    if (event.ctrlKey && (event.key === 'u' || event.key === 'U')) {
      event.preventDefault();
      return false;
    }
    
    if (event.key === 'F12') {
      event.preventDefault();
      return false;
    }
  };
  
  // Function to disable the right click
  export const disableRightClick = (event) => {
    event.preventDefault();
  };