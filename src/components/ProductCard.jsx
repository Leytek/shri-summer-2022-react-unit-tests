import { useState } from 'react';
import styles from './ProductCard.module.css';

export const ProductCard = ({ bouquetHeight, bouquetWidth, currentPrice, flowersCount, imageUrl, isFavorite, isHit, isSale, oldPrice, title}) => {
    const [isImgLoaded, setLoaded] = useState(false);

    return <div className={styles.card} data-testid='product-card'>
        <img className={styles.img} src={imageUrl} alt='flowers' width='275' height='400' onLoad={setLoaded}/>
        {!!isImgLoaded || <div className={styles.img_placeholder} data-testid='img-placeholder'/>}
        <div className={styles.stickers}>
            {isHit && <span className={styles.hit}>ХИТ</span>}
            {isSale && <span className={styles.sale}>СКИДКА</span>}
        </div>
        <span className={isFavorite ? styles.favorite : styles.non_favorite} data-testid='favorite'/>
        <div className={styles.props}>
            <h4 className={styles.title}>{title}</h4>
            <span className={oldPrice ? styles.new_price : styles.price}>
                {`${currentPrice} ₽`} {oldPrice && <span className={styles.old_price} data-testid='old-price'>{`${oldPrice} ₽`}</span>}
            </span>
            <span className={styles.count}>{`${flowersCount} шт.`}</span>
            {bouquetHeight && <span className={styles.height}>{`${bouquetHeight} см`}</span>}
            {bouquetWidth && <span className={styles.width}>{`${bouquetWidth} см`}</span>}
        </div>
        <button className={styles.button_cart} type='button' disabled={!flowersCount}>В корзину</button>
        <button className={styles.button_buy} type='button' disabled={!flowersCount}>Купить сразу</button>
    </div>
}
