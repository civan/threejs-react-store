import { Link } from 'react-router-dom';
import './styles.scss';

export default function Header() {
  return (
    <header>
      <div className="header-inner">
        <div className="logo">THREE.</div>
        <nav>
          <ul>
            <li>
              <Link to="/">Chairs</Link>
            </li>
            <li>
              <Link to="/floating">Floating</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
