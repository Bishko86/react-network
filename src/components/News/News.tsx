import React from 'react';

let name: string = 'Roman';
type NewsObjectType = {
    user: string,
    id: number,
    text: string,
}
type InitStateTypes = {
    news: Array<NewsObjectType>
}
const initState: InitStateTypes
    = {
    news: [{ user: 'Roman', id: 1, text: 'How are you?' },
    { user: 'Maria', id: 2, text: 'Hello me friends' },
    { user: 'Marta', id: 3, text: 'I am fine)' }
    ],

}
// let props = initState;
const News = () => {

    const content = initState.news.map(item => (
        <div style={{ color: '#fff' }} key={item.id} >
            <span key={item.id + '1'}> {item.user} </span>
            <span key={item.id + '2'}> {item.id} </span>
            <span key={item.id + '3'}> {item.text} </span>
        </div>)
    )

    return (
        <div> word
            {
                content
            }
        </div>
    )
}
export default News;