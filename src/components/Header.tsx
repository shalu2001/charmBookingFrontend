import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import { User } from "@heroui/react";
import { Customer } from "../types/customer";

const Header = () => {
  const navigate = useNavigate();
  const user = useAuthUser<Customer>();
  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-birthstone text-5xl">CharmBooking</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link href="#">For Booking</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="#">For Business</Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end" className="">
        {user ? (
          <User name={user?.firstName} description={user?.email} onClick={() => navigate("/#")} isFocusable/>
        ) : (
          <>
            <NavbarItem className="hidden lg:flex rounded-lg mr-4">
              <Button
                color="secondary"
                radius="lg"
                variant="shadow"
                className="text-center"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </Button>
            </NavbarItem>
            <NavbarItem className="hidden lg:flex rounded-lg mr-4">
              <Link href="/login">
                <Button
                  color="secondary"
                  radius="lg"
                  variant="shadow"
                  className="text-center"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
              </Link>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
