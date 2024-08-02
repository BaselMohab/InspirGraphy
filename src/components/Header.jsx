import React from "react";
import { Navbar, Collapse, Typography, Button, IconButton, List, ListItem } from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext/authContext'; // Adjust the path

function NavList() {
return (
    <List className="flex flex-row justify-center items-center gap-4 mt-4 mb-6 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
    <Typography
        as={Link}
        to="/"
        variant="small"
        color="light-blue"
        className="font-medium"
    >
        <ListItem className="flex items-center gap-2 py-2 px-4 hover:bg-blue-100 rounded-lg">
        Home
        </ListItem>
    </Typography>
    <Typography
        as={Link}
        to="/blogs"
        variant="small"
        color="light-blue"
        className="font-medium"
    >
        <ListItem className="flex items-center gap-2 py-2 px-4 hover:bg-blue-100 rounded-lg">
        Blogs
        </ListItem>
    </Typography>
    <Typography
        as={Link}
        to="/about"
        variant="small"
        color="light-blue"
        className="font-medium"
    >
        <ListItem className="flex items-center gap-2 py-2 px-4 hover:bg-blue-100 rounded-lg">
        About
        </ListItem>
    </Typography>
    </List>
);
}

export default function Header() {
const [openNav, setOpenNav] = React.useState(false);
const navigate = useNavigate();
const { currentUser, signout } = useAuth();

const handleSignup = () => {
    navigate('/signup');
}

const handleLogin = () => {
    navigate('/login');
}

React.useEffect(() => {
    const handleResize = () => {
    if (window.innerWidth >= 960) {
        setOpenNav(false);
    }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
}, []);

return (
    <Navbar className="mx-auto max-w-screen-xl px-4 py-2 bg-light-blue-50 border-b border-light-blue-200 shadow-sm">
    <div className="flex items-center justify-between text-blue-gray-900">
        <Typography
        as={Link}
        to="/"
        variant="h6"
        className="mr-4 cursor-pointer py-1.5 lg:ml-2 text-light-blue-700"
        >
        InspirGraphy
        </Typography>
        <div className="hidden lg:flex flex-1 justify-center">
        <NavList />
        </div>
        <div className="hidden gap-2 lg:flex">
        {currentUser ? (
            <Button
            variant="outlined"
            size="sm"
            color="light-blue"
            onClick={() => {
                console.log('Sign Out Clicked'); // For debugging
                signout();
            }}
            >
            Sign Out
            </Button>
        ) : (
            <>
            <Button
                variant="text"
                size="sm"
                color="light-blue"
                as={Link}
                onClick={handleLogin}
            >
                Log In
            </Button>
            <Button
                variant="gradient"
                size="sm"
                color="light-blue"
                as={Link}
                onClick={handleSignup}
            >
                Sign Up
            </Button>
            </>
        )}
        </div>
        <IconButton
        variant="text"
        color="light-blue"
        className="lg:hidden"
        onClick={() => setOpenNav(!openNav)}
        >
        {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
        ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
        )}
        </IconButton>
    </div>
    <Collapse open={openNav}>
        <NavList />
        <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
        {currentUser ? (
            <Button
            variant="outlined"
            size="sm"
            color="light-blue"
            fullWidth
            onClick={() => {
                console.log('Sign Out Clicked'); // For debugging
                signout();
            }}
            >
            Sign Out
            </Button>
        ) : (
            <>
            <Button
                variant="outlined"
                size="sm"
                color="light-blue"
                fullWidth
                as={Link}
                onClick={handleLogin}
            >
                Log In
            </Button>
            <Button
                variant="gradient"
                size="sm"
                color="light-blue"
                fullWidth
                as={Link}
                onClick={handleSignup}
            >
                Sign Up
            </Button>
            </>
        )}
        </div>
    </Collapse>
    </Navbar>
);
}
