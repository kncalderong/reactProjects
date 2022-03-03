import bcg from "./assets/images/pattern-bg.png";
import imgSbmt from "./assets/images/icon-arrow.svg";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import { useEffect, useState } from "react";

const ipIcon = new Icon({
  iconUrl: "/icon-location.svg",
  // iconSize: [35, 35],
});

let baseContent = [
  { sub: "ip address", info: "" },
  { sub: "location", info: "" },
  { sub: "timezone", info: "" },
  { sub: "isp", info: "" },
];

function App() {
  const [search, setSearch] = useState("");
  const [content, setContent] = useState(baseContent);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  let url = `https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.REACT_APP_API_KEY}`;

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      setContent((content) => {
        content[0].info = data.ip;
        content[1].info = `${data.location.city}, ${data.location.country} ${data.location.postalCode}`;
        content[2].info = `UTC${data.location.timezone}`;
        content[3].info = data.isp;
        return content;
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search && validateIPaddress(search)) {
      url = url + `&ipAddress=${search}`;
      fetchData();
      return;
    }
    fetchData();
  };

  const validateIPaddress = (ipaddress) => {
    if (
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
        ipaddress
      )
    ) {
      return true;
    }
    return false;
  };

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
              placeholder="Search for any IP address or domain"
              value={search}
              onChange={handleChange}
            />
            <button className="submit-btn" onClick={handleSubmit}>
              <img src={imgSbmt} alt="submit" />
            </button>
          </div>
        </form>
        <div className="info-container">
          {content.map((item, idx) => {
            return (
              <div
                className={`info-item ${idx === 3 && "info-item-last"}`}
                key={idx}
              >
                <div className="info-title">{item.sub}</div>
                <div className="content">{item?.info}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="map-container">
        <MapContainer center={[51.505, -0.09]} zoom={17}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[51.505, -0.09]} icon={ipIcon}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </main>
  );
}

export default App;
