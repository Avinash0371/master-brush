import { Colour } from './types';

export const COLOUR_CATALOGUE: Colour[] = [
    // ===== WHITES & OFF-WHITES (15 shades) =====
    {
        id: 'w1',
        name: 'Pure White',
        hex: '#FFFFFF',
        family: 'White',
        mood: 'Calm',
        finish: 'Matte',
        description: 'Crisp, clean white for a fresh, modern look.',
        isTrending: false
    },
    {
        id: 'w2',
        name: 'Alabaster White',
        hex: '#F2F0EB',
        family: 'White',
        mood: 'Calm',
        finish: 'Matte',
        description: 'A soft, warm white that creates a serene backdrop.',
        isTrending: true
    },
    {
        id: 'w3',
        name: 'Cloud White',
        hex: '#F7F7F5',
        family: 'White',
        mood: 'Calm',
        finish: 'Satin',
        description: 'Gentle off-white with subtle warmth.',
        isTrending: false
    },
    {
        id: 'w4',
        name: 'Ivory Cream',
        hex: '#FFFFF0',
        family: 'White',
        mood: 'Cozy',
        finish: 'Matte',
        description: 'Warm ivory with a hint of yellow.',
        isTrending: false
    },
    {
        id: 'w5',
        name: 'Linen White',
        hex: '#FAF0E6',
        family: 'White',
        mood: 'Cozy',
        finish: 'Matte',
        description: 'Natural linen-inspired off-white.',
        isTrending: true
    },
    {
        id: 'w6',
        name: 'Swiss Coffee',
        hex: '#F7F4EA',
        family: 'White',
        mood: 'Cozy',
        finish: 'Satin',
        description: 'Creamy white with warm undertones.',
        isTrending: false
    },
    {
        id: 'w7',
        name: 'Antique White',
        hex: '#FAEBD7',
        family: 'White',
        mood: 'Cozy',
        finish: 'Matte',
        description: 'Vintage-inspired warm white.',
        isTrending: false
    },
    {
        id: 'w8',
        name: 'Seashell',
        hex: '#FFF5EE',
        family: 'White',
        mood: 'Calm',
        finish: 'Satin',
        description: 'Delicate peachy-white.',
        isTrending: false
    },
    {
        id: 'w9',
        name: 'Vanilla Cream',
        hex: '#F3E5AB',
        family: 'White',
        mood: 'Cozy',
        finish: 'Matte',
        description: 'Soft vanilla-toned white.',
        isTrending: false
    },
    {
        id: 'w10',
        name: 'Porcelain',
        hex: '#F8F8FF',
        family: 'White',
        mood: 'Calm',
        finish: 'Gloss',
        description: 'Cool, crisp white with blue hints.',
        isTrending: false
    },

    // ===== BEIGES & TANS (12 shades) =====
    {
        id: 'bg1',
        name: 'Urban Greige',
        hex: '#D1CDBF',
        family: 'Beige',
        mood: 'Cozy',
        finish: 'Matte',
        description: 'The perfect balance of grey and beige for modern interiors.',
        isTrending: true
    },
    {
        id: 'bg2',
        name: 'Cashmere Mist',
        hex: '#E6E0D5',
        family: 'Beige',
        mood: 'Cozy',
        finish: 'Satin',
        description: 'Soft and luxurious, like a warm embrace.',
        isTrending: false
    },
    {
        id: 'bg3',
        name: 'Sandstone',
        hex: '#D2B48C',
        family: 'Beige',
        mood: 'Cozy',
        finish: 'Matte',
        description: 'Warm tan with earthy undertones.',
        isTrending: false
    },
    {
        id: 'bg4',
        name: 'Taupe Elegance',
        hex: '#B38B6D',
        family: 'Beige',
        mood: 'Cozy',
        finish: 'Satin',
        description: 'Sophisticated taupe for timeless appeal.',
        isTrending: true
    },
    {
        id: 'bg5',
        name: 'Warm Sand',
        hex: '#C2B280',
        family: 'Beige',
        mood: 'Cozy',
        finish: 'Matte',
        description: 'Sun-kissed sand color.',
        isTrending: false
    },
    {
        id: 'bg6',
        name: 'Khaki',
        hex: '#C3B091',
        family: 'Beige',
        mood: 'Cozy',
        finish: 'Matte',
        description: 'Classic khaki beige.',
        isTrending: false
    },
    {
        id: 'bg7',
        name: 'Wheat',
        hex: '#F5DEB3',
        family: 'Beige',
        mood: 'Cozy',
        finish: 'Satin',
        description: 'Golden wheat tone.',
        isTrending: false
    },
    {
        id: 'bg8',
        name: 'Biscuit',
        hex: '#FFE4C4',
        family: 'Beige',
        mood: 'Cozy',
        finish: 'Matte',
        description: 'Warm biscuit beige.',
        isTrending: true
    },
    {
        id: 'bg9',
        name: 'Latte',
        hex: '#D4C5B9',
        family: 'Beige',
        mood: 'Cozy',
        finish: 'Satin',
        description: 'Creamy coffee-inspired beige.',
        isTrending: false
    },
    {
        id: 'bg10',
        name: 'Oatmeal',
        hex: '#E8DCC4',
        family: 'Beige',
        mood: 'Calm',
        finish: 'Matte',
        description: 'Natural oatmeal tone.',
        isTrending: false
    },

    // ===== GREYS (15 shades) =====
    {
        id: 'gy1',
        name: 'Charcoal Slate',
        hex: '#36454F',
        family: 'Grey',
        mood: 'Bold',
        finish: 'Matte',
        description: 'A deep, dramatic grey for statement walls.',
        isTrending: false
    },
    {
        id: 'gy2',
        name: 'Silver Mist',
        hex: '#C0C0C0',
        family: 'Grey',
        mood: 'Calm',
        finish: 'Satin',
        description: 'Light, airy grey with metallic hints.',
        isTrending: true
    },
    {
        id: 'gy3',
        name: 'Dove Grey',
        hex: '#B8B8B8',
        family: 'Grey',
        mood: 'Calm',
        finish: 'Matte',
        description: 'Soft, neutral grey for versatile spaces.',
        isTrending: false
    },
    {
        id: 'gy4',
        name: 'Graphite',
        hex: '#4A4A4A',
        family: 'Grey',
        mood: 'Bold',
        finish: 'Matte',
        description: 'Deep charcoal for modern sophistication.',
        isTrending: true
    },
    {
        id: 'gy5',
        name: 'Pewter',
        hex: '#8B8589',
        family: 'Grey',
        mood: 'Calm',
        finish: 'Satin',
        description: 'Medium grey with purple undertones.',
        isTrending: false
    },
    {
        id: 'gy6',
        name: 'Ash Grey',
        hex: '#B2BEB5',
        family: 'Grey',
        mood: 'Calm',
        finish: 'Matte',
        description: 'Cool ash-toned grey.',
        isTrending: false
    },
    {
        id: 'gy7',
        name: 'Slate Blue Grey',
        hex: '#708090',
        family: 'Grey',
        mood: 'Calm',
        finish: 'Satin',
        description: 'Grey with subtle blue tones.',
        isTrending: true
    },
    {
        id: 'gy8',
        name: 'Platinum',
        hex: '#E5E4E2',
        family: 'Grey',
        mood: 'Calm',
        finish: 'Gloss',
        description: 'Light metallic grey.',
        isTrending: false
    },
    {
        id: 'gy9',
        name: 'Storm Grey',
        hex: '#717171',
        family: 'Grey',
        mood: 'Bold',
        finish: 'Matte',
        description: 'Medium storm grey.',
        isTrending: false
    },
    {
        id: 'gy10',
        name: 'Concrete',
        hex: '#A9A9A9',
        family: 'Grey',
        mood: 'Bold',
        finish: 'Matte',
        description: 'Industrial concrete grey.',
        isTrending: true
    },

    // ===== BLUES (20 shades) =====
    {
        id: 'bl1',
        name: 'Midnight Sapphire',
        hex: '#1B2631',
        family: 'Blue',
        mood: 'Bold',
        finish: 'Matte',
        description: 'A rich, deep blue that evokes the night sky.',
        isTrending: true
    },
    {
        id: 'bl2',
        name: 'Coastal Breeze',
        hex: '#A3C1AD',
        family: 'Blue',
        mood: 'Fresh',
        finish: 'Satin',
        description: 'Light and airy, bringing the ocean indoors.',
        isTrending: false
    },
    {
        id: 'bl3',
        name: 'Nordic Sky',
        hex: '#C8D6E5',
        family: 'Blue',
        mood: 'Calm',
        finish: 'Matte',
        description: 'A cool, crisp blue for a minimalist look.',
        isTrending: false
    },
    {
        id: 'bl4',
        name: 'Aegean Teal',
        hex: '#4E7078',
        family: 'Blue',
        mood: 'Calm',
        finish: 'Satin',
        description: 'A harmonious blend of blue and green.',
        isTrending: false
    },
    {
        id: 'bl5',
        name: 'Navy Depth',
        hex: '#000080',
        family: 'Blue',
        mood: 'Bold',
        finish: 'Matte',
        description: 'Classic navy for timeless elegance.',
        isTrending: true
    },
    {
        id: 'bl6',
        name: 'Sky Blue',
        hex: '#87CEEB',
        family: 'Blue',
        mood: 'Fresh',
        finish: 'Satin',
        description: 'Bright, cheerful blue.',
        isTrending: false
    },
    {
        id: 'bl7',
        name: 'Powder Blue',
        hex: '#B0E0E6',
        family: 'Blue',
        mood: 'Calm',
        finish: 'Matte',
        description: 'Soft, delicate blue.',
        isTrending: false
    },
    {
        id: 'bl8',
        name: 'Denim Blue',
        hex: '#1560BD',
        family: 'Blue',
        mood: 'Bold',
        finish: 'Satin',
        description: 'Rich, saturated blue.',
        isTrending: true
    },
    {
        id: 'bl9',
        name: 'Turquoise',
        hex: '#40E0D0',
        family: 'Blue',
        mood: 'Fresh',
        finish: 'Gloss',
        description: 'Vibrant tropical blue-green.',
        isTrending: false
    },
    {
        id: 'bl10',
        name: 'Steel Blue',
        hex: '#4682B4',
        family: 'Blue',
        mood: 'Calm',
        finish: 'Satin',
        description: 'Cool, industrial blue.',
        isTrending: false
    },
    {
        id: 'bl11',
        name: 'Cerulean',
        hex: '#007BA7',
        family: 'Blue',
        mood: 'Fresh',
        finish: 'Satin',
        description: 'Bright sky blue.',
        isTrending: false
    },
    {
        id: 'bl12',
        name: 'Cobalt',
        hex: '#0047AB',
        family: 'Blue',
        mood: 'Bold',
        finish: 'Gloss',
        description: 'Intense cobalt blue.',
        isTrending: true
    },
    {
        id: 'bl13',
        name: 'Periwinkle',
        hex: '#CCCCFF',
        family: 'Blue',
        mood: 'Calm',
        finish: 'Matte',
        description: 'Soft lavender-blue.',
        isTrending: false
    },
    {
        id: 'bl14',
        name: 'Azure',
        hex: '#007FFF',
        family: 'Blue',
        mood: 'Fresh',
        finish: 'Satin',
        description: 'Bright azure blue.',
        isTrending: false
    },
    {
        id: 'bl15',
        name: 'Indigo',
        hex: '#4B0082',
        family: 'Blue',
        mood: 'Bold',
        finish: 'Matte',
        description: 'Deep purple-blue.',
        isTrending: true
    },

    // ===== GREENS (18 shades) =====
    {
        id: 'gn1',
        name: 'Sage Wisdom',
        hex: '#9CAF88',
        family: 'Green',
        mood: 'Calm',
        finish: 'Matte',
        description: 'Earthy and grounded, perfect for bedrooms.',
        isTrending: true
    },
    {
        id: 'gn2',
        name: 'Emerald Envy',
        hex: '#2E8B57',
        family: 'Green',
        mood: 'Bold',
        finish: 'Gloss',
        description: 'Jewel-toned luxury for accents and furniture.',
        isTrending: false
    },
    {
        id: 'gn3',
        name: 'Olive Grove',
        hex: '#556B2F',
        family: 'Green',
        mood: 'Cozy',
        finish: 'Matte',
        description: 'Warm and organic, bringing nature inside.',
        isTrending: false
    },
    {
        id: 'gn4',
        name: 'Mint Fresh',
        hex: '#F5FFFA',
        family: 'Green',
        mood: 'Fresh',
        finish: 'Satin',
        description: 'A whisper of green for a clean, bright feel.',
        isTrending: false
    },
    {
        id: 'gn5',
        name: 'Forest Green',
        hex: '#228B22',
        family: 'Green',
        mood: 'Bold',
        finish: 'Matte',
        description: 'Deep, rich green.',
        isTrending: true
    },
    {
        id: 'gn6',
        name: 'Lime Zest',
        hex: '#BFFF00',
        family: 'Green',
        mood: 'Fresh',
        finish: 'Satin',
        description: 'Bright, energetic green.',
        isTrending: false
    },
    {
        id: 'gn7',
        name: 'Sea Foam',
        hex: '#93E9BE',
        family: 'Green',
        mood: 'Fresh',
        finish: 'Matte',
        description: 'Soft aqua-green.',
        isTrending: false
    },
    {
        id: 'gn8',
        name: 'Hunter Green',
        hex: '#355E3B',
        family: 'Green',
        mood: 'Bold',
        finish: 'Matte',
        description: 'Classic dark green.',
        isTrending: true
    },
    {
        id: 'gn9',
        name: 'Pistachio',
        hex: '#93C572',
        family: 'Green',
        mood: 'Fresh',
        finish: 'Satin',
        description: 'Light, nutty green.',
        isTrending: false
    },
    {
        id: 'gn10',
        name: 'Moss Green',
        hex: '#8A9A5B',
        family: 'Green',
        mood: 'Cozy',
        finish: 'Matte',
        description: 'Natural, earthy green.',
        isTrending: false
    },
    {
        id: 'gn11',
        name: 'Jade',
        hex: '#00A86B',
        family: 'Green',
        mood: 'Bold',
        finish: 'Gloss',
        description: 'Vibrant jade green.',
        isTrending: true
    },
    {
        id: 'gn12',
        name: 'Eucalyptus',
        hex: '#44D7A8',
        family: 'Green',
        mood: 'Fresh',
        finish: 'Satin',
        description: 'Fresh eucalyptus tone.',
        isTrending: false
    },
    {
        id: 'gn13',
        name: 'Fern',
        hex: '#4F7942',
        family: 'Green',
        mood: 'Calm',
        finish: 'Matte',
        description: 'Natural fern green.',
        isTrending: false
    },
    {
        id: 'gn14',
        name: 'Chartreuse',
        hex: '#7FFF00',
        family: 'Green',
        mood: 'Fresh',
        finish: 'Gloss',
        description: 'Bright yellow-green.',
        isTrending: false
    },

    // ===== YELLOWS & GOLDS (12 shades) =====
    {
        id: 'yl1',
        name: 'Golden Hour',
        hex: '#FFD700',
        family: 'Yellow',
        mood: 'Fresh',
        finish: 'Satin',
        description: 'Radiant and cheerful, like sunlight in a room.',
        isTrending: false
    },
    {
        id: 'yl2',
        name: 'Butter Cream',
        hex: '#FFFACD',
        family: 'Yellow',
        mood: 'Cozy',
        finish: 'Matte',
        description: 'Soft, pale yellow.',
        isTrending: false
    },
    {
        id: 'yl3',
        name: 'Sunshine Yellow',
        hex: '#FFFF00',
        family: 'Yellow',
        mood: 'Fresh',
        finish: 'Gloss',
        description: 'Bright, energizing yellow.',
        isTrending: false
    },
    {
        id: 'yl4',
        name: 'Mustard',
        hex: '#FFDB58',
        family: 'Yellow',
        mood: 'Cozy',
        finish: 'Matte',
        description: 'Warm, spicy yellow.',
        isTrending: true
    },
    {
        id: 'yl5',
        name: 'Lemon Zest',
        hex: '#FFF44F',
        family: 'Yellow',
        mood: 'Fresh',
        finish: 'Satin',
        description: 'Bright citrus yellow.',
        isTrending: false
    },
    {
        id: 'yl6',
        name: 'Honey Gold',
        hex: '#FFC30B',
        family: 'Yellow',
        mood: 'Cozy',
        finish: 'Satin',
        description: 'Rich honey tone.',
        isTrending: true
    },
    {
        id: 'yl7',
        name: 'Canary',
        hex: '#FFEF00',
        family: 'Yellow',
        mood: 'Fresh',
        finish: 'Gloss',
        description: 'Bright canary yellow.',
        isTrending: false
    },
    {
        id: 'yl8',
        name: 'Marigold',
        hex: '#EAA221',
        family: 'Yellow',
        mood: 'Fresh',
        finish: 'Satin',
        description: 'Warm marigold orange-yellow.',
        isTrending: false
    },

    // ===== ORANGES (10 shades) =====
    {
        id: 'or1',
        name: 'Terracotta Clay',
        hex: '#E2725B',
        family: 'Orange',
        mood: 'Cozy',
        finish: 'Matte',
        description: 'Earthy warmth with a Mediterranean vibe.',
        isTrending: true
    },
    {
        id: 'or2',
        name: 'Burnt Orange',
        hex: '#CC5500',
        family: 'Orange',
        mood: 'Bold',
        finish: 'Matte',
        description: 'Deep, warm orange.',
        isTrending: true
    },
    {
        id: 'or3',
        name: 'Peach',
        hex: '#FFDAB9',
        family: 'Orange',
        mood: 'Cozy',
        finish: 'Matte',
        description: 'Soft, warm peach.',
        isTrending: false
    },
    {
        id: 'or4',
        name: 'Coral',
        hex: '#FF7F50',
        family: 'Orange',
        mood: 'Fresh',
        finish: 'Satin',
        description: 'Vibrant coral pink-orange.',
        isTrending: true
    },
    {
        id: 'or5',
        name: 'Apricot',
        hex: '#FBCEB1',
        family: 'Orange',
        mood: 'Cozy',
        finish: 'Matte',
        description: 'Gentle peachy orange.',
        isTrending: false
    },
    {
        id: 'or6',
        name: 'Tangerine',
        hex: '#F28500',
        family: 'Orange',
        mood: 'Fresh',
        finish: 'Gloss',
        description: 'Bright tangerine orange.',
        isTrending: false
    },
    {
        id: 'or7',
        name: 'Pumpkin',
        hex: '#FF7518',
        family: 'Orange',
        mood: 'Fresh',
        finish: 'Satin',
        description: 'Warm pumpkin orange.',
        isTrending: false
    },
    {
        id: 'or8',
        name: 'Rust',
        hex: '#B7410E',
        family: 'Orange',
        mood: 'Cozy',
        finish: 'Matte',
        description: 'Deep rust orange.',
        isTrending: true
    },

    // ===== REDS & PINKS (15 shades) =====
    {
        id: 'rd1',
        name: 'Burgundy Velvet',
        hex: '#800020',
        family: 'Red',
        mood: 'Bold',
        finish: 'Matte',
        description: 'Sophisticated and regal.',
        isTrending: false
    },
    {
        id: 'rd2',
        name: 'Crimson',
        hex: '#DC143C',
        family: 'Red',
        mood: 'Bold',
        finish: 'Gloss',
        description: 'Rich, vibrant red.',
        isTrending: true
    },
    {
        id: 'rd3',
        name: 'Rose Pink',
        hex: '#FF66CC',
        family: 'Red',
        mood: 'Fresh',
        finish: 'Satin',
        description: 'Bright, cheerful pink.',
        isTrending: false
    },
    {
        id: 'rd4',
        name: 'Blush Rose',
        hex: '#FEC5E5',
        family: 'Red',
        mood: 'Calm',
        finish: 'Matte',
        description: 'Delicate and romantic.',
        isTrending: false
    },
    {
        id: 'rd5',
        name: 'Maroon',
        hex: '#800000',
        family: 'Red',
        mood: 'Bold',
        finish: 'Matte',
        description: 'Deep, rich red-brown.',
        isTrending: true
    },
    {
        id: 'rd6',
        name: 'Cherry Red',
        hex: '#DE3163',
        family: 'Red',
        mood: 'Bold',
        finish: 'Gloss',
        description: 'Bright, bold red.',
        isTrending: false
    },
    {
        id: 'rd7',
        name: 'Dusty Rose',
        hex: '#DCAE96',
        family: 'Red',
        mood: 'Cozy',
        finish: 'Matte',
        description: 'Muted, vintage pink.',
        isTrending: true
    },
    {
        id: 'rd8',
        name: 'Raspberry',
        hex: '#E30B5C',
        family: 'Red',
        mood: 'Bold',
        finish: 'Satin',
        description: 'Vibrant raspberry red.',
        isTrending: false
    },
    {
        id: 'rd9',
        name: 'Salmon',
        hex: '#FA8072',
        family: 'Red',
        mood: 'Fresh',
        finish: 'Satin',
        description: 'Soft salmon pink.',
        isTrending: false
    },
    {
        id: 'rd10',
        name: 'Brick Red',
        hex: '#CB4154',
        family: 'Red',
        mood: 'Bold',
        finish: 'Matte',
        description: 'Classic brick red.',
        isTrending: true
    },

    // ===== PURPLES & LAVENDERS (12 shades) =====
    {
        id: 'pr1',
        name: 'Lavender Dream',
        hex: '#E6E6FA',
        family: 'Purple',
        mood: 'Calm',
        finish: 'Matte',
        description: 'Soft, soothing lavender.',
        isTrending: false
    },
    {
        id: 'pr2',
        name: 'Royal Purple',
        hex: '#7851A9',
        family: 'Purple',
        mood: 'Bold',
        finish: 'Satin',
        description: 'Rich, regal purple.',
        isTrending: true
    },
    {
        id: 'pr3',
        name: 'Plum',
        hex: '#8E4585',
        family: 'Purple',
        mood: 'Bold',
        finish: 'Matte',
        description: 'Deep purple-red.',
        isTrending: false
    },
    {
        id: 'pr4',
        name: 'Lilac',
        hex: '#C8A2C8',
        family: 'Purple',
        mood: 'Calm',
        finish: 'Matte',
        description: 'Light, airy purple.',
        isTrending: false
    },
    {
        id: 'pr5',
        name: 'Mauve',
        hex: '#E0B0FF',
        family: 'Purple',
        mood: 'Calm',
        finish: 'Satin',
        description: 'Soft purple-grey.',
        isTrending: true
    },
    {
        id: 'pr6',
        name: 'Violet',
        hex: '#8F00FF',
        family: 'Purple',
        mood: 'Bold',
        finish: 'Gloss',
        description: 'Vibrant purple.',
        isTrending: false
    },
    {
        id: 'pr7',
        name: 'Amethyst',
        hex: '#9966CC',
        family: 'Purple',
        mood: 'Bold',
        finish: 'Gloss',
        description: 'Jewel-toned purple.',
        isTrending: true
    },
    {
        id: 'pr8',
        name: 'Orchid',
        hex: '#DA70D6',
        family: 'Purple',
        mood: 'Fresh',
        finish: 'Satin',
        description: 'Bright orchid purple.',
        isTrending: false
    },
    {
        id: 'pr9',
        name: 'Grape',
        hex: '#6F2DA8',
        family: 'Purple',
        mood: 'Bold',
        finish: 'Matte',
        description: 'Deep grape purple.',
        isTrending: false
    },

    // ===== BROWNS (12 shades) =====
    {
        id: 'br1',
        name: 'Chocolate Brown',
        hex: '#7B3F00',
        family: 'Brown',
        mood: 'Cozy',
        finish: 'Matte',
        description: 'Rich, warm brown.',
        isTrending: false
    },
    {
        id: 'br2',
        name: 'Espresso',
        hex: '#4E3629',
        family: 'Brown',
        mood: 'Bold',
        finish: 'Matte',
        description: 'Deep coffee brown.',
        isTrending: true
    },
    {
        id: 'br3',
        name: 'Caramel',
        hex: '#C68E17',
        family: 'Brown',
        mood: 'Cozy',
        finish: 'Satin',
        description: 'Sweet, golden brown.',
        isTrending: false
    },
    {
        id: 'br4',
        name: 'Walnut',
        hex: '#773F1A',
        family: 'Brown',
        mood: 'Cozy',
        finish: 'Matte',
        description: 'Medium wood-tone brown.',
        isTrending: false
    },
    {
        id: 'br5',
        name: 'Mocha',
        hex: '#967969',
        family: 'Brown',
        mood: 'Cozy',
        finish: 'Satin',
        description: 'Soft coffee-inspired brown.',
        isTrending: true
    },
    {
        id: 'br6',
        name: 'Chestnut',
        hex: '#954535',
        family: 'Brown',
        mood: 'Cozy',
        finish: 'Matte',
        description: 'Warm chestnut brown.',
        isTrending: false
    },
    {
        id: 'br7',
        name: 'Mahogany',
        hex: '#C04000',
        family: 'Brown',
        mood: 'Bold',
        finish: 'Gloss',
        description: 'Rich mahogany wood tone.',
        isTrending: true
    },
    {
        id: 'br8',
        name: 'Sienna',
        hex: '#A0522D',
        family: 'Brown',
        mood: 'Cozy',
        finish: 'Matte',
        description: 'Earthy sienna brown.',
        isTrending: false
    },
    {
        id: 'br9',
        name: 'Umber',
        hex: '#635147',
        family: 'Brown',
        mood: 'Cozy',
        finish: 'Matte',
        description: 'Natural umber brown.',
        isTrending: false
    },

    // ===== BLACKS & DARK TONES (8 shades) =====
    {
        id: 'bk1',
        name: 'Jet Black',
        hex: '#000000',
        family: 'Black',
        mood: 'Bold',
        finish: 'Matte',
        description: 'Pure, deep black.',
        isTrending: false
    },
    {
        id: 'bk2',
        name: 'Charcoal Black',
        hex: '#36454F',
        family: 'Black',
        mood: 'Bold',
        finish: 'Matte',
        description: 'Soft black with grey undertones.',
        isTrending: true
    },
    {
        id: 'bk3',
        name: 'Onyx',
        hex: '#353839',
        family: 'Black',
        mood: 'Bold',
        finish: 'Gloss',
        description: 'Glossy, deep black.',
        isTrending: false
    },
    {
        id: 'bk4',
        name: 'Ebony',
        hex: '#555D50',
        family: 'Black',
        mood: 'Bold',
        finish: 'Matte',
        description: 'Dark ebony with green hints.',
        isTrending: true
    },
    {
        id: 'bk5',
        name: 'Midnight',
        hex: '#191970',
        family: 'Black',
        mood: 'Bold',
        finish: 'Matte',
        description: 'Deep midnight blue-black.',
        isTrending: false
    },
];

