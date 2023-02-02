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
export type Route_Params=string|string[]