import React from 'react';
import styled from 'styled-components'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link, withRouter } from 'react-router-dom'
import LogoImg from './logo.png'

const menu = [
  {
    label: "Примерки",
    to: "/"
  },
  {
    label: "Выдачи",
    to: "/vidachi"
  },
  {
    label: "План на день",
    to: "/plan"
  }
]

const LinkTab = props =>
  <Tab component={ Link } {...props} />;

const Header = ({ location: { pathname } }) =>
  <Wrapper>
    <AppBar position="static" color="default">
      <Toolbar>
        <Logo src={ LogoImg } />
        <StyledTypography variant="h6" color="inherit">
          АннаМария
        </StyledTypography>
        <StyledTabs variant="fullWidth" value={ menu.findIndex(({ to }) => pathname === to) }>
          {
            menu.map((item, index) => <LinkTab key={ index } { ...item } />)
          }
        </StyledTabs>
      </Toolbar>
    </AppBar>
  </Wrapper>


const StyledTypography = styled(Typography)`
  flex-grow: 1;
`

const Wrapper = styled.div`
  flex-grow: 1;
`

const StyledTabs = styled(Tabs)`
  flex-grow: 1;
`

const Logo = styled.img`
  height: 30px;
  margin-right: 10px;
`

export default withRouter(Header)
