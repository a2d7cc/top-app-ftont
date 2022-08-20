import { TopPagePropsComponentProps } from './TopPageComponent.props';
import styles from './TopPageComponent.module.css';
import cn from 'classnames';
import { Card, Htag, Tag, HhData, Advantages, P, Sort, Product } from '../../components';
import { TopLevelCategory } from '../../interfaces/page.interface';
import { SortEnum } from '../../components/Sort/Sort.props';
import { useEffect, useReducer } from 'react';
import { sortReducer } from './sort.reducer';

export const TopPageComponent = ({
    page,
    products,
    firstCategory
}: TopPagePropsComponentProps): JSX.Element => {
    const [{ products: sortedProducts, sort }, dispatchSort] = useReducer(sortReducer, {
        products,
        sort: SortEnum.Rating
    });

    const setSort = (sort: SortEnum) => {
        dispatchSort({ type: sort });
    };

    useEffect(() => {
        dispatchSort({type: 'reset', initialState: products});
    }, [products])

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>
                <Htag tag="h1">{page.title}</Htag>
                {products && (
                    <Tag color="primary" size="m">
                        {products.length}
                    </Tag>
                )}
                <Sort sort={sort} setSort={setSort} />
            </div>
            <div>
                {sortedProducts &&
                    sortedProducts.map((p) => <Product key={p._id} product={p} />)}
            </div>
            <div className={styles.hhTitle}>
                <Htag tag="h2">Вакансии - {page.category}</Htag>
                <Tag color="red" size="m">
                    {products.length}
                </Tag>
            </div>
            {firstCategory == TopLevelCategory.Cources && page.hh && (
                <HhData {...page.hh} />
            )}
            {page.advantages && page.advantages.length && (
                <>
                    <Htag tag="h2">Advantages</Htag>
                    <Advantages advantages={page.advantages} />
                </>
            )}
            {page.seoText && (
                <div
                    className={styles.seo}
                    dangerouslySetInnerHTML={{ __html: page.seoText }}
                />
            )}
            <Htag tag="h2">Skills</Htag>
            {page.tags.map((t) => (
                <Tag key={t} color="primary">
                    {t}
                </Tag>
            ))}
        </div>
    );
};
