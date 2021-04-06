import React, { useState } from 'react';
import './App.css';
import { TileLayer, MapContainer, Marker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { divIcon } from 'leaflet';
import locations from './locations.json';

const MAPBOX_API_KEY = process.env.REACT_APP_MAPBOX_API_KEY;
const MAPBOX_USERID = process.env.REACT_APP_MAPBOX_USERID;
const MAPBOX_STYLEID = process.env.REACT_APP_MAPBOX_STYLEID;

const icon = divIcon({ className: 'my-div-icon' });

function App() {
	const [ detailShowing, setDetailShowing ] = useState(false);

	function handleClick() {
		setDetailShowing(true);
	}

	function handleClose() {
		setDetailShowing(false);
	}

	return (
		<div className="app-container">
			<MapContainer center={[ 51.92299065252778, 4.463024139404297 ]} zoom={13} className="leaflet-container">
				<TileLayer
					url={`https://api.mapbox.com/styles/v1/${MAPBOX_USERID}/${MAPBOX_STYLEID}/tiles/256/{z}/{x}/{y}@2x?access_token=${MAPBOX_API_KEY}`}
					attribution="Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors, <a href=&quot;https://creativecommons.org/licenses/by-sa/2.0/&quot;>CC-BY-SA</a>, Imagery © <a href=&quot;https://www.mapbox.com/&quot;>Mapbox</a>"
				/>
				{locations.features.map((location) => {
					return (
						<Marker
							key={location.properties.name}
							position={location.geometry.coordinates}
							icon={icon}
							eventHandlers={{ click: handleClick }}
						>
							<Tooltip className="popup_wrapper" sticky>
								<strong>{location.properties.name}</strong>
							</Tooltip>
						</Marker>
					);
				})}
			</MapContainer>
			<div className="description-container" style={{ display: `${detailShowing ? 'block' : 'none'}` }}>
				<div className="close-btn" onClick={handleClose}>
					X
				</div>
				<h1>Here comes the title</h1>
				<div className="divider" />
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
					et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
					aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
					cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
					culpa qui officia deserunt mollit anim id est laborum.
				</p>
				<div className="tags-container">
					<div className="place-tag">Good beer</div>
					<div className="place-tag">Chill people</div>
					<div className="place-tag">Lekker eten</div>
					<div className="place-tag">Nice routes</div>
				</div>
			</div>
		</div>
	);
}

export default App;
