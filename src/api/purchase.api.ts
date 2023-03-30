import { Purchase, PurchaseListStatus } from 'src/types/purchase.type'
import { SucessResponseApi } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = 'purchases'

const purchaseApi = {
  addToCart(body: { product_id: string; buy_count: number }) {
    return http.post<SucessResponseApi<Purchase>>(`${URL}/add-to-cart`, body)
  },
  getPurchases(params: { status: PurchaseListStatus }) {
    return http.get<SucessResponseApi<Purchase[]>>(`${URL}`, {
      params
    })
  }
}

export default purchaseApi
