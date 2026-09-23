import { createBrowserRouter } from 'react-router-dom'
import AppLayout from '@/components/Layout/AppLayout'
import RequireAuth from '@/components/Auth/RequireAuth'
import LoginPage from '@/pages/LoginPage/LoginPage'
import HomePage from '@/pages/HomePage/HomePage';
import ListingDetailPage from '@/pages/ListingDetailPage/ListingDetailPage';
import CreateListingPage from '@/pages/CreateListingPage/CreateListingPage';
import EditListingPage from '@/pages/EditListingPage/EditListingPage';
import MyListingsPage from '@/pages/MyListingsPage/MyListingsPage';
import NotFoundPage from '@/pages/NotFoundPage/NotFoundPage';
import './index.css';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        children: [
            { index: true, element: <HomePage /> },
            { path: 'listings/:id', element: <ListingDetailPage /> },
            {
                element: <RequireAuth />,
                children: [
                    { path: 'create', element: <CreateListingPage /> },
                    { path: 'listings/:id/edit', element: <EditListingPage /> },
                    { path: 'my-listings', element: <MyListingsPage /> },
                ],
            },
            { path: '*', element: <NotFoundPage /> },
        ]
    },
    { path: '/login', element: <LoginPage /> },
])