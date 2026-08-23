import { Show, UserButton } from "@clerk/react";
import { Link, Navigate, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="app-layout">
      <header className="app-header">
        <div className="header-content">
          <h1>Code Challenge Generator</h1>
          <nav>
            <Show when="signed-in">
              <Link to="/">Generate Challenge</Link>
              <Link to="/history">History</Link>
              <UserButton />
            </Show>
          </nav>
        </div>
      </header>

      <main className="app-main">
        <Show when="signed-out">
          <Navigate to="/sign-in" />
        </Show>
        <Show when="signed-in">
          <Outlet />
        </Show>
      </main>
    </div>
  );
}
