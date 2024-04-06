import { ImageResponse } from 'next/og'
import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
  
export default async function Image({ params }) {

    const supabase = createServerComponentClient({ cookies })
    const { data: [{ nombre, descripcion }] } = await supabase
    .from('negocios')
    .select('nombre, descripcion')
    .eq('slug', params.negocio )

  return new ImageResponse(
    (
      <div style={{display: 'flex',height: '100%',flexDirection: 'column',justifyContent: 'center'}}>

        <span style={{ position: 'absolute',top: '35px',left: '60px', display: 'flex', alignItems: 'center' }}>
          <svg width="32px" height="32px" viewBox="0 0 129.000000 116.000000"preserveAspectRatio="xMidYMid meet">
            <g transform="translate(0.000000,116.000000) scale(0.100000,-0.100000)"fill="#000000" stroke="none">
              <path d="M410 1135 c-236 -47 -360 -184 -389 -430 -24 -201 -7 -361 46 -438 66 -96 212 -192 363 -238 108 -34 302 -34 410 0 177 54 335 172 405 301 l30 55 -1 165 c-2 245 -36 358 -137 459 -105 105 -236 142 -501 140 -88 0 -190 -7 -226 -14z m103 -166 c34 -11 77 -33 96 -48 l34 -28 49 34 c91 61 187 77 289 47 71 -21 167 -117 197 -197 49 -130 53 -269 12 -400 -26 -83 -65 -129 -166 -196 -169 -113 -375 -147 -567 -92 -104 30 -227 102 -295 174 -95 99 -118 333 -51 513 29 78 119 171 189 195 72 24 136 24 213 -2z"/>
              <path d="M300 682 c-30 -15 -35 -22 -34 -50 3 -44 25 -75 70 -97 46 -22 107 -15 139 15 19 18 22 27 14 52 -11 40 -36 67 -76 84 -43 18 -71 18 -113 -4z"/>
              <path d="M874 686 c-38 -17 -74 -65 -74 -98 0 -56 86 -85 154 -53 42 20 63 47 72 92 5 26 2 34 -20 48 -35 23 -95 28 -132 11z"/>
              <path d="M605 400 c-14 -16 -16 -29 -11 -72 4 -29 16 -72 28 -96 l20 -43 20 32 c11 18 24 58 30 91 9 49 8 62 -6 83 -20 30 -56 33 -81 5z"/>
            </g>
          </svg>
          <h2 style={{
                fontSize: '36px',
                color: '#222',
                fontFamily: "'Noto Sans', sans-serif",
                fontWeight: 700,
                marginLeft: '8px'
              }}
            >
              Aurora
            </h2>
        </span>
        

        
          <h2 style={{
              fontSize: '56px',
              color: '#222',
              padding: '0 60px',
              fontFamily: "'Noto Sans', sans-serif",
              fontWeight: 'bolder',
              margin: 0
            }}
          >
            {nombre}
          </h2>
          <h2 style={{
              fontSize: '30px',
              color: '#222',
              padding: '0 60px',
              fontFamily: "'Noto Sans', sans-serif",
              fontWeight: 700,
            }}
          >
            {descripcion}
          </h2>
        
      </div>
    ),
    {
      width: 1200,
      height: 630,
      
    }
  )
}