import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { newsActions } from '../../redux/actions';

import { Popover, Button } from 'antd';
import { isToday, format } from 'date-fns';
import { Avatar } from '../../components';

import './CurrentNews.scss';

const CurrentNews = (props: any) => {
    const { setCurrentNewsId, user, items, location, fetchNews, currentNewsId } = props;
    const [newsCurrentId, setNewsCurrentId] = React.useState<string>('');
    const [currentNews, setCurrentNews] = React.useState<any>();

    useEffect(() => {
        const { search } = location;
        const index = search.indexOf('=') + 1;
        const newsId = search.substring(index, search.length);
        setCurrentNewsId(newsId);
        setNewsCurrentId(newsId);
    }, [location.search]);

    useEffect(() => {
        if (!!newsCurrentId) {
            fetchNews();
            if (!!items.length) {
                const currNews = items.filter((item: any) => item._id === newsCurrentId)[0];
                return setCurrentNews(currNews);
            }
        }
    }, [newsCurrentId])

    const getMessageTime = (createdAt: any) => {
        if (isToday(createdAt)) {
            return format(createdAt, 'HH:mm');
        } else {
            return format(createdAt, 'DD.MM.YYYY');
        }
    };

    return (
        <div className="currentNews">
            {(!!currentNews && !!user) && (
                <div className="news__item">
                    {console.log(currentNews)}
                    <div className="news__item-info">
                        <div className="news__item-info-top">
                            <div className="news__item-category">
                                <h2>Категория: {currentNews.category}</h2>
                            </div>
                            <img className="news__item-imgPic" src={'https://minsknews.by/wp-content/uploads/2016/08/BNTU-1.jpg'} alt="PicterNews" />
                            <div className="news__item-title">
                                <h1>{currentNews.text}</h1>
                            </div>
                            <div className="news__item-description">
                                <p>{currentNews.description}</p>
                            </div>
                        </div>
                        <div className="news__item-info-bottom">
                            <div className="news__item-avatarUser">
                                <Avatar user={user._id === currentNews.author.id ? user : currentNews.author} />
                            </div>
                            <div className="news__item-userInfo">
                                <b>{user._id === currentNews.author._id ? user.fullName : currentNews.author.fullName}</b>
                                <span>{getMessageTime(currentNews.createdAt)}</span>
                            </div>
                            {user._id === currentNews.author.id && <Popover className="news__item-actionButtons" placement="topLeft"
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
                    </div>
                </div>
            )}
        </div>
    )
}

export default withRouter(
    connect(
        ({ user, news }: any) => ({
            user: user.data,
            items: news.items,
            isLoading: news.isLoading,
        }),
        newsActions,
    )(CurrentNews),
);