import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="p-6">
      <div className="container mx-auto text-white flex items-center justify-between">
        <h1>Marvin Ackerman</h1>
        <nav className="flex gap-4">
          <Link href="/">Generate</Link>
          <Link href="/collection">Collection</Link>
        </nav>
        <div>Sign In</div>
      </div>
    </div>
  );
};

export default Navbar;
