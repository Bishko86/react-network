
type NavbarLinks = {
    profile: string
    users: string
    message: string
    news: string
    music: string
    settings: string
    friends: string
    navbarItems: () => Array<string>

}

let initialState = {
    navbarLinks: {
        profile: '/profile',
        users: '/users',
        message: '/dialogs',
        news: '/news',
        music: '/music',
        settings: '/settings',
        friends: '/friends',

    } as NavbarLinks,
    navbarItems() {
        let keys = [];
        keys = Object.keys(this.navbarLinks);
        let items = keys.map(key => key[0].toUpperCase() + key.slice(1));
        return items;
    }
};

type InitialStateType = typeof initialState;
const navbarReducer = (state = initialState, action: any): InitialStateType => {

    return state;
}
export default navbarReducer;