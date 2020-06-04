import React from 'react';
import format from 'date-fns/format';
import isToday from 'date-fns/is_today';
import { Link } from 'react-router-dom';
import { Popover, Button } from 'antd';
import { Avatar } from '../';

import './NewsItem.scss';

interface INewsItemProps {
    _id: string;
    title: string;
    description: string;
    category: string;
    createdAt: string;
    author: any;
    user: any;
    onRemoveNews: any;
}

const getMessageTime = (createdAt: any) => {
    if (isToday(createdAt)) {
        return format(createdAt, 'HH:mm');
    } else {
        return format(createdAt, 'DD.MM.YYYY');
    }
};

const NewsItem = ({
    _id,
    title,
    description,
    category,
    createdAt,
    author,
    user,
    onRemoveNews
}: INewsItemProps) => {
    const isMe: boolean = user._id === author._id;
    return (
        <div className="news__item">
            <div className="news__item-info">
                <div className="news__item-info-top">
                    <div className="news__item-category">
                        <h2>Категория: {category}</h2>
                    </div>
                    <img className="news__item-img" src={'https://minsknews.by/wp-content/uploads/2016/08/BNTU-1.jpg'} alt="PicterNews" />
                    <div className="news__item-title">
                        <h1>{title}</h1>
                    </div>
                    <div className="news__item-description">
                        <p>{description}</p>
                    </div>
                </div>
                <div className="news__item-info-bottom">
                    <div className="news__item-avatarUser">
                        <Avatar user={isMe ? user : author} />
                    </div>
                    <div className="news__item-userInfo">
                        <b>{isMe ? user.fullName : author.fullName}</b>
                        <span>{getMessageTime(createdAt)}</span>
                    </div>
                    <Popover className="news__item-actionButtons" placement="topLeft"
                        content={
                            <div>
                                <Button>
                                    <Link key={_id} to={`/news?id=${_id}`}>Посмотреть новость</Link>
                                </Button>
                                {isMe && <Button onClick={onRemoveNews}>Удалить новость</Button>}
                            </div>
                        }
                        trigger="click">
                        <div>
                            <Button type="link" shape="circle" icon="ellipsis" size="large" />
                        </div>
                    </Popover>
                </div>
            </div>
        </div>
    )
};

export default NewsItem;