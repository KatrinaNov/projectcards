import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import styles from "./Chat.module.css";
import Modal from "../../main/ui/common/Modal/Modal";
import ModalButtonsWrap from "../../main/ui/common/Modal/ModalButtonsWrap";
import SuperButton from "../../main/ui/common/SuperButton/SuperButton";
import io  from "socket.io-client";
import chatImg from "./chat2.png";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../main/bll/store";
import SuperTextArea from "../../main/ui/common/SuperTextArea/SuperTextArea";


type MessageType = {
  _id: string
  message: string
  user: {
    _id: string
    name: string
  }
}

let socket:SocketIOClient.Socket | null = null

export const Chat = () => {
  const userName = useSelector<AppRootStateType, string>(state => state.profilePage.name);

  const [messages, setMessages] = useState<MessageType[]>([])
  const [newMessage, setNewMessage] = useState<string>('');
  const [isModal, setIsModal] = useState<boolean>(false);
  const scroll= useRef<HTMLDivElement>(null)

  const showModal = () => setIsModal(true);
  const closeModal = () => setIsModal(false);

  useEffect(()=> {
    socket = io("https://neko-back.herokuapp.com/")
    socket.emit("init",  (answer: string) => console.log(answer));
    socket.emit("client-name-sent", userName, (answer: string) => console.log(answer));
    socket.on('init-messages-published', (messages: MessageType[]) => {
      console.log(messages)
      setMessages(prevState => [...prevState, ...messages])
    })

    socket.on('new-message-sent', (mes:MessageType)=>{
      console.log(mes)
      setMessages(prevState => [...prevState, mes])

    })
    return () => {
      socket?.close()
    }
  }, [])

  useEffect(() => window.scrollTo(0, 1000), []);
  const sendMassage = () => {
    if (socket?.connected)
    if(socket?.connected && newMessage){
      socket?.emit("client-message-sent", newMessage, (answer: string) => {
        console.log(answer)
      })
      setNewMessage('')
    }

  }
  const messagesList = messages.map(m => {
    return (
      <div  key={m._id}>
        <span className={styles.pre}><b>{m.user.name}: </b> {m.message} </span>
      </div>
    )
  })
  return (
    <>
      <div className={styles.chatContainer}>
        <button className={styles.btnChat} onClick={showModal}>
          <img src={chatImg} alt="chat" className={styles.chatSymbol}/>
          &nbsp; Chat
        </button>
      </div>
      <Modal title={'Chat'} show={isModal} closeModal={closeModal}>
        <div className={styles.chatTable} ref={scroll}>
          {messagesList}
        </div>
        <label>New massage</label>
        <SuperTextArea value={newMessage} onChangeText={setNewMessage} placeholder={'New massage ...'}/>

        <ModalButtonsWrap closeModal={closeModal}>
          <SuperButton onClick={sendMassage}>Sand</SuperButton>
        </ModalButtonsWrap>
      </Modal>
    </>
  )
}
//elem.scrollTop = elem.scrollHeight;

