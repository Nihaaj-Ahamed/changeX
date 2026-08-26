import React from "react";
import "./listPage.scss";
import Filter from "../../components/filter/filter";
import Card from "../../components/card/Card";
import Map from "../../components/map/map";
import { useLoaderData } from "react-router-dom";

function ListPage() {
  const data = useLoaderData();

  // Axios/apiRequest response object-il irundhu posts array-ai edukkirom
  const posts = data?.postResponse?.data || [];

  return (
    <div className="listPage">
      <div className="listContainer">
        <div className="wrapper">
          {/* Filter Component */}
          <Filter />

          {/* Posts List */}
          {posts.length > 0 ? (
            posts.map((post) => (
              <Card key={post.id || post._id} item={post} />
            ))
          ) : (
            <p className="noResults">No posts found!</p>
          )}
        </div>
      </div>

      <div className="mapContainer">
        <Map items={posts} />
      </div>
    </div>
  );
}

export default ListPage;
