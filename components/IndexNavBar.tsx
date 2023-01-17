import React from 'react'

const IndexNavBar = () => {
  return (
	<nav className="flex justify-between">
		<img src="https://png.pngtree.com/png-clipart/20190903/original/pngtree-financial-icon-png-image_4420727.jpg" alt="Logo" width={50} height = {50} />
		<div className="flex justify-end gap-5">
			<div>Hello</div>
			<div>Bye</div>
		</div>
	</nav>
  )
}

export default IndexNavBar