import React from 'react';
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link} from "@nextui-org/react";

const Header = () => {
  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">CharmBooking</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            For Booking
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
           For Business
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end" className=''>
        <NavbarItem className="hidden lg:flex">
         <a href='/signup' className="text-primary">Sign Up</a>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default Header;