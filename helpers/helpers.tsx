import CourcesIcon from '../layout/Menu/icons/cources.svg';
import ServicesIcon from '../layout/Menu/icons/services.svg';
import BooksIcon from '../layout/Menu/icons/books.svg';
import ProductsIcon from '../layout/Menu/icons/products.svg';
import { TopLevelCategory } from '../interfaces/page.interface';
import { FirstLevelMenuItem } from '../interfaces/menu.interface';

export const firstLevelMenu: FirstLevelMenuItem[] = [
    {
        route: 'cources',
        name: 'Cources',
        icon: <CourcesIcon />,
        id: TopLevelCategory.Cources
    },
    {
        route: 'services',
        name: 'Services',
        icon: <ServicesIcon />,
        id: TopLevelCategory.Services
    },
    {
        route: 'books',
        name: 'Books',
        icon: <BooksIcon />,
        id: TopLevelCategory.Books
    },
    {
        route: 'products',
        name: 'Products',
        icon: <ProductsIcon />,
        id: TopLevelCategory.Products
    }
];

export const priceRu = (price: number): string =>
    price
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
        .concat('$');

export const declOfNum = (number: number, titles: [string, string, string]): string => {
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[
        number % 100 > 4 && number % 100 < 20
            ? 2
            : cases[number % 10 < 5 ? number % 10 : 5]
    ];
};
