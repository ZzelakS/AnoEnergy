import Image from 'next/image'

export default function BrandSeal({ className = '' }: { className?: string }) {
  return (
    <div className={`brand-seal relative ${className}`} aria-hidden="true">
      <Image
        src="/brand/ano-energy-logo-enhanced.png"
        alt=""
        fill
        sizes="240px"
        className="object-contain"
      />
    </div>
  )
}
