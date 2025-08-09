import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";


import App from './App'
test('renders learn react link', () => {
    render(<App/>);
    const linkElement = screen.getByText(/this is my code/i);
    const text1 = screen.getByText(/hello/i)
    expect(linkElement).toBeInTheDocument();
    expect(text1).toBeInTheDocument()
})  