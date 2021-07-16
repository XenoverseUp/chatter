import "./Message.css";

import ReactEmoji from "react-emoji";

const Message = ({ message, name }) => {
	let isSentByTheCurrentUser = false;

	const trimmedName = name.trim().toLowerCase();
	console.log(message, name);

	if (message) {
		if (message.user === trimmedName) {
			isSentByTheCurrentUser = true;
		}
		if (isSentByTheCurrentUser) {
			return (
				<div className="message-container current-user-container">
					<div className="message-box current-box">
						<p className="sent-text">{ReactEmoji.emojify(message.text)} </p>
					</div>
				</div>
			);
		} else if (message.user === "admin") {
			return (
				<div className="message-container admin-user-container">
					<div className="message-box admin-box">
						<p className="sent-text sent-text-admin">{message.text} </p>
					</div>
				</div>
			);
		} else {
			return (
				<div className="message-container other-user-container">
					<div className="message-box other-box">
						<p className="sent-by">{message.user}</p>
						<p className="sent-text">{ReactEmoji.emojify(message.text)} </p>
					</div>
				</div>
			);
		}
	}
	return null;
};

export default Message;
