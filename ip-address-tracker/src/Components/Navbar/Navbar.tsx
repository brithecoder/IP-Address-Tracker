import Searchbar from './Searchbar';
import "./NavAndSearch.css";
import type { NavbarProps } from '../../Types'

export default function Navbar({ onSearch }: NavbarProps) {
  return (
      <nav className="navbar-container">
        <h1>IP Address Tracker</h1>
        <Searchbar onSearch={onSearch} isLoading={false} />
     </nav>
  )
}
