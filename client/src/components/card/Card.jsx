import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import "./card.scss";

function Card({ item, isMyPost, onDelete }) {
  const { currentUser } = useContext(AuthContext);
  const isOwner =
    isMyPost ||
    (currentUser &&
      (currentUser.id === item.userId || currentUser.id === item.user?.id));

  return (
    <div className="card">
      <Link to={`/${item.id}`} className="imageContainer">
        <img src={item.images?.[0] || "/noAvathar.png"} alt={item.title} />
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/${item.id}`}>{item.title}</Link>
        </h2>
        <p className="address">
          <img src="/pin.png" alt="" />
          <span>{item.address}</span>
        </p>
        <p className="price">Rs. {item.price}</p>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <img src="/bed.png" alt="" />
              <span>{item.storage} Storage</span>
            </div>
            <div className="feature">
              <img src="/bath.png" alt="" />
              <span>{item.ram} RAM</span>
            </div>
          </div>
          <div className="icons">
            {isOwner ? (
              <>
                <Link
                  to={`/update-post/${item.id}`}
                  className="icon editIcon"
                  title="Edit Listing"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                </Link>
                {onDelete && (
                  <div
                    className="icon deleteIcon"
                    onClick={(e) => {
                      e.preventDefault();
                      onDelete(item.id);
                    }}
                    title="Delete Listing"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="icon">
                  <img src="/save.png" alt="" />
                </div>
                <div className="icon">
                  <img src="/chat.png" alt="" />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;