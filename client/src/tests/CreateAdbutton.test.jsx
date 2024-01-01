import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CreateAdButton from '../components/CreateAdButton';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

jest.mock('@auth0/auth0-react', () => ({
    useAuth0: jest.fn()
}));
jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn()
}));

describe('CreateAdButton Component', () => {
    const mockLoginWithRedirect = jest.fn();
    const mockNavigate = jest.fn();

    beforeEach(() => {
        useAuth0.mockReturnValue({
            isAuthenticated: false,
            loginWithRedirect: mockLoginWithRedirect
        });
        useNavigate.mockReturnValue(mockNavigate);
    });

    test('renders button', () => {
        render(<CreateAdButton />);
        expect(screen.getByRole('button', { name: 'Post Ad' })).toBeInTheDocument();
    });

    test('redirects to login when not authenticated', () => {
        render(<CreateAdButton />);
        fireEvent.click(screen.getByRole('button', { name: 'Post Ad' }));
        expect(mockLoginWithRedirect).toHaveBeenCalled();
    });

    test('navigates to create ad page when authenticated', () => {
        useAuth0.mockReturnValue({
            isAuthenticated: true,
            loginWithRedirect: mockLoginWithRedirect
        });

        render(<CreateAdButton />);
        fireEvent.click(screen.getByRole('button', { name: 'Post Ad' }));
        expect(mockNavigate).toHaveBeenCalledWith('/sell');
    });
});
