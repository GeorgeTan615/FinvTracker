import React, {ReactNode} from 'react'
import AppNavBar from './AppNavBar'

interface AppLayoutProps{
	children:ReactNode,
}

const AppLayout = (props:AppLayoutProps) => {
  return (
	<div className="p-5">
		<AppNavBar />
		{props.children}	
	</div>
  )
}

export default AppLayout