import React from "react";
import { Nav, NavLink, NavMenu }
    from "./navBar";
 
const Navbar = () => {
    return (
        <>
            <Nav>
                <NavMenu>
                    <NavLink to="/" activeStyle>
                        Home
                    </NavLink>
                    <NavLink to="/stories" activeStyle>
                         Stories
                    </NavLink>
                    <NavLink to="/personas" activeStyle>
                        Personas
                    </NavLink>
                    <NavLink to="/scenes" activeStyle>
                        Scenes
                    </NavLink>
                    <NavLink to="/test" activeStyle>
                        Test
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    );
};
 
export default Navbar;