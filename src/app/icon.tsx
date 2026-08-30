import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 24,
          background: '#0f1117',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#D4AF37',
          borderRadius: '4px',
          fontFamily: 'serif', // Elegant serif font for luxury feel
          fontWeight: 700,
          fontStyle: 'italic',
          paddingRight: '2px', // Slight optical alignment for the italic L
        }}
      >
        L
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  );
}
