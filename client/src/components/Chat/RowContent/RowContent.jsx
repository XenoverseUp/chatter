import Messages from "./Messages/Messages";
import PhoneHeader from "./PhoneHeader/PhoneHeader";
import src from "../../../img/send.png";

import "./RowContent.css";

const RowContent = ({
	message,
	setMessage,
	sendMessage,
	messages,
	name,
	room,
}) => {
	return (
		<div id="row-content-main-container">
			<PhoneHeader room={room} />
			<div id="message-box">
				<Messages messages={messages} name={name} />
			</div>

			<form id="form">
				<input
					type="text"
					value={message}
					placeholder="Type a message..."
					onChange={event => setMessage(event.target.value)}
					onKeyPress={event =>
						event.key === "Enter" ? sendMessage(event) : null
					}
				/>
				<button onClick={event => sendMessage(event)}>
					<img src={src} alt="send" />
					<h1>Send</h1>
				</button>
			</form>
		</div>
	);
};

export default RowContent;
