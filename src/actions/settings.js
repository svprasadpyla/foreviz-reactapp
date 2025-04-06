export const toggleMegamenu = (e) => dispatch => {
    dispatch({
        type: 'TOGGLE_MEGA_MENU',
        payload: e
    })
}

export const setMiniHover = (e) => dispatch => {
    dispatch({
        type: 'SET_MINI_HOVER',
        payload: e
    })
}

export const setMiniSidebarMenuOn = (e) => dispatch => {
    dispatch({
        type: 'SET_MINI_SIDE_MENU_ON',
        payload: e
    })
}

export const toggleSearchBar = (e) => dispatch => {
    dispatch({
        type: 'TOGGLE_SEARCH_BAR',
        payload: e
    })
}

export const toggleNotificationBar = (e) => dispatch => {
    dispatch({
        type: 'TOGGLE_NOTIFICATION_BAR',
        payload: e
    })
}

export const setHorizontalMenu = (e) => dispatch => {
    dispatch({
        type: 'SET_HORIZONTAL_MENU',
        payload: e
    })
}

export const setMiniSidebar = (e) => dispatch => {
    dispatch({
        type: 'SET_MENU_SIDEBAR',
        payload: e
    })
}

export const setThemeColor = (e) => dispatch => {
    dispatch({
        type: 'SET_THEME_COLOR',
        payload: e
    })
}

export const setFontStyle = (e) => dispatch => {
    dispatch({
        type: 'SET_FONT_STYLE',
        payload: e
    })
}

export const setLightTheme = (e) => dispatch => {
    dispatch({
        type: 'SET_LIGHT_THEME',
        payload: e
    })
}

export const setRtlVersion = (e) => dispatch => {
    dispatch({
        type: 'SET_RTL_VERSION',
        payload: e
    })
}
export const setOffcanvas = (e) => dispatch => {
    dispatch({
        type: 'SET_OFF_CANVAS',
        payload: e
    })
}

export const setLogout = (e) => dispatch => {
    dispatch({
        type: 'USER_LOGOUT',
        payload: e
    })
}