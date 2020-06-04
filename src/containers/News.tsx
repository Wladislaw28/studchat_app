import React from 'react';
import { NewsItem } from '../components';
import orderBy from 'lodash/orderBy';
import { Empty } from 'antd';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { newsActions } from '../redux/actions';
import socket from '../core/socket';

import './News.scss';

const News = (props: any) => {
    const { user, fetchNews, items, isLoading, removeNewsById } = props;

    React.useEffect(() => {
        if (!items.length) {
            return fetchNews()
        }
    }, [items])

    React.useEffect(() => {
        fetchNews();

        socket.on('SERVER:NEW_NEWS', fetchNews);
        return () => {
            socket.removeListener('SERVER:NEW_NEWS', fetchNews);
        };
    }, []);

    return (
        <div className="news">
            {user && <div className="news__newsItems">
                {items.length ? (
                    orderBy(items, ["createdAt"], ["desc"]).map(item => (
                        <NewsItem
                            key={item._id}
                            _id={item._id}
                            title={item.text}
                            description={item.description}
                            category={item.category}
                            createdAt={item.createdAt}
                            author={item.author}
                            user={user}
                            onRemoveNews={() => removeNewsById(item._id)}
                        />
                    ))
                ) : (
                        <Empty
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            description="Новостей нет"
                        />
                    )}
            </div>}
        </div>
    );
}

export default withRouter(
    connect(
        ({ user, news }: any) => ({
            user: user.data,
            items: news.items,
            isLoading: news.isLoading,
        }),
        newsActions,
    )(News),
);