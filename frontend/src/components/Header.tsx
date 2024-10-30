import Link from 'next/link';

const Header = () => (
  <header>
    <nav>
      <Link href="/auth/login">Login</Link>
      <Link href="/auth/register">Register</Link>
      <Link href="/tasks">Tasks</Link>
    </nav>
  </header>
);

export default Header;
