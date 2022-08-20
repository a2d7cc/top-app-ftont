import { RatingProps } from './Rating.props';
import styles from './Rating.module.css';
import cn from 'classnames';
import StarIcon from './star.svg';
import { ForwardedRef, forwardRef, KeyboardEvent, useEffect, useState } from 'react';

export const Rating = forwardRef(
    (
        { error, isEditable = false, rating, setRating, children, ...props }: RatingProps,
        ref: ForwardedRef<HTMLDivElement>
    ): JSX.Element => {
        const [ratingArray, setRatingArray] = useState<JSX.Element[]>(
            new Array(5).fill(<></>)
        );
        const constructRating = (currentRating: number) => {
            const updatedArray = ratingArray.map((e: JSX.Element, i: number) => {
                return (
                    <span
                        className={cn(styles.star, {
                            [styles.filled]: i < currentRating,
                            [styles.editable]: isEditable
                        })}
                        onMouseEnter={() => changeDisplay(i + 1)}
                        onMouseLeave={() => changeDisplay(rating)}
                        onClick={() => onClick(i + 1)}
                    >
                        <StarIcon
                            tabIndex={isEditable ? 0 : -1}
                            onKeyDown={(e: KeyboardEvent<SVGElement>) =>
                                isEditable && handleSpace(i + 1, e)
                            }
                        />
                    </span>
                );
            });
            setRatingArray(updatedArray);
        };

        const changeDisplay = (i: number) => {
            if (!isEditable) {
                return;
            }
            constructRating(i);
        };

        const onClick = (i: number) => {
            if (!isEditable || !setRating) {
                return;
            }
            setRating(i);
        };

        const handleSpace = (i: number, e: KeyboardEvent<SVGElement>) => {
            if (e.code != 'Space' || !setRating) {
                return;
            }

            setRating(i);
        };

        useEffect(() => {
            constructRating(rating);
        }, [rating]);
        return (
            <div className={cn(styles.ratingWrapper, {
                [styles.error]: error
            })} ref={ref} {...props}>
                {ratingArray.map((e, i) => (
                    <span key={i}>{e}</span>
                ))}
                {error && <span className={styles.errorMessage}>{error.message}</span>}
            </div>
        );
    }
);
