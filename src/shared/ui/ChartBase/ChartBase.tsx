import type React from 'react';
import { useMemo } from 'react';
import styles from './ChartBase.module.css';

export interface ChartDataItem {
  id: string | number;
  label: string;
  shortLabel?: string;
  value: number;
  max: number;
  color?: string;
}

interface ChartBaseProps {
  title?: string;
  data: ChartDataItem[];
  className?: string;
  isLoading?: boolean;
}

export const ChartBase: React.FC<ChartBaseProps> = ({ title, data, className = '', isLoading }) => {
  const maxVal = useMemo(() => {
    if (data.length === 0) return 100;
    const highest = Math.max(...data.map((d) => d.value), ...data.map((d) => d.max));
    return highest > 0 ? highest : 100;
  }, [data]);

  if (isLoading) return <div className={`${styles.skeleton} ${className}`} />;
  if (data.length === 0) return null;

  const gridSteps = [1, 0.75, 0.5, 0.25, 0];

  return (
    <div className={`${styles.container} ${className}`}>
      {title && <h3 className={styles.title}>{title}</h3>}

      <div className={styles.chartBody}>
        <div className={styles.yAxis}>
          {gridSteps.map((step) => {
            const val = Math.round(maxVal * step);
            return (
              <div key={step} className={styles.yLabelWrapper}>
                <span className={styles.yLabel}>{val}</span>
              </div>
            );
          })}
        </div>

        <div className={styles.scrollArea}>
          <div className={styles.chartInner}>
            <div className={styles.gridLines}>
              {gridSteps.map((step) => (
                <div key={step} className={styles.gridLineRow}>
                  <div className={styles.gridLine} />
                </div>
              ))}
            </div>

            <div className={styles.columns}>
              {data.map((item, index) => (
                <div key={item.id} className={styles.column}>
                  <div className={styles.barArea}>
                    <div
                      className={styles.bar}
                      style={{
                        height: `${(item.value / maxVal) * 100}%`,
                        backgroundColor: item.color || `var(--bar-color-${(index % 5) + 1})`,
                      }}
                    >
                      <span className={styles.barValue}>{item.value}</span>
                    </div>
                  </div>
                  <div className={styles.xLabel}>
                    <span className={styles.pLabel} title={item.label}>
                      {item.shortLabel || item.label}
                    </span>
                    <span className={styles.scoreLabel}>
                      {item.value}/{item.max}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
