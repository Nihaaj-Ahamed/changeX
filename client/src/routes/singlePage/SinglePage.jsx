import "./singlePage.scss";
import Slider from "../../components/slider/Slider";
import Map from "../../components/map/map";
import { redirect, useLoaderData, useNavigate } from "react-router-dom";
import dompurify from "dompurify";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import apiRequest from "../../lib/apiRequest";
import Chat from "../../components/chat/Chat"; // Ungaloda Chat component path

function SinglePage() {
  const loaderData = useLoaderData();
  const post = loaderData?.post || loaderData;
  const [saved, setSaved] = useState(post?.isSaved || false);
  const { currentUser } = useContext(AuthContext);
  const [chat, setChat] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const navigate = useNavigate();

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

  const isOwner =
    !!currentUser && (currentUser.id === receiverId || currentUser.id === post.userId);

  const handleDeletePost = async () => {
    setDeleting(true);
    setDeleteError("");
    try {
      await apiRequest.delete("/posts/" + post.id);
      navigate("/profile");
    } catch (err) {
      console.error(err);
      setDeleteError(err?.response?.data?.message || "Failed to delete listing.");
    } finally {
      setDeleting(false);
    }
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
          {isOwner ? (
            <div className="ownerActions">
              <button
                className="editBtn"
                onClick={() => navigate(`/update-post/${post.id}`)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                Edit Listing
              </button>
              <button
                className="deleteBtn"
                onClick={() => setShowDeleteModal(true)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                Delete Listing
              </button>
            </div>
          ) : (
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
          )}
        </div>
      </div>
      {chat && <Chat activeChat={chat} closeChat={() => setChat(null)} />}

      {showDeleteModal && (
        <div className="deleteModalOverlay">
          <div className="deleteModal">
            <div className="modalHeader">
              <div className="iconContainer">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
              </div>
              <h3>Delete Listing</h3>
            </div>
            <p>
              Are you sure you want to delete <strong>{post.title}</strong>? 
              This will remove the listing and clean up all stored images. This action cannot be undone.
            </p>
            {deleteError && <span className="modalError">{deleteError}</span>}
            <div className="modalActions">
              <button
                type="button"
                className="cancelModalBtn"
                onClick={() => setShowDeleteModal(false)}
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                type="button"
                className="confirmDeleteBtn"
                onClick={handleDeletePost}
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SinglePage;
