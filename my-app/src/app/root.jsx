import { Outlet, NavLink } from 'react-router-dom'

function Root() {
	return (
		<div id="main">
			<div id="menu">
				<nav>
					<NavLink to="/products" end>
						Products
					</NavLink>
					<a>Sellers</a>
				</nav>
			</div>
			<div id="main-page">
				<h2>My Products App</h2>
				<hr></hr>
				<Outlet />
			</div>
		</div>
	)
}

export default Root
