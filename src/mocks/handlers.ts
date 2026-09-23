import { http, HttpResponse, delay } from 'msw'
import { db } from './store'
import type { CreateListingDTO,Category,UpdateListingDTO } from '@/types'

const BASE = '/api'

export const handlers = [
    //列表
    http.get(`${BASE}/listings`, async({ request }) => {
        await delay(300)
        const url = new URL(request.url)
        const category = url.searchParams.get('category') as Category | 'all' | null ?? undefined
        const keyword = url.searchParams.get('keyword') ?? undefined;
        const sellerId = url.searchParams.get('sellerId') ?? undefined;
        return HttpResponse.json(db.listings({category,keyword,sellerId}))
    }),
    //详情
    http.get(`${BASE}/listings/:id`, async ({params}) => {
        await delay(200)
        const listing = db.getListing(params.id as string)
        if (!listing) {
            return HttpResponse.json({message:'商品不存在'},{status:404})
        }
        const seller = db.getUser(listing.sellerId)
        if (!seller) {
            return HttpResponse.json({ message: '卖家不存在' }, { status: 404 });
        }
        return HttpResponse.json({...listing,seller})
    }),
    //创建
    http.post(`${BASE}/listings`, async ({request}) => {
        await delay(400)
        const body = (await request.json()) as CreateListingDTO
        if (!body.title || body.price == null || !body.category || !body.condition) {
            return HttpResponse.json({message:'参数不完整'},{status:400})
        }
        const created = db.createListing(body)
        return HttpResponse.json(created,{status:201})
    }),
    //更新
    http.put(`${BASE}/listings/:id`, async ({params,request}) => {
        await delay(300)
        const body = (await request.json()) as UpdateListingDTO
        const updated = db.updateListing(params.id as string, body)
        if (!updated) {
            return HttpResponse.json({message:'商品不存在'},{status:404})
        }
        return HttpResponse.json(updated)
    }),
    // 删除
    http.delete(`${BASE}/listings/:id`, async ({ params }) => {
        await delay(300);
        const ok = db.deleteListing(params.id as string);
        if (!ok) {
        return HttpResponse.json({ message: '商品不存在' }, { status: 404 });
        }
        return new HttpResponse(null, { status: 204 });
    }),
    http.post(`${BASE}/login`, async ({ request }) => {
        await delay(200)
        const body = await request.json() as { username?: string; password?: string }
        const user = body.username ? db.getUserCredentials(body.username) : null
        if (!user || body.password !== user.password) {
            return HttpResponse.json({ message: '学号或密码错误' }, { status: 401 })
        }
        return HttpResponse.json({ token: `mock-token-${user.id}`, user: db.getUser(user.id) })
    }),
    http.post(`${BASE}/logout`, async () => {
        await delay(100)
        return new HttpResponse(null, { status: 204 })
    }),
    // 当前用户
    http.get(`${BASE}/me`, async ({ request }) => {
        await delay(100);
        if (request.headers.get('Authorization') !== 'Bearer mock-token-u1') {
            return HttpResponse.json({ message: '请先登录' }, { status: 401 })
        }
        return HttpResponse.json(db.getUser('u1'));
    }),
]