import "./singlePage.scss";
import Slider from "../../components/slider/Slider";
import Map from "../../components/map/Map";
import { redirect, useLoaderData, useNavigate } from "react-router-dom";
import dompurify from "dompurify";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import apiRequest from "../../lib/apiRequest";
import Chat from "../../components/chat/Chat"; // Ungaloda Chat component path

function SinglePage() {
  const loaderData = useLoaderData();
  const post = loaderData?.post || loaderData;
  const [saved, setSaved] = useState(post.isSaved);
  const { currentUser } = useContext(AuthContext);
  const [chat, setChat] = useState(null); // Chat state
  const navigate = useNavigate(); // Navigation hook

  const handleSave = async () => {
    // AFTER REACT 19 UPDATE TO USEOPTMISTIC HOOK
    setSaved((prev) => !prev);
    if (!currentUser) {
      navigate("/login");
    }

    try {
      await apiRequest.post("/users/save", { postId: post.id });
    } catch (error) {
      console.error("Error saving post:", error);
      setSaved((prev) => !prev);
    }
  };

  // Data load aagama irundha illai null ah irundha loading indicator
  if (!post || !post.title) {
    return (
      <div className="loading" style={{ padding: "20px" }}>
        Loading / Data not found...
      </div>
    );
  }

  const receiverId = post?.user?.id || post?.userId;

  const handleOpenChat = () => {
    if (!currentUser) {
      return navigate("/login");
    }

    if (!receiverId || receiverId === currentUser.id) {
      return;
    }

    setChat({
      receiver: {
        id: receiverId,
        username: post.user?.username,
        avatar: post.user?.avatar,
      },
      postId: post.id,
    });
  };

  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={post?.images || []} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{post?.title}</h1>
                <div className="address">
                  <img src="/pin.png" alt="" />
                  <span>{post.address}</span>
                </div>
                <div className="price">$ {post?.price}</div>
              </div>
              <div className="user">
                <img src={post?.user?.avatar} alt="" />
                <span>{post?.user?.username}</span>
              </div>
            </div>
            <div
              className="bottom"
              dangerouslySetInnerHTML={{
                __html: dompurify.sanitize(post?.postDetail?.desc),
              }}
            />
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <p className="title">General</p>
          <div className="listVertical">
            <div className="feature">
              <img src="/utility.png" alt="" />
              <div className="featureText">
                <span>Status</span>
                {post?.postDetail?.condition === "new" ? (
                  <p>New</p>
                ) : (
                  <p>Used</p>
                )}
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Warranty</span>
                <p>{post?.postDetail?.warranty}</p>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Battery</span>
                <p>Health {post?.postDetail?.battery}%</p>
              </div>
            </div>
          </div>
          <p className="title">Color</p>
          <div className="sizes">
            <div className="size">
              <img src="/size.png" alt="" />
              <span>{post?.postDetail?.color}</span>
            </div>
            <div className="size">
              <img src="/bed.png" alt="" />
              <span>{post?.storage} GB</span>
            </div>
            <div className="size">
              <img src="/bath.png" alt="" />
              <span>{post?.ram} GB RAM</span>
            </div>
          </div>
          <p className="title">Features</p>
          <div className="listHorizontal">
            <div className="feature">
              <img src="/school.png" alt="" />
              <div className="featureText">
                <span>Display</span>
                <p>{post?.postDetail?.display}</p>
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Camera</span>
                <p>{post?.postDetail?.camera}</p>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Accessories</span>
                <p>{post?.postDetail?.Accessories}</p>
              </div>
            </div>
          </div>
          <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={[post]} />
          </div>
          <div className="buttons">
            <button
              onClick={handleOpenChat}
              disabled={!!currentUser && receiverId === currentUser.id}
            >
              <img src="/chat.png" alt="" />
              {currentUser && receiverId === currentUser.id
                ? "This is your listing"
                : "Send a Message"}
            </button>
            <button
              onClick={handleSave}
              style={{
                backgroundColor: saved
                  ? "var(--accent-primary)"
                  : "var(--glass-bg)",
                color: saved ? "#000000" : "var(--text-primary)",
                border: saved ? "none" : "1px solid var(--glass-border)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
              }}
            >
              <img src="/save.png" alt="" />
              {saved ? "Saved" : "Save"}
            </button>
          </div>
        </div>
      </div>
      {chat && <Chat activeChat={chat} closeChat={() => setChat(null)} />}
    </div>
  );
}

export default SinglePage;
