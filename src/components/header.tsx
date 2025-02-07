import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";


const Header = () => {
  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-birthstone text-5xl">CharmBooking</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link href="#">
            For Booking
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="#">
           For Business
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end" className=''>
        <NavbarItem className="hidden lg:flex  rounded-lg mr-4" >
          <Button color="secondary" radius="lg" variant="shadow" className="text-center">
            <Link href="/signup">
              Sign Up
            </Link>
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default Header;