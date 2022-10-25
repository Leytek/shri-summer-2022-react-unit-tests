import { render, screen } from "@testing-library/react";
import { faker } from '@faker-js/faker/locale/ru';
import { ProductCard } from "./ProductCard";

const stub = {
    bouquetHeight: faker.datatype.number({min: 61, max: 100}),
    bouquetWidth: faker.datatype.number({min: 30, max: 60}),
    currentPrice: faker.commerce.price(0, 99999, 0),
    flowersCount: faker.datatype.number({min: 1, max: 1000}),
    id: faker.datatype.uuid(),
    imageUrl: faker.image.imageUrl(400, 400, 'nature', true),
    isFavorite: true,
    isHit: true,
    isSale: true,
    oldPrice: faker.commerce.price(0, 99999, 0),
    title: faker.commerce.productName(),
}

describe('Product card component', () => {
    it('Is rendered', () => {
        render(<ProductCard {...stub}/>);

        expect(screen.getByText(`${stub.bouquetHeight} см`)).toBeInTheDocument();
        expect(screen.getByText(`${stub.bouquetWidth} см`)).toBeInTheDocument();
        expect(screen.getByText(`${stub.currentPrice} ₽`)).toBeInTheDocument();
        expect(screen.getByText(`${stub.flowersCount } шт.`)).toBeInTheDocument();
        expect(screen.getByAltText('flowers')).toBeInTheDocument();
        expect(screen.getByTestId('favorite')).toBeInTheDocument();
        expect(screen.getByText('ХИТ')).toBeInTheDocument();
        expect(screen.getByText('СКИДКА')).toBeInTheDocument();
        expect(screen.getByText(`${stub.oldPrice} ₽`)).toBeInTheDocument();
        expect(screen.getByText(stub.title)).toBeInTheDocument();
        expect(screen.getByText('В корзину')).toBeInTheDocument();
        expect(screen.getByText('Купить сразу')).toBeInTheDocument();
    });

    it('Do not render height if no height', () => {
        render(<ProductCard {...stub} bouquetHeight={undefined}/>);

        expect(screen.queryByText(stub.bouquetHeight)).toBeNull();
    });

    it('Do not render width if no width', () => {
        render(<ProductCard {...stub} bouquetWidth={undefined}/>);

        expect(screen.queryByText(stub.bouquetWidth)).toBeNull();
    });

    it('Disables buttons if count is 0', () => {
        render(<ProductCard {...stub} flowersCount={0}/>);

        expect(screen.getByText('В корзину')).toHaveAttribute('disabled');
        expect(screen.getByText('Купить сразу')).toHaveAttribute('disabled');
    });

    it('Show placeholder if no img', () => {
        render(<ProductCard {...stub} imageUrl={undefined}/>);

        expect(screen.getByTestId('img-placeholder')).toBeInTheDocument();
    });

    it('Render favorite icon if is favorite', () => {
        render(<ProductCard {...stub}/>);

        expect(screen.getByTestId('favorite')).toHaveClass('favorite');
    });

    it('Render non-favorite icon if is not favorite', () => {
        render(<ProductCard {...stub} isFavorite={false}/>);

        expect(screen.getByTestId('favorite')).toHaveClass('non_favorite');
    });

    it('Do not render "Hit" if non-hit', () => {
        render(<ProductCard {...stub} isHit={false}/>);

        expect(screen.queryByText('ХИТ')).toBeNull();
    });

    it('Do not render "Sale" if non-sale', () => {
        render(<ProductCard {...stub} isSale={false}/>);

        expect(screen.queryByText('СКИДКА')).toBeNull();
    });

    it('Render old and new price if old price exist', () => {
        render(<ProductCard {...stub}/>);

        expect(screen.getByText(`${stub.currentPrice} ₽`)).toHaveClass('new_price');
        expect(screen.getByText(`${stub.oldPrice} ₽`)).toHaveClass('old_price');
    });

    it('Render common price if old price not exist', () => {
        render(<ProductCard {...stub} oldPrice={undefined}/>);

        expect(screen.getByText(`${stub.currentPrice} ₽`)).toHaveClass('price');
        expect(screen.queryByTestId('old-price')).toBeNull();
    });
});
