import React from "react";
import Image from 'next/image'
import { Modal, Button, Text } from "@nextui-org/react";
import { useSession, signOut } from "next-auth/react";
import { FcSettings, FcGoogle, FcHome } from 'react-icons/fc';

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
					className="rounded-full cursor-pointer"
					placeholder="blur"
					blurDataURL="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
					src={session.user.image}
					alt={session.user.id}
					width={40}
					height={40}
					onClick={handler}
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
					<Text b id="modal-title" size={20} className="flex gap-2 justify-center items-center">
						<FcHome />
						{session?.user?.email}
					</Text>
				</Modal.Header>
				<Modal.Body>
					<hr />
					<div className="flex flex-col justify-center items-center gap-2">
						<Button
							auto
							css={{
								width :'120px',
								height:'45px',
								background: "white",
								color: "$black",
								borderRadius: "5px",
								border: "$gray200 solid",
								padding: "$0",
								'&:hover': {
									border: '$gray500 solid',
									},
								display:'flex',
								justifyContent:"space-around"
							}}
						>
							<FcSettings size={20}/>
							<div>&nbsp;Settings</div>
						</Button>
						<Button
							auto
							css={{
								width :'120px',
								height:'45px',
								background: "white",
								color: "$black",
								borderRadius: "5px",
								border: "$gray200 solid",
								padding: "$0",
								'&:hover': {
									border: '$gray500 solid',
									},
							}}
							onClick={() => signOut()}
						>
							<FcGoogle size={20}/>
							&nbsp;Sign Out
						</Button>
						</div>
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
