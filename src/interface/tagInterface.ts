export interface tagType {
    name: string,
    id: number
}

export type tagWithoutId = Omit<tagType, "id">;
export type tagIdInterface = Omit<tagType, "name">;