const SEND_MESSAGE = 'SEND_MESSAGE';
const SET_TEXT = 'SET_TEXT';

let initialState = {
    dialogUser: [
        {
            id: 1,
            name: 'Roman',
            url: 'https://storage.jewheart.com/content/users/avatars/2920/avatar_2920_500.jpg?1558626096',

            dialog: [

                {
                    me: 'guest',
                    message: 'You are welcome',
                    id: 1
                },
                {
                    user: 'guest',
                    message: 'Hello. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut id nisi suscipit dolore quas at debitis recusandae repudiandae amet eveniet!',
                    id: 2
                },
                {
                    me: 'guest',
                    message: 'Hello.How are you?',
                    id: 3
                },
                {
                    user: 'guest',
                    message: 'Thank you!I am okey Lorem ipsum dolor sit amet consectetur adipisicing elit.Aut id nisi suscipit dolore quas at debitis recusandae repudiandae amet eveniet! Thank you!I am okey Lorem ipsum dolor sit amet consectetur adipisicing elit.Aut id nisi suscipit dolore quas at debitis recusandae repudiandae amet eveniet!',
                    id: 4
                },
                {
                    me: 'guest',
                    message: 'Very nice)',
                    id: 5
                },
            ],

        },
        {
            id: 2,
            name: 'Ivan',
            url: 'https://bipbap.ru/wp-content/uploads/2017/05/VOLKI-krasivye-i-ochen-umnye-zhivotnye.jpg',
            dialog: [
                {
                    user: 'guest',
                    message: 'Goodnight honey',
                    id: 1
                },
                {
                    me: 'guest',
                    message: 'Goodnight my dear',
                    id: 2
                },
                {
                    user: 'guest',
                    message: 'I love you',
                    id: 3
                },
                {
                    me: 'guest',
                    message: 'And I you too',
                    id: 4
                },
                {
                    me: 'guest',
                    message: 'Buy buy',
                    id: 5
                },
            ]
        },
        {
            id: 3,
            name: 'Stephan',
            url: 'https://sun9-4.userapi.com/impf/c622525/v622525638/4af76/FHil73y11v0.jpg?size=600x260&quality=96&proxy=1&sign=f859b538c68a2e31968ba0601eba79c5&type=album',
            dialog: [{
                user: 'guest',
                message: 'Hello, Ruslan',
                id: 1
            },
            {
                me: 'guest',
                message: 'Hello user',
                id: 2
            },
            {
                me: 'guest',
                message: 'ha ha',
                id: 3
            },]
        },
        {
            id: 4,
            name: 'Ruslan',
            url: 'https://ru.myanimeshelf.com/eva2/upload/ad52b485db1863be730c79fe65b3402c/%D1%84%D0%BC%D1%84%D0%B5%D1%84%D0%BA.jpg',
            dialog: [{
                user: 'guest',
                message: 'lorem ipsum dolor',
                id: 1
            },
            {
                me: 'guest',
                message: 'Can I help you?',
                id: 2
            },
            {
                me: 'guest',
                message: 'No thank you',
                id: 3
            },]
        },
    ],
};

const dialogReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TEXT:
            return {
                ...state,
                userText: action.text
            }
        case SEND_MESSAGE:
            if (state.userText === '') return state;
            return {
                ...state,
                dialogUser: state.dialogUser.map((user, index) => {
                    if (index === action.id) {
                        return {
                            ...user,
                            dialog: [...user.dialog, {
                                me: 'host',
                                message: action.text,
                                id: user.dialog.length + 1
                            }
                            ]
                        }
                    }
                    return user
                })
            }
        default:
            return state;
    }
}

export const sendMessage = (text, id) => ({ type: SEND_MESSAGE, text, id });
export default dialogReducer;