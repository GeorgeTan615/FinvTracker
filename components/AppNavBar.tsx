import React from 'react'
import Link from "next/link";
import { MdDarkMode, MdOutlineLightMode } from 'react-icons/md';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { User } from "@nextui-org/react";

const AppNavBar = () => {
	const [isLightMode, setIsLightMode] = useState<boolean>(false);
	const router = useRouter();
	console.log(router.pathname)
	return (
		<nav className="grid grid-cols-3 auto-rows-max">
			<Link className="justify-self-start flex flex-start" href="/">
				<img
					src="https://png.pngtree.com/png-clipart/20190903/original/pngtree-financial-icon-png-image_4420727.jpg"
					alt="Logo"
					width={50}
					height={50}
				/>
				<p>FinvTracker</p>
			</Link>
			<div className="justify-self-center flex justify-between gap-10 text-lg font-semibold items-center">
				<Link href="/overview" legacyBehavior>
					<a className="text-black">Overview</a>
				</Link>
				<Link href="/incomespendings" legacyBehavior>
					<a className="text-black">Income/Spendings</a>
				</Link>
				<Link href="/investments" legacyBehavior>
					<a className="text-black">Investments</a>
				</Link>

			</div>
			<div className="justify-self-end flex gap-3 justify-end text-lg font-semibold items-center">
				{isLightMode 
				 ? <MdOutlineLightMode className="cursor-pointer" size={25} onClick={()=>setIsLightMode(false)}/>
				 : <MdDarkMode className="cursor-pointer" size={25} onClick={()=>setIsLightMode(true)}/>
				}
				<img
					src="https://png.pngtree.com/png-clipart/20190903/original/pngtree-financial-icon-png-image_4420727.jpg"
					alt="Logo"
					width={50}
					height={50}
				/>
			</div>
		</nav>
	)
}

export default AppNavBar