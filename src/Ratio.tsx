import classNames from 'classnames';
import * as React from 'react';
import PropTypes from 'prop-types';

import { useBootstrapPrefix } from './ThemeProvider';
import type { BsPrefixProps } from './helpers';

export type AspectRatio = '1x1' | '4x3' | '16x9' | '21x9' | string;

export interface RatioProps
  extends BsPrefixProps,
    React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactElement | string | number;
  aspectRatio?: AspectRatio | number;
}

const propTypes = {
  /**
   * @default 'ratio'
   */
  bsPrefix: PropTypes.string,

  /**
   * This component requires a single child element
   */
  children: PropTypes.element.isRequired,

  /**
   * Set the aspect ratio of the embed. A fraction or a percentage can also
   * be used to create custom aspect ratios.
   */
  aspectRatio: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

function toPercent(num: number): string {
  if (num <= 0) return '100%';
  if (num < 1) return `${num * 100}%`;
  return `${num}%`;
}

const Ratio = React.forwardRef<HTMLDivElement, RatioProps>(
  (
    { bsPrefix, className, children, aspectRatio = '1x1', style, ...props },
    ref,
  ) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'ratio');
    const isCustomRatio = typeof aspectRatio === 'number';

    return (
      <div
        ref={ref}
        {...props}
        style={{
          ...style,
          ...(isCustomRatio && {
            '--bs-aspect-ratio': toPercent(aspectRatio as number),
          }),
        }}
        className={classNames(
          bsPrefix,
          className,
          !isCustomRatio && `${bsPrefix}-${aspectRatio}`,
        )}
      >
        {React.Children.only(children)}
      </div>
    );
  },
);

Ratio.displayName = 'Ratio';
Ratio.propTypes = propTypes;

export default Ratio;
