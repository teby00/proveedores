
import { Image } from '@nextui-org/image'
import Link from "next/link"
import { Plus, ArrowRightIcon } from "lucide-react"

export default  async function Categorias({ negocio }) {

    const ALL_CATEGORIAS = `query allCategorias($slug: String!) {
        allCategorias(slug: $slug) {
          id
          nombre
        }
      }
      `

    const result = await fetch('http://127.0.0.1:8000/api',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: ALL_CATEGORIAS,
            variables: {
                slug: negocio
            }
        })
    })
    const {data} = await result.json()
    const categorias = data.allCategorias

    return  (
        <div className='mb-8' >
            
            { categorias?.map( category => 
                // category.productos.length > 0 &&
                <div key={category.id} className='mt-8' >
                    <div className='flex justify-between items-center' >
                        <h2 className='text-2xl font-bold mb-2' >{ category.nombre }</h2>
                        <Link href={`/${negocio}/${category.slug}`} >
                            <p className='text-gray-500 text-small font-extrabold flex items-center'>
                                Ver todo 
                                <ArrowRightIcon className="text-gray-500 size-5" />
                            </p>
                        </Link>
                    </div>

                    <div style={{ display: 'flex', scrollSnapType: 'x mandatory', overflowX: 'auto'}} >

                            {/* {category.productos.map(producto =>

                                <Link href={`/${negocio}/${category.slug}/${producto.id}`} key={producto.id} className='border border-gray-300 rounded-2xl flex flex-col p-4 mt-2 mr-4'  style={{ flex: '0 0 85%' }} >
                                    <Image 
                                        src={ producto.imagen } 
                                        width={'100%'} 
                                        className='object-cover aspect-square'
                                        alt={producto.nombre}
                                        removeWrapper 
                                    />
                                    <h3 className='text-xl font-bold mt-2' >{producto.nombre}</h3>
                                    <p className=' text-gray-500 font-extrabold uppercase mt-1' >${ producto.precio }</p>
                                </Link>

                            )}

                            {category.productos.length === 4 &&
                                <Link href={`/${negocio}/${category.slug}`} className='border border-gray-300 rounded-2xl flex flex-col justify-center items-center p-4 mt-2 mr-4 min-h-80'  style={{ flex: '0 0 85%' }} >
                                    <Plus className='text-gray-500 size-20' />
                                    <p className=' text-gray-500 font-extrabold uppercase mt-1' >Ver más</p>
                                </Link>
                            } */}
                    </div>
                </div>
                
            )}
                
        </div>
    )
}
