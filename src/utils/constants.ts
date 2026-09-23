import type { Category, Condition } from "@/types"

export const CATEGORIES: { value: Category | 'all', label: string }[] = [
    { value: 'all', label: '全部' },
    { value: 'textbook', label: '教材书籍' },
    { value: 'electronics', label: '电子数码' },
    { value: 'furniture', label: '生活用品' },
    { value: 'sports', label: '运动器材' },
    { value: 'clothing', label: '服饰鞋包' },
]

export const CONDITIONS: { value: Condition, label: string }[] = [
    { value: 'new', label: '全新' },
    { value: 'like-new', label: '几乎全新' },
    { value: 'good', label: '成色良好' },
    { value: 'fair', label: '有使用痕迹' },
]

export const categoryLabel = (v:Category) => CATEGORIES.find(c => c.value == v)?.label ?? v
    
export const conditionLabel = (v: Condition) => CONDITIONS.find(c => c.value === v)?.label ?? v
