import './list.scss'
import Card from"../card/Card"
import {listData} from "../../lib/dummydata"

function List({ posts, isMyPost, onDelete }) {
  if (!Array.isArray(posts) || posts.length === 0) {
    return (
      <div className="list empty" style={{ padding: "16px 0", color: "var(--text-muted)" }}>
        No listings found.
      </div>
    );
  }

  return (
    <div className="list">
      {posts.map((item) => (
        <Card
          key={item.id}
          item={item}
          isMyPost={isMyPost}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default List