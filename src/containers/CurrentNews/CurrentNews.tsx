import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { newsActions } from '../../redux/actions';

import { CurrentNewsItem } from '../../components';
import Header from '../Header/Header';

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

    return (
        <div className="main">
            <div className="main__container">
                <Header className="header__currentNews" isCompactMode={false} />
                <div className="main__container-news main__container-currentNews">
                    <div className="currentNews">
                        {(!!currentNews && !!user) && (
                            <CurrentNewsItem user={user} currentNews={currentNews} history={props.history} />
                        )}
                    </div>
                </div>
            </div>
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