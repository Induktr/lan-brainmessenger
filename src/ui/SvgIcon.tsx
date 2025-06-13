import React from 'react';
import Image from 'next/image';

interface SvgIconProps {
  iconName: string;
  className?: string;
  title?: string;
  style?: React.CSSProperties;
}

const SvgIcon: React.FC<SvgIconProps> = ({ iconName, className, title, style }) => {
  const iconPath = `/icons/${iconName}.svg`;

  return (
    <Image
      src={iconPath}
      alt={title || iconName}
      width={24} // Default width, can be overridden by className
      height={24} // Default height, can be overridden by className
      className={className}
      style={style}
    />
  );
};

export default SvgIcon;