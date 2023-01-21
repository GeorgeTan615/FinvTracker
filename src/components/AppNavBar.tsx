import React from "react";
import Link from "next/link";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useState } from "react";
import { useRouter } from "next/router";
import Profile from "./Profile";

const AppNavBar = () => {
	const [isLightMode, setIsLightMode] = useState<boolean>(false);
	const router = useRouter();
	const activeTabStyle = "bg-[#C36CEC] text-white border-none py-2 px-5 rounded-3xl font-semibold hover:bg-[#AF61D4]";
	const notActiveTabStyle = "transition ease-in-out delay-100 duration-300 text-black font-semibold py-2 px-5 hover:bg-[#E8DEFF] rounded-3xl";

	return (
		<nav className="grid grid-cols-3 auto-rows-max">
			<Link className="justify-self-start flex flex-start" href="/overview">
				<img
					src="https://png.pngtree.com/png-clipart/20190903/original/pngtree-financial-icon-png-image_4420727.jpg"
					alt="Logo"
					width={50}
					height={50}
				/>
			</Link>
			<div className="flex justify-evenly text-lg gap-5 font-semibold items-center">
				<Link href="/overview" legacyBehavior>
					<a
						className={
							router.pathname === "/overview"
								? activeTabStyle
								: notActiveTabStyle
						}
					>
						Overview
					</a>
				</Link>
				<Link href="/incomespendings" legacyBehavior>
					<a
						className={
							router.pathname === "/incomespendings"
								? activeTabStyle
								: notActiveTabStyle
						}
					>
						Income/Spendings
					</a>
				</Link>
				<Link href="/investments" legacyBehavior>
					<a
						className={
							router.pathname === "/investments"
								? activeTabStyle
								: notActiveTabStyle
						}
					>
						Investments
					</a>
				</Link>
			</div>
			<div className="justify-self-end flex gap-3 justify-end text-lg font-semibold items-center">
				{isLightMode 
				? (
					<MdOutlineLightMode
						className="cursor-pointer"
						size={25}
						onClick={() => setIsLightMode(false)}
					/>
				) : (
					<MdDarkMode
						className="cursor-pointer"
						size={25}
						onClick={() => setIsLightMode(true)}
					/>
				)}
				<Profile />
			</div>
		</nav>
	);
};

export default AppNavBar;
