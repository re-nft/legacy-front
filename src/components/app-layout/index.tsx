import React, { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import { Footer } from "./footer";
import { SearchMenu } from "./search-menu";
import { DevMenu } from "./dev-menu";
import { Connect } from "./connect";

const user = {
  name: "Account name",
  address: "0x442dccee68425828c106a3662014b4f131e3bd9b ",
};
const navigation = [
  { name: "Rent", href: "/" },
  { name: "Lend", href: "/lend" },
  { name: "Dashboard", href: "/dashboard" },
  { name: "Faq", href: "/faq" },
];
const userNavigation = [{ name: "Profile", href: "/profile" }];

const isPathActive = (linkPath: string, pathname: string) => {
  if (pathname === linkPath) return true;
  if (pathname.includes(linkPath) && linkPath !== "/") return true;
  if (pathname.includes("/rent") && linkPath === "/") return true;
  if (pathname === "/user-is-renting" && linkPath === "/") return true;
  if (pathname === "/user-is-lending" && linkPath === "/lend") return true;
  return false;
};
function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export const AppLayout: React.FC = ({ children }) => {
  const { pathname } = useRouter();

  return (
    <div>
      <Disclosure as="header">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 lg:px-4">
              <div className="relative h-32 lg:h-32 flex justify-between">
                <div className="relative z-10 flex lg:px-0">
                  <div className="flex-shrink-0 flex items-center">
                    <img
                      className="block h-10 lg:h-14 w-auto"
                      src="/assets/logo.svg"
                      alt="reNFT"
                    />
                  </div>
                </div>
                <div className="relative z-10 flex  items-center lg:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button
                    className="border-2 border-black p-2 shadow-rn-one
                  inline-flex items-center justify-center text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  >
                    <span className="sr-only">Open menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="hidden lg:relative lg:z-10 lg:ml-4 lg:flex lg:items-center">
                  {/* Profile dropdown */}
                  <Menu as="div" className="flex-shrink-0 relative ml-4">
                    <div>
                      <Menu.Button className="flex text-sm text-white ">
                        <span className="sr-only">Open user menu</span>
                        <Connect />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 focus:outline-none">
                        {userNavigation.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <Link href={item.href}>
                                <a
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block py-2 px-4 text-sm text-gray-700"
                                  )}
                                >
                                  {item.name}
                                </a>
                              </Link>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
              <nav
                className="hidden lg:py-2 lg:flex lg:space-x-4 menu"
                aria-label="Global"
              >
                {navigation.map((item) => (
                  <Link href={item.href} key={item.name}>
                    <a
                      className={classNames(
                        isPathActive(item.href, pathname)
                          ? "menu__item menu__item--active"
                          : "menu__item",
                        ""
                      )}
                      aria-current={
                        isPathActive(item.href, pathname) ? "page" : undefined
                      }
                    >
                      <div>{item.name}</div>
                    </a>
                  </Link>
                ))}
                <SearchMenu />
              </nav>
              <DevMenu />
            </div>

            <Disclosure.Panel
              as="nav"
              className="lg:hidden shadow-rn-one mx-4 mb-4 border-2  border-black"
              aria-label="Global"
            >
              <div className=" space-y-1">
                {navigation.map((item) => (
                  <Link href={item.href} key={item.name}>
                    <a
                      className={classNames(
                        isPathActive(item.href, pathname)
                          ? "bg-black text-white"
                          : "hover:bg-black hover:text-white",
                        "block py-2 px-3 text-base font-medium"
                      )}
                      aria-current={
                        isPathActive(item.href, pathname) ? "page" : undefined
                      }
                    >
                      {item.name}
                    </a>
                  </Link>
                ))}
              </div>
              <div className="border-t-2 border-gray-700 pt-4 pb-3 flex justify-end flex-col">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Connect />
                  </div>
                </div>
                <div className="mt-3 space-y-1 justify-end">
                  {userNavigation.map((item) => (
                    <Link href={item.href} key={item.name}>
                      <a className="block py-2 px-3 text-base font-medium hover:bg-black hover:text-white">
                        {item.name}
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <main>
        <div className="max-w-7xl mx-auto flex text-sm font-body leading-tight min-h-full w-full mt-6">
          <div
            className="flex-1 flex flex-col min-h-full items-center  border-4 border-black mx-4 shadow-rn-one"
            style={{
              backgroundImage:
                "linear-gradient(rgb(244, 62, 119) 0%, rgb(104, 87, 159) 100%)",
            }}
          >
            <div className="flex mb-8 ">{children}</div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
