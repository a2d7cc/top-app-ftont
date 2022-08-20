import { ReviewFormProps } from './ReviewForm.props';
import styles from './ReviewForm.module.css';
import cn from 'classnames';
import { format } from 'date-fns';
import { Rating } from '../Rating/Rating';
import { ru } from 'date-fns/locale';
import { Input } from '../Input/Input';
import { Textarea } from '../Textarea/Textarea';
import { Button } from '../Button/Button';
import CloseIcon from './close-review.svg';
import { IReviewForm, IReviewSentResponse } from './ReviewForm.interface';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { API } from '../../helpers/api';
import { useState } from 'react';

export const ReviewForm = ({
    productId,
    className,
    ...props
}: ReviewFormProps): JSX.Element => {
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [isError, setIsError] = useState<string>();

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<IReviewForm>();
    const onSubmit = async (formData: IReviewForm) => {
        try {
            const { data } = await axios.post<IReviewSentResponse>(
                API.review.createDemo,
                {
                    ...formData,
                    productId
                }
            );
            if (data.message) {
                setIsSuccess(true);
                reset();
            } else {
                setIsError('Error when sending reques to create a review');
            }
        } catch (e) {
            setIsError(e.message);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={cn(className, styles.reviewForm)} {...props}>
                <Input
                    error={errors.name}
                    {...register('name', {
                        required: { value: true, message: 'Fill the field' }
                    })}
                    placeholder="Name"
                />
                <Input
                    error={errors.title}
                    {...register('title', {
                        required: { value: true, message: 'Fill the field' }
                    })}
                    placeholder="Title of the review"
                    className={styles.title}
                />
                <div className={styles.rating}>
                    <span>Оценка:</span>
                    <Controller
                        control={control}
                        name="rating"
                        rules={{
                            required: { value: true, message: 'Choose rating' }
                        }}
                        render={({ field }) => (
                            <Rating
                                error={errors.rating}
                                isEditable
                                rating={field.value}
                                ref={field.ref}
                                setRating={field.onChange}
                            />
                        )}
                    ></Controller>
                </div>
                <Textarea
                    error={errors.description}
                    {...register('description', {
                        required: { value: true, message: 'Fill the field' }
                    })}
                    placeholder="Text of the review"
                    className={styles.description}
                />
                <div className={styles.submit}>
                    <Button appearance="primary">Send</Button>
                    <span className={styles.info}>
                        * Перед публикацией отзыв пройдет предварительную модерацию и
                        проверку
                    </span>
                </div>
            </div>
            {isSuccess && (
                <div className={styles.success}>
                    <div className={styles.successTitle}>Your review</div>
                    <div>Thanks, your review will published after moderating</div>
                    <CloseIcon
                        onClick={() => setIsSuccess(false)}
                        className={styles.close}
                    />
                </div>
            )}
            {isError && (
                <div className={styles.error}>
                    <div className={styles.errorMessage}>Your review didnt sent</div>
                    <CloseIcon
                        onClick={() => setIsError(undefined)}
                        className={styles.close}
                    />
                </div>
            )}
        </form>
    );
};
