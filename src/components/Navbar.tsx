import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchNotifications, selectAllNotifications } from "@/features/notifications";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const unreadCount = useAppSelector(selectAllNotifications).filter((n) => !n.read).length;
  const fetchNewNotifications = () => dispatch(fetchNotifications());
  return (
    <nav>
      <section>
        <h1>Redux Essentials Example</h1>

        <div className="navContent">
          <div className="navLinks">
            <Link to="/">Posts</Link>
            <Link to="/users">Users</Link>
            <Link to="/notifications">
              Notifications
              {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
            </Link>
          </div>
          <button className="button" onClick={fetchNewNotifications}>
            Refresh Notifications
          </button>
        </div>
      </section>
    </nav>
  );
};

export default Navbar;
