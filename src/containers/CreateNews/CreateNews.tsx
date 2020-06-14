import React, { useState } from "react";
import { connect } from "react-redux";

import { userApi, newsApi } from "../../utils/api";

import { CreateNewsModal } from '../../components';

import './CreateNews.scss';
import socket from "../../core/socket";

const CreateNews = ({ user }: any) => {
    const [visible, setVisible] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState("");
    const [descriptionText, setDescriptionText] = useState("");
    const [categoryText, setCategoryText] = useState("");
    const [imgUrl, setImgUrl] = useState("");

    const onAddNews = () => {
        newsApi
            .createNews({
                text: inputValue,
                description: descriptionText,
                category: categoryText,
                img: imgUrl
            })
            .then(() => {
                socket.on('SERVER:NEW_NEWS', onAddNews);
                setVisible(false);
                setInputValue('');
                setDescriptionText('');
                setCategoryText('');
                setImgUrl('');
                socket.removeListener('SERVER:NEW_NEWS', onAddNews);
            })
    };

    const handleChangeInput = (e: any) => {
        setInputValue(e.target.value);
    };

    const onChangeTextArea = (e: any) => {
        setDescriptionText(e.target.value);
    };

    const onChangeTextCategory = (e: any) => {
        setCategoryText(e.target.value);
    };

    const onChangeImgUrl = (e: any) => {
        setImgUrl(e.target.value);
    };

    return (
        <div>
            <div className="addNews" onClick={() => setVisible(!visible)}>
                +
            </div>
            {visible &&
                <CreateNewsModal
                    inputValue={inputValue}
                    onChangeInput={handleChangeInput}
                    onChangeTextArea={onChangeTextArea}
                    descriptionText={descriptionText}
                    categoryText={categoryText}
                    onChangeTextCategory={onChangeTextCategory}
                    visible={visible}
                    setVisible={(arg: boolean) => setVisible(!arg)}
                    onModalOk={onAddNews}
                    imgUrl={imgUrl} 
                    onChangeImgUrl={onChangeImgUrl}
                />
            }
        </div>
    );
}

export default connect(({ user }: any) => ({ user: user.data }))(CreateNews);
