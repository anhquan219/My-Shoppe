import { beforeEach, describe, expect, it } from 'vitest'
import {
  clearLS,
  getAccessTokenFromLS,
  getProfileFromLS,
  getRefreshTokenFromLS,
  setAcessTokenToLS,
  setProfileFromLS,
  setRefreshTokenToLS
} from '../auth'

const access_tocken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MTZiZTNkNmQ3YzYyMDM0MDg1NjBiNSIsImVtYWlsIjoicXVhbjhAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyMy0wNC0yMVQwODo0MjoxNS41MThaIiwiaWF0IjoxNjgyMDY2NTM1LCJleHAiOjE2OTU4OTA1MzV9.fpv7jbk_UaTmEHS1MEncbXpvueSNHIRcNdnMyzH0EeU'

const refresh_tocken =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MTZiZTNkNmQ3YzYyMDM0MDg1NjBiNSIsImVtYWlsIjoicXVhbjhAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyMy0wNC0yNFQxMzoyNDoyMC4zMjJaIiwiaWF0IjoxNjgyMzQyNjYwLCJleHAiOjE2ODI0MjkwNjB9.RL7aPAcGdjo0DsoFXgtF4zOFqLPssQFtew8HB8--MyY'

const profile =
  '{"_id":"6416be3d6d7c6203408560b5","roles":["User"],"email":"quan8@gmail.com","createdAt":"2023-03-19T07:48:13.390Z","updatedAt":"2023-04-08T09:37:37.720Z","__v":0,"address":"Văn Quan","date_of_birth":"1998-10-19T17:00:00.000Z","name":"quan 23","phone":"123123","avatar":"ea39fd9b-7c0e-4e86-a274-937efacadb12.jpeg"}'

beforeEach(() => {
  // Cho không bị ảnh hưởng lẫn nhau mỗi lần describe()
  console.log('Chạy trước mỗi lần describe')
  localStorage.clear() // Cú pháp jsdom chứ k phải DOM (vitest)
})

describe('Test Access Tocken', () => {
  it('Set access_tocken vào localStorage thành công', () => {
    setAcessTokenToLS(access_tocken)
    expect(getAccessTokenFromLS()).toBe(access_tocken) //toBe kiểm tra tham chiếu
  })
})

describe('Test Refresh Tocken', () => {
  it('Set refresh_tocken vào localStorage thành công', () => {
    setRefreshTokenToLS(refresh_tocken)
    expect(getRefreshTokenFromLS()).toEqual(refresh_tocken) //toEqual kiểm tra giá trị thực (kiểm tra Object)
  })
})

describe('Test Profile', () => {
  it('Set profile vào localStorage thành công', () => {
    setProfileFromLS(JSON.parse(profile))
    expect(getProfileFromLS()).toEqual(JSON.parse(profile))
  })
})

describe('Clear localStorage', () => {
  it('Clear access_tocken, refresh_tocken, profile', () => {
    setAcessTokenToLS(access_tocken)
    setRefreshTokenToLS(refresh_tocken)
    setProfileFromLS(JSON.parse(profile))

    clearLS()
    expect(getAccessTokenFromLS()).toBe('')
    expect(getRefreshTokenFromLS()).toBe('')
    expect(getProfileFromLS()).toBe(null)
  })
})
