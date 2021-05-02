
import profileReducer from './profile-reducer'
import dialogReducer from './dialog-reducer'
import navbarReducer from './navbar-reducer'
let store = {
    state: {
        profile: {
            user: {
                avatar: 'link',
                name: 'Roman',
                sureName: 'Bishko',
                birthday: '18, 08, 1986',
                age: 34,
                likedPosts: new Set()
            },
            posts: [
                {
                    id: 1,
                    post: "Hey, how are you?",
                    _likes: 8,
                    liked: false
                },
                {
                    id: 2,
                    post: "Hello, friend!",
                    _likes: 15,
                    liked: false
                },
                {
                    id: 3,
                    post: "Please at this link https://www.google.com.ua/?hl=uk",
                    _likes: 68,
                    liked: false
                }
            ],
            generatePost(text) {
                return {
                    id: this.posts.length + 1,
                    post: text,
                    _likes: 0,
                    liked: false
                }
            },


            _postText: "Bishko Roman",

            get getText() {
                return this._postText;
            },

            set setText(text) {
                this._postText = text;

            },

            assignValue(text) {
                this.setText = text;

            }
        },

        dialogs: {
            _userId: 0,
            _userText: 'text',
            get getUserText() {
                return this._userText;
            },
            dialogUser: [
                {
                    dialog: [
                        {
                            me: 'guest',
                            message: 'You are welcome'
                        },
                        {
                            user: 'guest',
                            message: 'Hello. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut id nisi suscipit dolore quas at debitis recusandae repudiandae amet eveniet!'
                        },
                        {
                            me: 'guest',
                            message: 'Hello.How are you?'
                        },
                        {
                            user: 'guest',
                            message: 'Thank you!I am okey Lorem ipsum dolor sit amet consectetur adipisicing elit.Aut id nisi suscipit dolore quas at debitis recusandae repudiandae amet eveniet! Thank you!I am okey Lorem ipsum dolor sit amet consectetur adipisicing elit.Aut id nisi suscipit dolore quas at debitis recusandae repudiandae amet eveniet!'
                        },
                        {
                            me: 'guest',
                            message: 'Very nice)'
                        },
                    ],
                    id: 1,
                    name: 'Roman',
                    url: 'https://storage.jewheart.com/content/users/avatars/2920/avatar_2920_500.jpg?1558626096',

                },
                {
                    id: 2,
                    name: 'Ivan',
                    url: 'https://bipbap.ru/wp-content/uploads/2017/05/VOLKI-krasivye-i-ochen-umnye-zhivotnye.jpg',
                    dialog: [
                        {
                            user: 'guest',
                            message: 'Goodnight honey'
                        },
                        {
                            me: 'guest',
                            message: 'Goodnight my dear'
                        },
                        {
                            user: 'guest',
                            message: 'I love you'
                        },
                        {
                            me: 'guest',
                            message: 'And I you too'
                        },
                        {
                            me: 'guest',
                            message: 'Buy buy'
                        },
                    ]
                },
                {
                    id: 3,
                    name: 'Stephan',
                    url: 'https://sun9-4.userapi.com/impf/c622525/v622525638/4af76/FHil73y11v0.jpg?size=600x260&quality=96&proxy=1&sign=f859b538c68a2e31968ba0601eba79c5&type=album',
                    dialog: [{
                        user: 'guest',
                        message: 'Hello, Ruslan'
                    },
                    {
                        me: 'guest',
                        message: 'Hello user'
                    },
                    {
                        me: 'guest',
                        message: 'ha ha'
                    },]
                },
                {
                    id: 4,
                    name: 'Ruslan',
                    url: 'https://ru.myanimeshelf.com/eva2/upload/ad52b485db1863be730c79fe65b3402c/%D1%84%D0%BC%D1%84%D0%B5%D1%84%D0%BA.jpg',
                    dialog: [{
                        user: 'guest',
                        message: 'lorem ipsum dolor'
                    },
                    {
                        me: 'guest',
                        message: 'Can I help you?'
                    },
                    {
                        me: 'guest',
                        message: 'No thank you'
                    },]
                },
                // {
                //     id: 5,
                //     name: 'Maria',
                //     url: 'https://bipbap.ru/wp-content/uploads/2017/05/VOLKI-krasivye-i-ochen-umnye-zhivotnye.jpg',
                //     dialog: [
                //         {
                //             user: 'guest',
                //             message: 'Hello'
                //         },
                //         {
                //             user: 'host',
                //             message: 'Hello, how are you?'
                //         }
                //     ]
                // },
                // {
                //     id: 6,
                //     name: 'Anna',
                //     url: 'https://bipbap.ru/wp-content/uploads/2017/05/VOLKI-krasivye-i-ochen-umnye-zhivotnye.jpg',
                //     dialog: []
                // }
            ],
        },

        navbar: {
            navbarLinks: {
                profile: '/profile',
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
        },

    },

    getState() {
        return this.state
    },

    runApp() {
        console.log('hello');
    },
    subscribe(observer) {
        this.runApp = observer;
    },


    dispatch(action) {
        debugger;
        this.state.profile = profileReducer(this.state.profile, action);

        this.state.dialogs = dialogReducer(this.state.dialogs, action);
        this.state.navbar = navbarReducer(this.state.navbar, action);
        this.runApp(this.state);
    }

}






export default store;