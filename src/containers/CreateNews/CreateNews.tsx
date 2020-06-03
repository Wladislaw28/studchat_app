import React, { useState } from "react";
import { connect } from "react-redux";

// import { userApi, dialogsApi } from "../../utils/api";

import { CreateNewsModal } from '../../components';

import './CreateNews.scss';

const CreateNews = ({ user }: any) => {
    const [visible, setVisible] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState("");
    const [descriptionText, setDescriptionText] = useState("");

    const onAddNews = () => {
        // dialogsApi
        //   .create({
        //     partner: selectedUserId,
        //     text: messageText
        //   })
        //   .then(onClose)
        //   .catch(() => {
        //     setIsLoading(false);
        //   });
    };

    const handleChangeInput = (e: any) => {
        setInputValue(e.target.value);
    };

    const onChangeTextArea = (e: any) => {
        setDescriptionText(e.target.value);
    };

    return (
        <div>
            <div className="addNews" onClick={() => setVisible(!visible)}>
                +
            </div>
            {visible === true &&
                <CreateNewsModal
                    inputValue={inputValue}
                    onChangeInput={handleChangeInput}
                    onChangeTextArea={onChangeTextArea}
                    descriptionText={descriptionText}
                    visible={visible}
                    setVisible={(arg: boolean) => setVisible(!arg)}
                />
            }
        </div>
    );
}

export default connect(({ user }: any) => ({ user: user.data }))(CreateNews);
