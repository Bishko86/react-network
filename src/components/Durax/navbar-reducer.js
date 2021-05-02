let initialState = {
    navbarLinks: {
        profile: '/profile',
        users: '/users',
        message: '/dialogs',
        news: '/news',
        music: '/music',
        settings: '/settings',
        friends: '/friends'

    },
    navbarItems() {
        let keys = [];
        keys = Object.keys(this.navbarLinks);
        let items = keys.map(key => key[0].toUpperCase() + key.slice(1));
        return items;
    }
};

const navbarReducer = (state = initialState, action) => {

    return state;
}
export default navbarReducer;