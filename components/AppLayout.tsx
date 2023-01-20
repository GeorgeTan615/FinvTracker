import React, {ReactNode} from 'react'
import AppNavBar from './AppNavBar'

interface AppLayoutProps{
	children:ReactNode,
}

const AppLayout = (props:AppLayoutProps) => {
  return (
	<div className="p-5 flex flex-col h-screen content-center">
		<AppNavBar />
		<div className="">
			{props.children}	
		</div>
		
	</div>
  )
}

export default AppLayout