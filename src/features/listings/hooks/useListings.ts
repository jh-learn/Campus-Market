import { fetchListings } from "@/api/listings"
import { useAsync } from "@/hooks/useAsync"
import type { ListingQuery } from "@/types"


export function useListings(query:ListingQuery) {
    return useAsync(
        () => fetchListings(query),
        [query.category,query.keyword,query.sellerId]
    )
}