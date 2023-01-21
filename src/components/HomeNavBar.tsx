import React from "react";
import Link from "next/link";
import { Modal, Button, Text, } from "@nextui-org/react";
import LoginMethods from "./LoginMethods";
import { LiteralUnion } from "next-auth/react"
import { BuiltInProviderType } from "next-auth/providers"
import { ClientSafeProvider } from "next-auth/react"

interface HomeNavBarProps{
	providers:Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null
}
const HomeNavBar = (props:HomeNavBarProps) => {
	const [visible, setVisible] = React.useState(false);
	const handler = () => setVisible(true);
  
	const closeHandler = () => {
	  setVisible(false);
	};
	return (
		<nav className="flex justify-between pl-10 pr-10">
			<Link href="/">
				<img
					src="https://png.pngtree.com/png-clipart/20190903/original/pngtree-financial-icon-png-image_4420727.jpg"
					alt="Logo"
					width={50}
					height={50}
				/>
			</Link>
			<div className="flex justify-center gap-10 text-lg font-semibold items-center">
				<Link href="#" legacyBehavior>
					<a className="text-black">About</a>
				</Link>
				<Link href="#" legacyBehavior>
					<a className="text-black">Sign Up</a>
				</Link>
				<button onClick={handler} className="bg-[#C36CEC] text-white border-none py-2 px-5 rounded-xl font-semibold cursor-pointer hover:bg-[#AF61D4]">
					Login
				</button>
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
						<hr/>
						<LoginMethods providers={props.providers}/>
						<hr/>
					</Modal.Body>
					<Modal.Footer justify="center">
						<Button auto flat css={{background:'$brandPurple',color:'white'}} onPress={closeHandler}>
							Close
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
		</nav>
)};

export default HomeNavBar;
