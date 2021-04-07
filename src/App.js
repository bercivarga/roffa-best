import React, { useState } from 'react';
import './App.css';
import { TileLayer, MapContainer, Marker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { divIcon } from 'leaflet';
import locations from './locations.json';
import { BiBeer, BiMovie, BiCool, BiCycling, BiWalk, BiFoodMenu, BiHappyBeaming } from 'react-icons/bi';

const MAPBOX_API_KEY = process.env.REACT_APP_MAPBOX_API_KEY;
const MAPBOX_USERID = process.env.REACT_APP_MAPBOX_USERID;
const MAPBOX_STYLEID = process.env.REACT_APP_MAPBOX_STYLEID;

const icon = divIcon({ className: 'my-div-icon' });

const initialData = {
	properties: {
		name: '',
		description: '',
		tags: [],
		type: ''
	}
};

const Popup = ({ detailShowing, handleClose, loc }) => {
	let icon;

	if (loc.properties.type === 'cinema') {
		icon = <BiMovie className="place-icon" />;
	} else if (loc.properties.type === 'bar') {
		icon = <BiBeer className="place-icon" />;
	} else if (loc.properties.type === 'outdoors') {
		icon = <BiWalk className="place-icon" />;
	} else if (loc.properties.type === 'party') {
		icon = <BiCool className="place-icon" />;
	} else if (loc.properties.type === 'bikeroute') {
		icon = <BiCycling className="place-icon" />;
	} else if (loc.properties.type === 'restaurant') {
		icon = <BiFoodMenu className="place-icon" />;
	} else if (loc.properties.type === 'experience') {
		icon = <BiHappyBeaming className="place-icon" />;
	}

	return (
		<div className="description-container" style={{ display: `${detailShowing ? 'block' : 'none'}` }}>
			<div className="close-btn" onClick={handleClose}>
				X
			</div>
			<div className="title-container">
				<h1>{loc.properties.name}</h1>
				{icon}
			</div>
			<div className="divider" />
			<p>{loc.properties.description}</p>
			<div className="tags-container">
				{loc.properties.tags.map((t) => {
					return (
						<div key={t} className="place-tag">
							{t}
						</div>
					);
				})}
			</div>
		</div>
	);
};

function App() {
	const [ detailShowing, setDetailShowing ] = useState(false);
	const [ loc, setLoc ] = useState(initialData);

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
							eventHandlers={{
								click: () => {
									setLoc(location);
									setDetailShowing(true);
								}
							}}
						>
							<Tooltip className="popup_wrapper" sticky>
								<strong>{location.properties.name}</strong>
							</Tooltip>
							<Popup handleClose={handleClose} detailShowing={detailShowing} loc={loc} />
						</Marker>
					);
				})}
			</MapContainer>
		</div>
	);
}

export default App;
