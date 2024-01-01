import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PostCard from '../components/PostCard';
import { BrowserRouter } from 'react-router-dom';

describe('PostCard Component', () => {
    const mockPost = {
        id: 1,
        title: 'Test Post',
        description: 'This is a test description',
        price: '100',
        images: '/test-image.jpg'
    };

    test('renders PostCard with correct data', () => {
        render(
            <BrowserRouter>
                <PostCard post={mockPost} />
            </BrowserRouter>
        );

        expect(screen.getByText(mockPost.title)).toBeInTheDocument();
        expect(screen.getByText(mockPost.description)).toBeInTheDocument();
        expect(screen.getByText("$" + mockPost.price)).toBeInTheDocument();

        const image = screen.getByAltText(mockPost.title);
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', mockPost.images);
    });

});
