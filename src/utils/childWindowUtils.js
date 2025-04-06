let childWindows = [];

export const setWindow = (childWindow , userId) => {
    childWindows.push(childWindow);
    let winCount = sessionStorage.getItem(`childWindows-${userId}`);
    if(winCount){
        let childWindow = JSON.parse(winCount);
        sessionStorage.setItem(`childWinCount-${userId}` , childWindow.length);
    } else {
        sessionStorage.setItem(`childWinCount-${userId}` , childWindows.length);
    }
}

export const closeWindows = (userId) => {
        let childWindowsToClose = JSON.parse(sessionStorage.getItem(`childWindows-${userId}`));
        if(childWindowsToClose?.length){
			childWindowsToClose.forEach((windowName) => {
				let childWindow = window.open("" , windowName);
				if (childWindow && !childWindow.closed) {
					childWindow.close();
				}
			});
        } else if(childWindows?.length){
            for(const childWindow of childWindows) {
                if(!childWindow.closed) {
                    childWindow.close();
                }        
            }
        }
    
    childWindows = [];
    if(userId){
        sessionStorage.removeItem(`childWinCount-${userId}`);
        sessionStorage.removeItem(`childWindows-${userId}`);
        sessionStorage.removeItem(`startTime-${userId}`);
    }
    
}

/**
 * 
 * @returns {Array<Window>} An array containing references to the child windows.
*/
export const removeWindow = (childWindow , userId) => {
    let winCount = sessionStorage.getItem(`childWindows-${userId}`);
    
    if(winCount){
        let childWindowToRemove = JSON.parse(winCount);
        childWindowToRemove = childWindowToRemove.filter(win => win !== childWindow.name);
        sessionStorage.setItem(`childWinCount-${userId}` , childWindowToRemove.length);
        return childWindowToRemove;
    } else {
        sessionStorage.removeItem(`childWinCount-${userId}`);
    }
}