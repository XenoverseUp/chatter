import { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

import RowUsers from "./RowUsers/RowUsers";
import RowContent from "./RowContent/RowContent";

import "./style/Chat.css";

let socket;

const Chat = ({ location }) => {
	const [name, setName] = useState("");
	const [room, setRoom] = useState("");
	const [users, setUsers] = useState([]);
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState([]);

	const END_POINT = "http://localhost:5000";

	useEffect(() => {
		let { name, room } = queryString.parse(location.search);

		socket = io(END_POINT);

		setName(name);
		setRoom(room);

		socket.emit("join", { name, room });

		return () => {
			socket.emit("disconnect");
			socket.off();
		};
	}, [END_POINT, location.search]);

	useEffect(() => {
		socket.on("message", message => {
			setMessages(messages => [...messages, message]);
		});

		socket.on("roomData", ({ users }) => {
			setUsers(users);
		});
	}, []);

	//send message function

	const sendMessage = event => {
		event.preventDefault();

		if (message) {
			socket.emit("sendMessage", message);
			setMessage("");
		}
	};

	return (
		<div className="main-chat-container">
			<div className="chat-container">
				<RowUsers room={room} users={users} />
				<RowContent
					message={message}
					setMessage={setMessage}
					sendMessage={sendMessage}
					messages={messages}
					name={name}
					room={room}
				/>
			</div>
		</div>
	);
};

export default Chat;
