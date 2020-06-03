import React from 'react';

import { Button, Modal } from 'antd';

const SignOutModal = (props: any) => {
    const {visible, setVisible} = props;
    console.log(visible, setVisible)
    return (
        <div className="signOut__container">
            <Modal
                title="Выход из приложения"
                visible={visible}
                onCancel={() => setVisible(visible)}
                footer={[
                    <Button
                        key="signOut"
                        type="primary"
                        onClick={() => {
                            localStorage.clear();
                            location.reload();
                        }}>
                        Да
                    </Button>,
                    <Button key="back" onClick={() => setVisible(visible)}>
                        Отмена
                    </Button>,
                ]}>Вы точно хотите выйти?</Modal>
        </div>
    );
}

export default SignOutModal;
