import "./Users.css";
import ScrollToBottom from "react-scroll-to-bottom";
import User from "./User/User";

const Users = ({ users }) => {
	return (
		<ScrollToBottom className="users-container">
			{users.map((user, i) => (
				<div key={i}>
					<User user={user} />
				</div>
			))}
		</ScrollToBottom>
	);
};

export default Users;
