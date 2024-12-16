const GoogleLogo = ({ size, color = 'color' }: { size?: string; color?: 'white' | 'black' | 'color' }) => {
    const style = {
        height: size ?? '24px',
        width: size ?? '24px',
    }
    const image = {
        'white': 'https://img.icons8.com/glyph-neue/64/FFFFFF/google-logo.png',
        'black': 'https://img.icons8.com/glyph-neue/64/google-logo.png',
        'color': 'https://img.icons8.com/color/48/google-logo.png',
    }
    return (
        <img style={style} className="hover:scale-105 transition-transform ease-in-out duration-200" src={image[color]} alt="logo" />
    );
};

export default GoogleLogo;