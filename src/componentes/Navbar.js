import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import logo from "../assets/urban-style.png";
import perfilUsuario from "../assets/modelo.png"
import { ShoppingCart } from '@mui/icons-material';
import { Badge } from '@mui/material';
import { Link } from 'react-router-dom';
import {useStateValue} from '../StateProvider'
import { actionTypes } from '../reducer';
import { Link as RouterLink, useNavigate } from 'react-router-dom'; // Cambia useHistory por useNavigate
import { auth } from '../firebase';

const pages = ['Productos'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];




function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [{basket, user},dispatch] = useStateValue();

  const navigate = useNavigate(); // Usamos useNavigate en lugar de useHistory

  const handleAuth = () =>{
    if(user){
      auth.signOut();
      dispatch({
        type: actionTypes.EMPTY_BASKET,
        basket: [],
      })
       navigate("/")
    }
  }
  
  return (
    <AppBar position="fixed" sx={{ backgroundColor: 'black', boxShadow: 'none' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography

          
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"

           

            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              img: { marginRight: '10px', height: '75px' },  // Corresponding to "image" style
            }}   

          >
            <Link to="/inicio">
              <img src={logo} alt="Urban Style" />
            </Link>
          </Typography>  

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>

            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {/* LOGO */}
          </Typography>

          
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Link key={page} to={`/${page.toLowerCase()}`} style={{ textDecoration: 'none' }}>
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
              </Link>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>

          <Typography variant='h6' color='primary' component='p'>
           Hello {user ? user.email: "Guest"}
          </Typography>
            <Link to="/checkout-page">
            <IconButton aria-label="Show cart items" color="inherit">
              <Badge badgeContent={basket?.length} color ="secondary">
                <ShoppingCart fontSize = "large" color = "primary"/>
              </Badge>
            </IconButton>
            </Link>
              
              <Link to ="/SignIn">
              <Button variant='outlined' onClick={handleAuth}>
                      <strong>{user ? "Sign Out" : "Sign In"}</strong>
              </Button>
              </Link>            
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
