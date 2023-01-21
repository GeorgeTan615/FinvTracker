import React from "react";
import { Image } from "@nextui-org/react";
import { Modal, Button, Text } from "@nextui-org/react";
import { useSession } from "next-auth/react";

const Profile = () => {
	const { data: session, status } = useSession();
	const [visible, setVisible] = React.useState(false);
	const handler = () => setVisible(true);

	const closeHandler = () => {
		setVisible(false);
	};
	return (
		<>
			{session && session.user?.image && session.user?.name && (
				<Image
					// className="rounded-full"
					placeholder="blur"
					src={session.user.image}
					alt={session.user.name}
					width={40}
					height={40}
					// style={{ borderRadius: "50%" }}
					// onClick={handler}
				/>
			)}
			<Modal
				scroll
				closeButton
				aria-labelledby="modal-title"
				open={visible}
				onClose={closeHandler}
			>
				<Modal.Header>
					<Text b id="modal-title" size={30}>
						Sign in
					</Text>
				</Modal.Header>
				<Modal.Body>
					<hr />
					<hr />
				</Modal.Body>
				<Modal.Footer justify="center">
					<Button
						auto
						flat
						css={{ background: "$brandPurple", color: "white" }}
						onPress={closeHandler}
					>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default Profile;
