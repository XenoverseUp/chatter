const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const router = require("./router");
const cors = require("cors");

const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server, { wsEngine: "ws" });

app.use(router);
app.use(cors());

io.on("connection", socket => {
	console.log("connected");

	socket.on("join", ({ name, room }) => {
		const { error, user } = addUser({ id: socket.id, name, room });
		if (error) {
			return;
		}
		console.log("joined");

		socket.emit("message", {
			user: "admin",
			text: `${user.name}, welcome to the room!`,
		});
		socket.broadcast.to(user.room).emit("message", {
			user: "admin",
			text: `${user.name} has joined to room.`,
		});

		socket.join(user.room);

		io.to(user.room).emit("roomData", {
			room: user.room,
			users: getUsersInRoom(user.room),
		});
	});

	socket.on("sendMessage", async (message, callback) => {
		const user = await getUser(socket.id);

		try {
			io.to(user.room).emit("message", { user: user.name, text: message });
			io.to(user.room).emit("roomData", {
				room: user.room,
				users: getUsersInRoom(user.room),
			});
			callback();
		} catch (err) {
			console.log(err.message);
		}
	});

	socket.on("disconnect", () => {
		const user = removeUser(socket.id);
		console.log("disconnected");

		if (user) {
			io.to(user.room).emit("message", {
				user: "admin",
				text: `${user.name} has just left!`,
			});
		}
	});
});

server.listen(PORT, () => {
	console.log(`Server has started on port ${PORT}...`);
});
