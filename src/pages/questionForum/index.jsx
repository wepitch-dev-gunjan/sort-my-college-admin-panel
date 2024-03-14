import './style.scss';
import AdminAvatar from '../../assets/admin.png';
import UserAvatar from '../../assets/user.jpeg';
import { IoMdSend } from "react-icons/io";


const QuestionForum = () => {
    return(
        <>
            <div className='qf-parent'>
                <div className='qf-child' >
                    <div className='question-discussion' >
                    <div className='user-response'>
                        <div className='resp-avatar' >
                                <img src={ UserAvatar } alt="" />
                            </div>
                            <div className="resp-chat-block user-chat-block">
                                <p className="resp-details"><span>Rakshita Kanwar</span> 23:00 </p>
                                <p className='resp-message' >Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis modi at totam ab illo, cum a quo suscipit, voluptatibus nostrum dolor quia quisquam! Aliquam.</p>
                            </div>
                           
                        </div>
                        <div className='admin-response'>
                          
                            <div className="resp-chat-block admin-chat-block">
                                <p className="resp-details"><span>Admin</span> 23:09 </p>
                                <p className='resp-message' >Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis modi at totam ab illo, cum a quo suscipit, voluptatibus nostrum dolor quia quisquam! Aliquam.</p>
                            </div>
                            <div className='resp-avatar' >
                                <img src={ AdminAvatar } alt="" />
                            </div>
                        </div>
                        <div className='user-response'>
                        <div className='resp-avatar' >
                                <img src={ UserAvatar } alt="" />
                            </div>
                            <div className="resp-chat-block user-chat-block">
                                <p className="resp-details"><span>Rakshita Kanwar</span> 23:00 </p>
                                <p className='resp-message' >Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis modi at totam ab illo, cum a quo suscipit, voluptatibus nostrum dolor quia quisquam! Aliquam.</p>
                            </div>
                           
                        </div>
                        <div className='admin-response'>
                          
                            <div className="resp-chat-block admin-chat-block">
                                <p className="resp-details"><span>Admin</span> 23:09 </p>
                                <p className='resp-message' >Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis modi at totam ab illo, cum a quo suscipit, voluptatibus nostrum dolor quia quisquam! Aliquam.</p>
                            </div>
                            <div className='resp-avatar' >
                                <img src={ AdminAvatar } alt="" />
                            </div>
                        </div>
                        <div className='user-response'>
                        <div className='resp-avatar' >
                                <img src={ UserAvatar } alt="" />
                            </div>
                            <div className="resp-chat-block user-chat-block">
                                <p className="resp-details"><span>Rakshita Kanwar</span> 23:00 </p>
                                <p className='resp-message' >Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis modi at totam ab illo, cum a quo suscipit, voluptatibus nostrum dolor quia quisquam! Aliquam.</p>
                            </div>
                           
                        </div>
                        <div className='admin-response'>
                          
                            <div className="resp-chat-block admin-chat-block">
                                <p className="resp-details"><span>Admin</span> 23:09 </p>
                                <p className='resp-message' >Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis modi at totam ab illo, cum a quo suscipit, voluptatibus nostrum dolor quia quisquam! Aliquam.</p>
                            </div>
                            <div className='resp-avatar' >
                                <img src={ AdminAvatar } alt="" />
                            </div>
                        </div>
                        <div className='user-response'>
                        <div className='resp-avatar' >
                                <img src={ UserAvatar } alt="" />
                            </div>
                            <div className="resp-chat-block user-chat-block">
                                <p className="resp-details"><span>Rakshita Kanwar</span> 23:00 </p>
                                <p className='resp-message' >Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis modi at totam ab illo, cum a quo suscipit, voluptatibus nostrum dolor quia quisquam! Aliquam.</p>
                            </div>
                           
                        </div>
                        <div className='admin-response'>
                          
                            <div className="resp-chat-block admin-chat-block">
                                <p className="resp-details"><span>Admin</span> 23:09 </p>
                                <p className='resp-message' >Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis modi at totam ab illo, cum a quo suscipit, voluptatibus nostrum dolor quia quisquam! Aliquam.</p>
                            </div>
                            <div className='resp-avatar' >
                                <img src={ AdminAvatar } alt="" />
                            </div>
                        </div>
                        
                    </div>
                    <div className="give-a-response">
                        <textarea placeholder='Enter a response here...' type="text" resize='vertical'></textarea>
                        <button><IoMdSend /></button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default QuestionForum;