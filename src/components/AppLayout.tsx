import React, {ReactNode} from 'react'
import AppNavBar from './AppNavBar'

interface AppLayoutProps{
	children:ReactNode,
}

const AppLayout = (props:AppLayoutProps) => {
  return (
	<div className="flex flex-col h-screen content-center">
		<AppNavBar />
		<div className="bg-[#F3F3F3] h-full">
			{props.children}	
		</div>
		
	</div>
  )
}

export default AppLayout