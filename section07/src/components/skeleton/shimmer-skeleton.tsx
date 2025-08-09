import styles from './shimmer-skeleton.module.css';

type ShimmerSkeletonProps = {
    width: number | string;
    height: number | string;
    borderRadius?: number | string;
    style?: React.CSSProperties;
};
export default function ShimmerSkeleton({ width, height, borderRadius, style }: ShimmerSkeletonProps) {
    return <div className={styles.skeleton} style={{ width, height, borderRadius, ...style }}></div>;
}
