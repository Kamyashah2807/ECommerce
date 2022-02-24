import React from 'react'
import { ReactNavbar } from "overlay-navbar";
import logo from '../../layout/ecommerce.png'

function Header() {
  return (
    <ReactNavbar
      burgerColorHover="#eb4034"
      logo={logo}
      logowidth="20vmax"
      navColor1="white"
      logoHoverSize="10px"
      logoHoverColor="rgb(219, 36, 36)"
      link1Text="Home"
      link2Text="About"
      link3Text="Products"
      link4Text="Contact"
      link1Url="/"
      link2Url="/about"
      link3Url="/products"
      link4Url="/contact"
      link1Size="1.3vmax"
      link1Color="rgba(35,35,35,0.8)"
      nav1justifyContent="flex-end"
      nav2justifyContent="flex-end"
      nav3justifyContent="flex-start"
      nav4justifyContent="flex-start"
      nav1Transition="0.4"
      nav2Transition="nav1Transition + 0.4"
      nav3Transition="nav2Transition + 0.4"
      nav4Transition="nav3Transition + 0.4"
      link1ColorHover="rgb(219, 36, 36)"
      link1Margin="1vmax"
      link1Padding="1vmax"
      link1Family="Roboto"
      profileIconColor="rgba(35,35,35,0.8)"
      searchIconColor="rgba(35,35,35,0.8)"
      cartIconColor="rgba(35,35,35,0.8)"
      profileIconMargin="1.3vmax"
      searchIconMargin="1.3vmax"
      cartIconMargin="1.3vmax"
      profileIconSize="2vmax"
      searchIconSize="2vmax"
      cartIconSize="2vmax"
      searchIconUrl="/search"
      cartIconUrl="/cart"
      profileIconUrl="/login"
      searchIconColorHover="rgb(219, 36, 36)"
      cartIconColorHover="rgb(219, 36, 36)"
      profileIconColorHover="rgb(219, 36, 36)"
      searchIconTransition="0.5"
      cartIconTransition="0.5"
      profileIconTransition="0.5"
    />
  )
}

export default Header 