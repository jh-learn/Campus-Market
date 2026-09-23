import type { Listing, User, ListingQuery,CreateListingDTO } from '@/types'
import { seedListings, seedUser, type MockUser } from './data'

const listings: Listing[] = [...seedListings]
const user: MockUser[] = [...seedUser]

export const db = {
    //查询
    listings(filters?: ListingQuery) {
        let result = [...listings]
        if (filters?.category && filters.category !== 'all') {
            result = result.filter(l => l.category === filters.category)
        }
        if (filters?.keyword) {
            const kw = filters.keyword.trim().toLowerCase()
            result = result.filter(
                l => l.title.toLowerCase().includes(kw) ||
                    l.description.toLowerCase().includes(kw)
            )
        }
        if (filters?.sellerId) {
            result = result.filter(l => l.sellerId === filters.sellerId)
        }
        return result.sort(
            (a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
    },
    getListing(id: string) {
        return listings.find(l => l.id === id) ?? null
    },

    //写入
    createListing(dto:CreateListingDTO):Listing {
        const listing: Listing = {
            ...dto,
            id: `l_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
            createdAt: new Date().toISOString(),
            status:'available'
        }
        listings.unshift(listing)
        return listing
    },

    //更新
    updateListing(id: string, patch: Partial<Listing>): Listing | null {
        const idx = listings.findIndex(l => l.id == id)
        if (idx === -1) return null
        listings[idx] = {...listings[idx],...patch,id}    
        return listings[idx]
    },
    //删除
    deleteListing(id:string):boolean {
        const before = listings.length
        const idx = listings.findIndex(l => l.id === id);
        if (idx !== -1) listings.splice(idx, 1);
        return listings.length < before
    },
    //用户
    getUser(id:string) {
        const found = user.find(u => u.id === id)
        if (!found) return null
        const publicUser: User = {
            id: found.id,
            name: found.name,
            avatar: found.avatar,
            campus: found.campus,
        }
        return publicUser
    },
    getUserCredentials(id: string) {
        return user.find(u => u.id === id) ?? null
    },
    //测试辅助
    reset() {
        listings.length = 0;
        listings.push(...seedListings);   
    }
}