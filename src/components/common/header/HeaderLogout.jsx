export default function HeaderLogout({ setAuth }) {
  const handleLogout = () => {
    setAuth({});
    localStorage.clear();
  };
  return (
    <li>
      <button
        onClick={handleLogout}
        className='text-white/50 hover:text-white transition-all duration-200'
      >
        Logout
      </button>
    </li>
  );
}
