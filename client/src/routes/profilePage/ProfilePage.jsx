import { Link, useLoaderData, useNavigate } from "react-router-dom";
import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import apiRequest from "../../lib/apiRequest";
import "./profilePage.scss";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";

function ProfilePage() {
  const data= useLoaderData();
    const posts = data?.postResponse?.data || [];
    const chats = data?.chatResponse?.data || [];

  const {currentUser, updateUser}=useContext(AuthContext);
  const navigate= useNavigate();


  const handleLogout=async()=>{
    try{
      await apiRequest.post("/auth/logout");
      updateUser(null);
      navigate("/login");

    }catch(err){
        console.log(err);  
    }
  }
  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <Link to="/profile/update">
            <button>Update Profile</button>
            </Link>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img
                src={currentUser.avatar || "/noAvathar.png"}
                alt=""
              />
            </span>
            <span>
              Username: <b>{currentUser.username}</b>
            </span>
            <span>
              E-mail: <b>{currentUser.email}</b>
            </span>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div className="title">
            <h1>My List</h1>
            <Link to="/add">
              <button>Create New Post</button>
            </Link>
          </div>
          <List posts={posts.userPosts} />
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <List posts={posts.savedPosts} />
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <Chat chats={chats} />
        </div>
      </div>
    </div>
    
  );
}

export default ProfilePage;

