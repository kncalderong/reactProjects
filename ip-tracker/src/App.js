import bcg from "./assets/images/pattern-bg.png";
import imgSbmt from "./assets/images/icon-arrow.svg";

function App() {
  return (
    <main>
      <div
        className="top-container"
        style={{
          backgroundImage: `url(${bcg})`,
        }}
      >
        <h2>IP Address Tracker</h2>
        <form className="search-frm">
          <div className="search-container">
            <input
              type="text"
              placeHolder="Search for any IP address or domain"
            />
            <div
              className="submit-btn"
              onClick={() => {
                console.log("clicked");
              }}
            >
              <img src={imgSbmt} alt="submit" />
            </div>
          </div>
        </form>
        <div className="info-container">
          <div className="info-item">
            <div className="info-title">IP ADDRESS</div>
            <div className="content">192.212.174.101</div>
          </div>
          <div className="info-item">
            <div className="info-title">IP ADDRESS</div>
            <div className="content">Brooklyn, NY 10001</div>
          </div>
          <div className="info-item">
            <div className="info-title">IP ADDRESS</div>
            <div className="content">192.212.174.101</div>
          </div>
          <div className="info-item info-item-last">
            <div className="info-title">IP ADDRESS</div>
            <div className="content">192.212.174.101</div>
          </div>
        </div>
      </div>
      <div className="map-container">mappp</div>
    </main>
  );
}

export default App;
