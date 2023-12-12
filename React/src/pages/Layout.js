import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
			<nav>
				<ul>
					<li>
						<Link to="/">Main page</Link>
					</li>
					<li>
						<Link to="/products">Products</Link>
					</li>
					<li>
						<Link to="/login">Login</Link>
					</li>
					<li>
						<Link to="/protected">Protected</Link>
					</li>
				</ul>
			</nav>

			<Outlet />
    </>
  )
};

export default Layout;