export const TRENDING_COLLECTIONS = [
    {
        id: 'c1',
        name: 'Earth Tones 2025',
        description: 'Grounded shades for a peaceful home.',
        colors: ['bg1', 'gn1', 'or1'],
        image: '/images/collection_earth.png'
    },
    {
        id: 'c2',
        title: 'Nordic Minimalist',
        description: 'Cool blues and whites for clarity.',
        colors: ['w2', 'bl3', 'gy2'],
        image: '/images/collection_nordic.png'
    },
    {
        id: 'c3',
        title: 'Modern Luxe',
        description: 'Deep jewels and rich accents.',
        colors: ['bl1', 'gn2', 'rd1'],
        image: '/images/collection_luxe.png'
    },
    {
        id: 'c4',
        title: 'Warm & Cozy',
        description: 'Inviting tones for comfort.',
        colors: ['bg4', 'br5', 'or2'],
        image: '/images/collection_warm.png'
    },
    {
        id: 'c5',
        title: 'Fresh & Bright',
        description: 'Energizing colors for lively spaces.',
        colors: ['yl1', 'bl6', 'gn6'],
        image: '/images/collection_fresh.png'
    },
    {
        id: 'c6',
        title: 'Pastel Dreams',
        description: 'Soft, soothing pastels.',
        colors: ['rd4', 'pr1', 'or3'],
        image: '/images/collection_pastel.png'
    }
];
