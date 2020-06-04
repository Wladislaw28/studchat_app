import React from 'react';
import { Button, Modal, Form, Input } from 'antd';
import TextArea from 'antd/lib/input/TextArea';

const CreateNewsModal = (props: any) => {
    const { visible, setVisible, inputValue, onChangeInput, onChangeTextArea,
        descriptionText, categoryText, onChangeTextCategory, onModalOk } = props;
    return (
        <div className="signOut__container">
            <Modal
                title="Создать новость"
                visible={visible}
                onCancel={() => setVisible(visible)}
                footer={[
                    <Button
                        key="submit"
                        disabled={!inputValue
                            || !descriptionText
                            || !categoryText}
                        type="primary"
                        onClick={onModalOk}>
                        Создать
                    </Button>,
                    <Button key="back" onClick={() => setVisible(visible)}>
                        Закрыть
                    </Button>,
                ]}>
                <Form className="add-dialog-form">
                    <Form.Item label="Введите название новости">
                        <Input
                            value={inputValue}
                            onChange={onChangeInput}
                        />
                    </Form.Item>
                    <Form.Item label="Введите описание новости">
                        <TextArea
                            autosize={{ minRows: 3, maxRows: 10 }}
                            onChange={onChangeTextArea}
                            value={descriptionText}
                        />
                    </Form.Item>
                    <Form.Item label="Введите название категории">
                        <Input
                            value={categoryText}
                            onChange={onChangeTextCategory}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default CreateNewsModal;
