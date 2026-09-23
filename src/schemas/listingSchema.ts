import { z } from 'zod'

const priceSchema = z.number().finite().min(0, '价格不能小于 0')

export const listingSchema = z.object({
	title: z.string().trim().min(1, '请输入商品名称').max(80, '商品名称不能超过 80 个字符'),
	description: z.string().trim().min(1, '请输入商品描述').max(500, '商品描述不能超过 500 个字符'),
	price: priceSchema,
	originalPrice: z.number().finite().min(0, '原价不能小于 0').optional(),
	category: z.enum(['textbook', 'electronics', 'furniture', 'sports', 'clothing']),
	condition: z.enum(['new', 'like-new', 'good', 'fair']),
	images: z.array(z.string().trim().min(1, '请提供商品图片')).min(1, '请提供商品图片'),
})

export const listingFormSchema = z.object({
	title: listingSchema.shape.title,
	description: listingSchema.shape.description,
	price: z.number().finite().min(0, '价格不能小于 0'),
	originalPrice: z.preprocess(
		(value) => value === '' || (typeof value === 'number' && Number.isNaN(value)) ? undefined : value,
		listingSchema.shape.originalPrice,
	),
	category: listingSchema.shape.category,
	condition: listingSchema.shape.condition,
	imageUrl: z.string().trim().min(1, '请填写商品图片地址'),
})

export type ListingFormValues = z.infer<typeof listingFormSchema>
export type ListingFormInput = z.input<typeof listingFormSchema>
