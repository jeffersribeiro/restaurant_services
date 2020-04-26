import React, { Component } from "react";
import mapboxgl from "mapbox-gl";
import { Container } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import "./style.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoiamVmZnJzb24tcmliZWlybyIsImEiOiJjazgxdWp2b3AwYXFuM2VwYzR0a3c2eHRpIn0.kT2u6G9NX6ExJJzZL5lT1w";

class Mapbox extends Component {
  constructor() {
    super();
    this.state = {
      lng: -46.7929,
      lat: -23.5021,
      zoom: 9.00,
    };
  }

  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/dark-v9",
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom,
    });
    map.on("move", () => {
      this.setState({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2),
      });
    });
  }

  render() {
    return (
      <div>
        <div className="sidebarStyle">
        </div>
        <div ref={(el) => (this.mapContainer = el)} className="mapContainer" />
      </div>
    );
  }
}
export default withRouter(Mapbox);
