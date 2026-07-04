import { render, screen } from '@testing-library/react';
import RestaurantCard from '../RestaurantCard';
import '@testing-library/jest-dom';
import mockData from '../mocks/RestaurantData.json';

it("Should render restaurant card with data ", () => {
    render(<RestaurantCard resData={mockData.resData} />);
    const restaurantName = screen.getByText("Pizza Hut");
    expect(restaurantName).toBeInTheDocument();
});

