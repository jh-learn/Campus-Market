import { apiClient } from './client';
import type {
    Listing,
    ListingDetail,
    ListingQuery,
    CreateListingDTO,
    UpdateListingDTO
} from '@/types';

export async function fetchListings(params?: ListingQuery) {
  const { data } = await apiClient.get<Listing[]>('/listings', { params });
  return data;
}

export async function fetchListing(id: string) {
  const { data } = await apiClient.get<ListingDetail>(`/listings/${id}`);
  return data;
}

export async function createListing(dto: CreateListingDTO) {
  const { data } = await apiClient.post<Listing>('/listings', dto);
  return data;
}

export async function updateListing(id: string, dto: UpdateListingDTO) {
  const { data } = await apiClient.put<Listing>(`/listings/${id}`, dto);
  return data;
}

export async function deleteListing(id: string) {
  await apiClient.delete(`/listings/${id}`);
}