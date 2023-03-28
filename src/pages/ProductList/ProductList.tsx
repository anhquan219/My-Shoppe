import { useQuery } from '@tanstack/react-query'
import productApi from 'src/api/product.api'
import Pagination from 'src/components/Pagination'
import { ProductListConfig } from 'src/types/product.type'
import AsideFilter from './components/AsideFilter'
import Product from './components/Product/Product'
import SortProductList from './components/SortProductList'
import categoryApi from 'src/api/category.api'
import useQueryConfig from 'src/hooks/useQueryConfig'

export default function ProductList() {
  const queryConfig = useQueryConfig()
  const { data: productData } = useQuery({
    queryKey: ['product', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig as ProductListConfig)
    },
    keepPreviousData: true // giữ lại data khi call trang mới tránh bị giật khi call cập nhập data mới
  })

  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => {
      return categoryApi.getCategories()
    }
  })

  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        {productData && (
          <div className='grid grid-cols-12 gap-6'>
            <div className='col-span-3'>
              <AsideFilter queryConfig={queryConfig} categories={categoriesData?.data.data || []} />
            </div>
            <div className='col-span-9'>
              <SortProductList queryConfig={queryConfig} pageSize={productData?.data.data.pagination.page_size} />
              <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                {productData.data.data.products.map((item) => (
                  <div className='col-span-1' key={item._id}>
                    <Product product={item} />
                  </div>
                ))}
              </div>
              <Pagination queryConfig={queryConfig} pageSize={productData?.data.data.pagination.page_size} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
