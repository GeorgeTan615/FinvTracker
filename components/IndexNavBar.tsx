import React from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from '@nextui-org/react';

const IndexNavBar = () => {
	return (
		<nav className="flex justify-between pl-10 pr-10">
			<Button>Click me</Button>
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
					<a>About</a>
				</Link>
				<Link href="#" legacyBehavior>
					<a>Sign Up</a>
				</Link>
				<Link href="#" legacyBehavior>
					<a
						href={`/api/auth/signin`}
						onClick={(e) => {
							e.preventDefault()
							signIn()
						  }}
						className="bg-[#C36CEC] py-2 px-4 text-white rounded-lg"
					>
						Login
					</a>
				</Link>
			</div>
		</nav>
	);
};

export default IndexNavBar;
