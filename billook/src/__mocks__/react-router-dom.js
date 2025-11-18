// Manual mock for react-router-dom
import React from 'react';

export const BrowserRouter = ({ children }) => <div data-testid="router">{children}</div>;
export const Routes = ({ children }) => <div data-testid="routes">{children}</div>;
export const Route = ({ element }) => <div data-testid="route">{element}</div>;
export const Link = ({ children, to }) => <a href={to}>{children}</a>;
export const Outlet = () => <div data-testid="outlet">Outlet</div>;
export const useNavigate = () => jest.fn();
export const useLocation = () => ({ pathname: '/' });
export const MemoryRouter = ({ children }) => children;

