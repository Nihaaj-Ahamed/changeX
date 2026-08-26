import { useContext } from "react";
import Searchbar from "../../components/searchBar/searchBar";
import "./homePage.scss";
import { AuthContext } from "../../context/authContext";

function HomePage() {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  return (
    <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">
            Discover affordable second-hand smartphones .
          </h1>
          <p>
            Upgrade your mobile life with TechExchange. We connect you with
            trusted sellers for the best deals on Apple, Samsung, and more. Meet
            up, inspect, and buy with confidence.
          </p>
          <Searchbar />
          <div className="boxes-container">
              <h3 className="boxes-title">Way to Achieve...</h3>
            <div className="boxes">
              <div className="box">
                <h1>500+</h1>
                <h2>Trusted Sellers</h2>
              </div>
              <div className="box">
                <h1>1000+</h1>
                <h2>Smartphones Sold</h2>
              </div>
              <div className="box">
                <h1>10+</h1>
                <h2>Cities Covered</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default HomePage;
