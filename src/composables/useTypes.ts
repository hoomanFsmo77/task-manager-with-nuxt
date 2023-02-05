export interface ITask {
    id:number
    title:string
    completed:boolean
}
export interface New_Task {
    completed:boolean
    content:string,
    id?:number|null

}

export interface IProduct {
    id:number
    title:string
    img:string
    description:string
    price:number
    count:number
}
export type Route_Params=string|string[]