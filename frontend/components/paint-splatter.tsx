export function PaintSplatter({ className = '', color = '#FFD700' }: { className?: string; color?: string }) {
    return (
        <svg
            className={`absolute pointer-events-none ${className}`}
            viewBox="0 0 200 200"
            fill={color}
            opacity="0.15"
        >
            {/* Main splatter blob */}
            <ellipse cx="100" cy="100" rx="60" ry="50" transform="rotate(25 100 100)" />

            {/* Splatter drops */}
            <circle cx="140" cy="80" r="15" />
            <circle cx="70" cy="130" r="12" />
            <circle cx="160" cy="120" r="10" />
            <circle cx="50" cy="90" r="8" />
            <circle cx="120" cy="140" r="14" />

            {/* Small splatters */}
            <circle cx="90" cy="70" r="6" />
            <circle cx="130" cy="110" r="7" />
            <circle cx="80" cy="110" r="5" />
        </svg>
    );
}
