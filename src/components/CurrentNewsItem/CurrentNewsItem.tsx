import React from 'react';

import { Popover, Button } from 'antd';
import Avatar from '../Avatar';
import isToday from 'date-fns/is_today';
import { format } from 'date-fns';

import './CurrentNewsItem.scss';

interface ICurrentNewsItemProps {
    user: any;
    currentNews: any;
    history?: any;
    // goBack: () => void;
}

const CurrentNewsItem = (props: ICurrentNewsItemProps) => {
    const { user, currentNews, history } = props;
    console.log(props)
    const getMessageTime = (createdAt: any) => {
        if (isToday(createdAt)) {
            return format(createdAt, 'HH:mm');
        } else {
            return format(createdAt, 'DD.MM.YYYY');
        }
    };

    return (
        <div className="currentNews__item">
            <div className="currentNews__item-info">
                <div className="currentNews__item-info-top">
                    <div className="currentNews__item-info-top-titleWithCategory">
                        <div className="currentNews__item-title">
                            <h1>{currentNews.text}</h1>
                        </div>
                        <div className="currentNews__item-category">
                            <h2><span>Категория</span>: {currentNews.category}</h2>
                        </div>
                    </div>
                </div>
                <div className="currentNews__item-info-bottom">
                    <img className="currentNews__item-imgPic" src={'https://minsknews.by/wp-content/uploads/2016/08/BNTU-1.jpg'} alt="PicterNews" />
                    <div className="currentNews__item-descriptionWithAuthorInfo">
                        <div className="currentNews__item-description">
                            <p>{currentNews.description}</p>
                        </div>
                        <div className="currentNews__item-info-bottom-author">
                            <div className="currentNews__item-avatarUser">
                                <Avatar user={user._id === currentNews.author.id ? user : currentNews.author} />
                            </div>
                            <div className="currentNews__item-userInfo">
                                <b>{user._id === currentNews.author._id ? user.fullName : currentNews.author.fullName}</b>
                                <span>{getMessageTime(currentNews.createdAt)}</span>
                            </div>
                        </div>
                    </div>
                    {user._id === currentNews.author.id && <Popover className="currentNews__item-actionButtons" placement="topLeft"
                        content={
                            <div>
                                <Button onClick={() => console.log("remove")}>Удалить новость</Button>
                            </div>
                        }
                        trigger="click">
                        <div>
                            <Button type="link" shape="circle" icon="ellipsis" size="large" />
                        </div>
                    </Popover>}
                </div>
                {!!history && <Button className="buttonGoBack" onClick={() => history.goBack()}>Назад</Button>}
            </div>
        </div>)
}

export default CurrentNewsItem;

