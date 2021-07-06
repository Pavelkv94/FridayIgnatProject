import {instance} from "./fridayProject-api";
import {cardsType, RequestStatusType} from "../Redux/packs-reducer";


//api


export const packsApi = {

    getPacks(minCardsCount?: number, maxCardsCount?: number, page?: number, pageCount?: number) {
        return instance.get<responsePacksType>("/cards/pack",
            {params: {minCardsCount, maxCardsCount, page, pageCount}})
    },
    setPacks(name: string) {
        return instance.post("cards/pack", {cardsPack: {name}})
    },
    deletePacks(id: string) {
        return instance.delete("cards/pack", {params: {id}})
    },
    updatePacks(_id: string, name: string) {
        return instance.put("cards/pack", {cardsPack: {_id, name}})
    },
    getCards(cardsPack_id: string) {
        return instance.get<responseCardType>("/cards/card",
            {params: cardsPack_id})
    },
    setCards(name: string) {
        return instance.post("cards/card", {cardsPack: {name}})
    },
    deleteCards(id: string) {
        return instance.delete("cards/card", {params: {id}})
    },
    updateCards(_id: string, question?: string) {
        return instance.put("cards/card", {card: {_id, question}})
    },

}

//types
export type responseCardType = {
    cards: Array<ArrCardType>
    cardsTotalCount: number,
    maxGrade: number,
    minGrade: number,
    page: number,
    pageCount:number,
    packUserId: string,
    error?: string,
    isInitialized: boolean
}
export type ArrCardType = {
    answer: string,
    question: string,
    cardsPack_id: string,
    grade: number,
    shots: number,
    user_id: string,
    created: number,
    updated: number
}

export type getCardParams = {
    cardAnswer?: string,
    cardQuestion?: string,
    cardsPack_id: string,
    min?: number,
    max?: number,
    sortCards?: string,
    page?: number,
    pageCount?: number
}

type setCardParams = {
    cardsPack_id: string,
    question?: string,
    answer?: string,
    grade?: number
    shots?: number,
    answerlmg?: string,
    questionImg?: string,
    questionVideo?:string,
    answerVideo?: string
}

export type responsePacksType = {
    cardPacks: Array<cardsType>,
    cardPacksTotalCount: number,
    maxCardsCount: number,
    minCardsCount: number,
    page: number,
    pageCount: number,
    error?: string,
    isInitialized: boolean
    
    status: RequestStatusType,
    searchResult : string 
}

export type cardType = {
    _id: string
    user_id: string
    name: string
    cardsCount: number
    created: string
    updated: string
    url: string
}