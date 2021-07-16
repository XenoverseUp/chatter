import { useState } from "react";
import { Link } from "react-router-dom";

import Logo from "./Logo/Logo";
import "./style/Join.css";
import "./style/mediaQueries.css";

const Join = () => {
	const [name, setName] = useState("");
	const [room, setRoom] = useState("");

	return (
		<div className="joinOuterContainer">
			<Logo />
			<div className="joinInnerContainer">
				<div id="form-area">
					<h1 className="heading">Join</h1>
					<p className="join-phone">Sign in to join a room!</p>
					<div>
						<input
							type="text"
							className="joinInput"
							onChange={e => {
								setName(e.target.value);
							}}
							spellCheck="false"
							autoCapitalize="words"
							autoComplete="off"
							required
						/>
						<label>Name</label>
					</div>
					<div>
						<input
							type="text"
							className="joinInput"
							onChange={e => {
								setRoom(e.target.value);
							}}
							spellCheck="false"
							autoComplete="off"
							required
						/>
						<label>Room</label>
					</div>
					<Link
						onClick={e => (!name || !room ? e.preventDefault() : null)}
						to={`./chat?name=${name}&room=${room}`}
					>
						<button className="button" type="submit">
							Sign In
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Join;
