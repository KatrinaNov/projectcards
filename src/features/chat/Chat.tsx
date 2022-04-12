import React, {useState} from 'react';
import styles from "./Chat.module.css";
import SuperInputText from "../../main/ui/common/SuperInputText/SuperInputText";
import Modal from "../../main/ui/common/Modal/Modal";
import ModalButtonsWrap from "../../main/ui/common/Modal/ModalButtonsWrap";
import SuperButton from "../../main/ui/common/SuperButton/SuperButton";
import chatImg from "./chat2.png"

export const Chat = () => {
  const [newPackName, setNewPackName] = useState<string>('');
  const [isModal, setIsModal] = useState<boolean>(false);

  const showModal = () => setIsModal(true);
  const closeModal = () => setIsModal(false);
  
  const sendMassage = () => {
    
  }

  return (
    <>
      <div className={styles.chatContainer}>
        <button className={styles.btnChat} onClick={showModal}>
          <img src={chatImg} alt="chat" className={styles.chatSymbol}/>
          &nbsp; Chat
        </button>
      </div>
      <Modal title={'Chat'} show={isModal} closeModal={closeModal}>
        <div className={styles.chatTable}>

        </div>
        <label>New massage</label>
        <SuperInputText value={newPackName} onChangeText={setNewPackName} placeholder={'New massage ...'}/>

        <ModalButtonsWrap closeModal={closeModal}>
          <SuperButton onClick={sendMassage}>Sand</SuperButton>
        </ModalButtonsWrap>
      </Modal>
    </>
  )
}



