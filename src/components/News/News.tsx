import React from 'react';

let name: string = 'Roman';
type ItemPropsType = {
    user: string,
    id: number,
    text: string,
}
type PropsType = {
    news: Array<ItemPropsType>
}

const News: React.FC<PropsType> = ({ news }) => {
    const content = news.map(item => (
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