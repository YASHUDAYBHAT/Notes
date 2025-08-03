import React from 'react'
import {PlusIcon} from "lucide-react"
import { Link } from 'react-router'

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <span className="btn btn-ghost text-xl">THINKNOTES</span>
      </div>

      <div className="navbar-end">
        <Link to="/Create" className="btn flex items-center gap-2">
          CreateNew <PlusIcon className="size-5" />
        </Link>
      </div>
    </div>
  );
};

export default Navbar