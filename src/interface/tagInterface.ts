export interface tagType {
    name: string,
    id: number
}

export type tagWithoutId = Omit<tagType, "id">;