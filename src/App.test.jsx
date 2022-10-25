import { render, screen } from "@testing-library/react";
import { App } from "./App";

describe('Компонент App', () => {
    it('Отображает заголовок «Каталог»', () => {
        render(<App />)

        expect(screen.getByText('Каталог')).toBeInTheDocument();
    });

    it('Отображает карточки товара', () => {
        render(<App />)

        expect(screen.getAllByTestId('product-card').length).toBeGreaterThan(0);
    });
});
