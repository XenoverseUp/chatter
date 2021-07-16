import "./User.css";

const User = ({ user }) => {
	return (
		<div className="user-container">
			<p>&#8881;</p>
			<p>{user.name}</p>
		</div>
	);
};

export default User;
