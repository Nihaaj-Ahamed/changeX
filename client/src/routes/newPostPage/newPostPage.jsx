import { useState } from "react";
import "./newPostPage.scss";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import apiRequest from "../../lib/apiRequest";
import UploadWidget from "../../components/uploadWidget/uploadWidget";
import { useNavigate } from "react-router-dom";

function NewPostPage() {
  const [value, setValue] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

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
    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);

    try {
      const res = await apiRequest.post("/posts", {
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
          camera: (inputs.Camera || inputs.camara) ? parseInt(inputs.Camera || inputs.camara) : null,
          Accessories: inputs.Accessories,
        },
      });
      navigate("/" + res.data.id);
    } catch (err) {
      console.log(err);
      setError("Something went wrong!");
    }
  };

  return (
    <div className="newPostPage">
<div className="formContainer">
  <h1>Add New Phone Post</h1>
  <div className="wrapper">
    <form onSubmit={handleSubmit}>
      {/* --- Basic Phone Info --- */}
      <div className="item">
        <label htmlFor="title">Title</label>
        <input id="title" name="title" type="text" placeholder="e.g. iPhone 14 Pro Max" />
      </div>
      <div className="item">
        <label htmlFor="price">Price (LKR)</label>
        <input id="price" name="price" type="number" placeholder="e.g. 245000" />
      </div>
      <div className="item">
        <label htmlFor="address">Address</label>
        <input id="address" name="address" type="text" placeholder="e.g. Main Street" />
      </div>
      <div className="item description">
        <label htmlFor="desc">Description</label>
        <ReactQuill theme="snow" onChange={setValue} value={value} />
      </div>
      <div className="item">
        <label htmlFor="city">City</label>
        <input id="city" name="city" type="text" placeholder="e.g. Colombo" />
      </div>
      <div className="item">
        <label htmlFor="storage">Storage (GB)</label>
        <input min={1} id="storage" name="storage" type="number" placeholder="e.g. 128" />
      </div>
      <div className="item">
        <label htmlFor="ram">RAM (GB)</label>
        <input min={1} id="ram" name="ram" type="number" placeholder="e.g. 8" />
      </div>
      <div className="item">
        <label htmlFor="latitude">Latitude</label>
        <input id="latitude" name="latitude" type="text" placeholder="e.g. 6.9271" />
      </div>
      <div className="item">
        <label htmlFor="longitude">Longitude</label>
        <input id="longitude" name="longitude" type="text" placeholder="e.g. 79.8612" />
      </div>
      <div className="item">
        <label htmlFor="type">Listing Type</label>
        <select name="type" id="type">
          <option value="sell" defaultChecked>Sell</option>
          <option value="exchange">Exchange</option>
        </select>
      </div>
      <div className="item">
        <label htmlFor="property">Brand (Property)</label>
        <select name="property" id="property">
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
        <select name="condition" id="condition">
          <option value="Brand New">Brand New</option>
          <option value="Like New">Like New</option>
          <option value="Used - Mint">Used - Mint</option>
          <option value="Used - Good">Used - Good</option>
        </select>
      </div>
      <div className="item">
        <label htmlFor="warranty">Warranty</label>
        <input id="warranty" name="warranty" type="text" placeholder="e.g. 6 Months Shop Warranty" />
      </div>
      <div className="item">
        <label htmlFor="color">Color</label>
        <input id="color" name="color" type="text" placeholder="e.g. Deep Purple" />
      </div>
      <div className="item">
        <label htmlFor="battery">Battery Health (%) / Capacity (mAh)</label>
        <input min={0} id="battery" name="battery" type="number" placeholder="e.g. 88 or 5000" />
      </div>
      <div className="item">
        <label htmlFor="display">Display Refresh Rate (Hz) / Size</label>
        <input min={0} id="display" name="display" type="number" placeholder="e.g. 120" />
      </div>
      <div className="item">
        <label htmlFor="Camera">Camera (MP)</label>
        <input min={0} id="Camera" name="Camera" type="number" placeholder="e.g. 48" />
      </div>
      <div className="item">
        <label htmlFor="Accessories">Accessories Included</label>
        <input id="Accessories" name="Accessories" type="text" placeholder="e.g. Full set box, Charger, Bill" />
      </div>

      <button className="sendButton">Add Post</button>
      {error && <span>Something went wrong!</span>}
    </form>
  </div>
</div>
      <div className="sideContainer">
        <div className="imagesList">
          {images.map((image, index) => (
            <div className="imageWrapper" key={index}>
              <img src={image} alt={`Upload ${index + 1}`} />
              <button
                type="button"
                className="deleteImgBtn"
                onClick={() => handleRemoveImage(index)}
                title="Delete image"
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

export default NewPostPage;
