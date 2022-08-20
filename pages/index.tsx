import { useState } from 'react';
import { Htag, Button, P, Tag, Rating, Textarea, Search } from '../components';
import { withLayout } from '../layout/Layout';
import axios from 'axios';
import { GetStaticProps } from 'next';
import { MenuItem } from '../interfaces/menu.interface';
import { Input } from '../components/Input/Input';

function Home({ menu, firstCategory }: HomeProps): JSX.Element {
    const [rating, setRating] = useState<number>(4);

    return (
        <>
            <Htag tag="h1">Text</Htag>
            <Button appearance="primary" arrow="right" className="asd">
                Button
            </Button>
            <Button appearance="ghost" arrow="down">
                Button
            </Button>
            <P size="l">Large</P>
            <P size="m">Medium</P>
            <P size="s">Small</P>
            <Tag size="s">Small tag</Tag>
            <Tag size="m" color="primary" href="link.com">
                Href tag
            </Tag>
            <Rating rating={rating} isEditable={true} setRating={setRating} />
            <Input />
            <Textarea />
            <Search />
        </>
    );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps = async () => {
    const firstCategory = 0;
    const { data: menu } = await axios.post<MenuItem[]>(
        process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find',
        {
            firstCategory
        }
    );
    return {
        props: {
            menu,
            firstCategory
        }
    };
};

interface HomeProps extends Record<string, unknown> {
    menu: MenuItem[];
    firstCategory: number;
}
