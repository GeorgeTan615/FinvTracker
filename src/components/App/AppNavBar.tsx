import React from "react";
import Link from "next/link";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useState } from "react";
import { useRouter } from "next/router";
import Profile from "./Profile";

const AppNavBar = () => {
	const [isLightMode, setIsLightMode] = useState<boolean>(false);
	const router = useRouter();
	const activeTabStyle =
		"transition ease-in-out delay-100 duration-300 bg-[#C36CEC] text-white border-none py-2 px-5 rounded-3xl font-semibold hover:bg-[#AF61D4]";
	const notActiveTabStyle =
		"transition ease-in-out delay-100 duration-300 text-black font-semibold py-2 px-5 hover:bg-[#E8DEFF] rounded-3xl";

	return (
		<nav className="grid auto-rows-max grid-cols-3 p-5">
			<Link className="flex-start flex justify-self-start" href="/overview">
				<img
					src="/finvtrackerlogo.svg"
					alt="Logo"
					width={200}
					height={50}
					className="scale-150"
				/>
			</Link>
			<div className="flex items-center justify-evenly gap-5 text-lg font-semibold">
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
				<Link href="/incomeexpenses" legacyBehavior>
					<a
						className={
							router.pathname === "/incomeexpenses"
								? activeTabStyle
								: notActiveTabStyle
						}
					>
						Income/Expenses
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
			<div className="flex items-center justify-end gap-3 justify-self-end text-lg font-semibold">
				{/* {isLightMode ? (
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
				)} */}
				<Profile />
			</div>
		</nav>
	);
};

export default AppNavBar;
