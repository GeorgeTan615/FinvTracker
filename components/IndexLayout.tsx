import React, { ReactNode } from 'react'
import IndexFooter from './IndexFooter';
import IndexNavBar from './IndexNavBar';

interface IndexLayoutProps{
	children:ReactNode,
}
const IndexLayout = (props:IndexLayoutProps) => {
  return (
	<div className="p-5 flex flex-col justify-between h-screen content-center">
		<IndexNavBar />
		<div>
			{props.children}
		</div>
		
		<IndexFooter/>
	</div>
  )
}

export default IndexLayout