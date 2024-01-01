import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserCard from '../components/UserCard';
import { AuthTokenProvider } from '../context/AuthTokenContext';

describe('UserCard Component', () => {
    const mockUser = {
        id: '1',
        username: 'TestUser',
        email: 'testuser@example.com',
        createdAt: new Date().toISOString(),
    };

    test('renders UserCard with correct user data', async () => {
        await act(async () => {
            render(
                <AuthTokenProvider>
                    <UserCard user={mockUser} />
                </AuthTokenProvider>
            );
        });

        expect(screen.getByText(mockUser.username)).toBeInTheDocument();
        expect(screen.getByText(new RegExp(mockUser.email, 'i'))).toBeInTheDocument();
        expect(screen.getByAltText(mockUser.username)).toBeInTheDocument();
        expect(screen.getByRole('textbox', { name: 'Name' })).toBeInTheDocument();
        expect(screen.getByRole('textbox', { name: 'Address' })).toBeInTheDocument();
    });

    test('submits form with user data', async () => {
        await act(async () => {
            render(
                <AuthTokenProvider>
                    <UserCard user={mockUser} />
                </AuthTokenProvider>
            );
        });

        await act(async () => {
            fireEvent.change(screen.getByRole('textbox', { name: 'Name' }), {
                target: { value: 'New Name' },
            });
            fireEvent.change(screen.getByRole('textbox', { name: 'Address' }), {
                target: { value: 'New Address' },
            });
            fireEvent.click(screen.getByRole('button', { name: 'Apply' }));
        });

    });
});

