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

    // React.useEffect((),
    //     []);

    const onAddNews = () => {
        newsApi
            .createNews({
                text: inputValue,
                description: descriptionText,
                category: categoryText
            })
            .then(() => {
                socket.on('SERVER:NEW_NEWS', onAddNews);
                setVisible(false);
                setInputValue('');
                setDescriptionText('');
                setCategoryText('');
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
                />
            }
        </div>
    );
}

export default connect(({ user }: any) => ({ user: user.data }))(CreateNews);
