import { useState } from "react";
import "./updatePostPage.scss";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import apiRequest from "../../lib/apiRequest";
import UploadWidget from "../../components/uploadWidget/uploadWidget";
import { useLoaderData, useNavigate } from "react-router-dom";

function UpdatePostPage() {
  const loaderData = useLoaderData();
  const post = loaderData?.post || loaderData;

  const [value, setValue] = useState(post?.postDetail?.desc || "");
  const [images, setImages] = useState(post?.images || []);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  if (!post || !post.id) {
    return (
      <div className="updatePostPage loading">
        <h2>Listing not found</h2>
        <button onClick={() => navigate("/profile")}>Go to Profile</button>
      </div>
    );
  }

  const handleRemoveImage = async (indexToRemove) => {
    const targetUrl = images[indexToRemove];
    setImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
    if (targetUrl) {
      try {
        await apiRequest.post("/posts/delete-image", { url: targetUrl });
      } catch (err) {
        console.error("Failed to delete image from storage:", err);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);

    try {
      await apiRequest.put(`/posts/${post.id}`, {
        postData: {
          title: inputs.title,
          price: parseInt(inputs.price),
          address: inputs.address,
          city: inputs.city,
          storage: parseInt(inputs.storage),
          ram: parseInt(inputs.ram),
          type: inputs.type,
          property: inputs.property,
          latitude: inputs.latitude,
          longitude: inputs.longitude,
          images: images,
        },
        postDetail: {
          desc: value,
          condition: inputs.condition,
          warranty: inputs.warranty,
          color: inputs.color,
          battery: inputs.battery ? parseInt(inputs.battery) : null,
          display: inputs.display ? parseInt(inputs.display) : null,
          camera: (inputs.Camera || inputs.camara)
            ? parseInt(inputs.Camera || inputs.camara)
            : null,
          Accessories: inputs.Accessories,
        },
      });

      navigate(`/${post.id}`);
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || "Failed to update listing!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="updatePostPage">
      <div className="formContainer">
        <div className="headerSection">
          <h1>Edit Smartphone Listing</h1>
          <button
            type="button"
            className="cancelBtn"
            onClick={() => navigate(`/${post.id}`)}
          >
            Cancel
          </button>
        </div>
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            {/* --- Basic Phone Info --- */}
            <div className="item">
              <label htmlFor="title">Title</label>
              <input
                id="title"
                name="title"
                type="text"
                defaultValue={post?.title}
                required
              />
            </div>
            <div className="item">
              <label htmlFor="price">Price (LKR)</label>
              <input
                id="price"
                name="price"
                type="number"
                defaultValue={post?.price}
                required
              />
            </div>
            <div className="item">
              <label htmlFor="address">Address</label>
              <input
                id="address"
                name="address"
                type="text"
                defaultValue={post?.address}
                required
              />
            </div>
            <div className="item description">
              <label htmlFor="desc">Description</label>
              <ReactQuill theme="snow" onChange={setValue} value={value} />
            </div>
            <div className="item">
              <label htmlFor="city">City</label>
              <input
                id="city"
                name="city"
                type="text"
                defaultValue={post?.city}
                required
              />
            </div>
            <div className="item">
              <label htmlFor="storage">Storage (GB)</label>
              <input
                min={1}
                id="storage"
                name="storage"
                type="number"
                defaultValue={post?.storage}
                required
              />
            </div>
            <div className="item">
              <label htmlFor="ram">RAM (GB)</label>
              <input
                min={1}
                id="ram"
                name="ram"
                type="number"
                defaultValue={post?.ram}
                required
              />
            </div>
            <div className="item">
              <label htmlFor="latitude">Latitude</label>
              <input
                id="latitude"
                name="latitude"
                type="text"
                defaultValue={post?.latitude}
                required
              />
            </div>
            <div className="item">
              <label htmlFor="longitude">Longitude</label>
              <input
                id="longitude"
                name="longitude"
                type="text"
                defaultValue={post?.longitude}
                required
              />
            </div>
            <div className="item">
              <label htmlFor="type">Listing Type</label>
              <select name="type" id="type" defaultValue={post?.type || "sell"}>
                <option value="sell">Sell</option>
                <option value="exchange">Exchange</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="property">Brand</label>
              <select
                name="property"
                id="property"
                defaultValue={post?.property || "Other"}
              >
                <option value="Apple">Apple</option>
                <option value="Samsung">Samsung</option>
                <option value="GooglePixel">Google Pixel</option>
                <option value="Xiaomi">Xiaomi</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* --- Phone Details (PostDetail Model Fields) --- */}
            <div className="item">
              <label htmlFor="condition">Condition</label>
              <select
                name="condition"
                id="condition"
                defaultValue={post?.postDetail?.condition || "Like New"}
              >
                <option value="Brand New">Brand New</option>
                <option value="Like New">Like New</option>
                <option value="Used - Mint">Used - Mint</option>
                <option value="Used - Good">Used - Good</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="warranty">Warranty</label>
              <input
                id="warranty"
                name="warranty"
                type="text"
                defaultValue={post?.postDetail?.warranty || ""}
                placeholder="e.g. 6 Months Shop Warranty"
              />
            </div>
            <div className="item">
              <label htmlFor="color">Color</label>
              <input
                id="color"
                name="color"
                type="text"
                defaultValue={post?.postDetail?.color || ""}
                placeholder="e.g. Space Gray"
              />
            </div>
            <div className="item">
              <label htmlFor="battery">Battery Health (%) / mAh</label>
              <input
                min={0}
                id="battery"
                name="battery"
                type="number"
                defaultValue={post?.postDetail?.battery || ""}
                placeholder="e.g. 88"
              />
            </div>
            <div className="item">
              <label htmlFor="display">Display (Hz / Size)</label>
              <input
                min={0}
                id="display"
                name="display"
                type="number"
                defaultValue={post?.postDetail?.display || ""}
                placeholder="e.g. 120"
              />
            </div>
            <div className="item">
              <label htmlFor="Camera">Camera (MP)</label>
              <input
                min={0}
                id="Camera"
                name="Camera"
                type="number"
                defaultValue={post?.postDetail?.camera || ""}
                placeholder="e.g. 48"
              />
            </div>
            <div className="item">
              <label htmlFor="Accessories">Accessories Included</label>
              <input
                id="Accessories"
                name="Accessories"
                type="text"
                defaultValue={post?.postDetail?.Accessories || ""}
                placeholder="e.g. Box, Cable, Adapter"
              />
            </div>

            <div className="actionButtons">
              <button className="sendButton" disabled={loading}>
                {loading ? "Updating..." : "Save Changes"}
              </button>
            </div>
            {error && <span className="errorMessage">{error}</span>}
          </form>
        </div>
      </div>

      <div className="sideContainer">
        <div className="sideHeader">
          <h3>Listing Images ({images.length})</h3>
          <p>Delete removed photos or upload new ones.</p>
        </div>
        <div className="imagesList">
          {images.map((image, index) => (
            <div className="imageWrapper" key={index}>
              <img src={image} alt={`Listing photo ${index + 1}`} />
              <button
                type="button"
                className="deleteImgBtn"
                onClick={() => handleRemoveImage(index)}
                title="Remove photo"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
        <UploadWidget
          uwConfig={{
            multiple: true,
            cloudName: "zj23dcpu",
            uploadPreset: "Phone-market",
            folder: "posts",
          }}
          setState={setImages}
        />
      </div>
    </div>
  );
}

export default UpdatePostPage;
