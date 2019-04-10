import React from 'react';
import styled from 'styled-components'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Tab from '@material-ui/core/Tab';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Link } from 'react-router-dom'
import LogoImg from './logo.png'
import { Media } from '../'

const menu = [
  {
    label: "Примерки",
    to: "/"
  },
  {
    label: "Бронь",
    to: "/vidachi"
  },
  {
    label: "План на день",
    to: "/plan"
  }
]

const getLabel = () => {
  const currentPageIndex = menu.findIndex(({ to }) => window.location.pathname === to)
  
  return menu[currentPageIndex] && menu[currentPageIndex].label
}

const StyledTab = styled(Tab)`
 && {
  font-weight: bold;
   
 }
`

const LinkTab = props =>
  <StyledTab component={ Link } {...props} />


const MobileMenu = ({ toggleMenu, targetEl, isMobileMenuOpen = true, mobileMoreAnchorEl = null }) => (
  <Menu
    anchorEl={targetEl}
    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    open={isMobileMenuOpen}
    onClose={toggleMenu}
  >
    {
      menu.map(({ label, to }, index) =>
        <MenuItem component={ Link } key={ index } to={ to }>
          <p>{ label }</p>
        </MenuItem>
      )
    }
    
  </Menu>
);


const Header = ({ isFetching, toggleMenu, isMobileMenuOpen, targetEl }) =>
  <Wrapper>
    { isFetching && <StyledProgress /> }
    <StyledAppBAr position="static" color="default">
      <Toolbar>
        <Logo src={ LogoImg } />
        <StyledTypography variant="h6" color="inherit">
          АннаМария
        </StyledTypography>
        <Media.Desktop>
          <StyledTabs variant="fullWidth" value={ menu.findIndex(({ to }) => window.location.pathname === to) }>
            {
              menu.map((item, index) => <LinkTab key={ index } { ...item } />)
            }
          </StyledTabs>
        </Media.Desktop>
        <Media.Mobile>
          <Tab component="span" label={ getLabel() } />
          <IconButton color="inherit" onClick={ toggleMenu } aria-label="Open drawer">
            <MenuIcon />
          </IconButton>
          {
            isMobileMenuOpen &&
              <StyledMenu toggleMenu={ toggleMenu } targetEl={ targetEl } />    
          }
        </Media.Mobile>
      </Toolbar>
    </StyledAppBAr>
  </Wrapper>

const StyledAppBAr = styled(AppBar)`
  && {
    background-color: #f5ccea;
  }
`

const StyledTypography = styled(Typography)`
  flex-grow: 1;
`

const Wrapper = styled.div`
  flex-grow: 1;
  position: relative;

  @media print {
    display: none;
  }
`

const StyledMenu = styled(MobileMenu)`
  top: 30px;
  right: 0;
`

const StyledTabs = styled(Tabs)`
  flex-grow: 1;
`

const Logo = styled.img`
  height: 30px;
  margin-right: 10px;
`

const StyledProgress = styled(LinearProgress)`
  && {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9999;
    width: 100%;
  }
`

export default Header
