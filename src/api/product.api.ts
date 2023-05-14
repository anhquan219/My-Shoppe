import { Product, ProductList, ProductListConfig } from 'src/types/product.type'
import { SucessResponseApi } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = 'products'

const productApi = {
  getProducts(params: ProductListConfig) {
    return http.get<SucessResponseApi<ProductList>>(URL, {
      params
    })
  },
  getProductDetail(id: string) {
    return http.get<SucessResponseApi<Product>>(`${URL}/${id}`)
  }
}

export default productApi
