import "./PhoneHeader.css";
import src from "../../../../img/logo-out.png";
import src2 from "../../../../img/logout.png";

const PhoneHeader = ({ room }) => {
	return (
		<div id="main-phone-header">
			<img src={src} alt="Logo" id="phone-logo" />
			<h1>{room}</h1>
			<a href="/">
				<img src={src2} alt="Leave" />
			</a>
		</div>
	);
};

export default PhoneHeader;
