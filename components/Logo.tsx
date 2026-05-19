'use client';
import Image from 'next/image';

const sizes = {
  sm: { w: 120, h: 40 },
  md: { w: 160, h: 52 },
  lg: { w: 200, h: 66 },
};

export default function Logo({ variant = 'light', size = 'md' }: { variant?: 'light' | 'dark'; size?: 'sm' | 'md' | 'lg' }) {
  const { w, h } = sizes[size] ?? sizes.md;
  return (
    <Image
      src="/logo.png"
      alt="A1 Auto Repair & Detail Center logo"
      width={w}
      height={h}
      style={{ display: 'block', objectFit: 'contain' }}
      priority
    />
  );
}
