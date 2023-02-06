
export default defineNuxtPlugin((nuxtApp)=>{
    return nuxtApp.provide('dollar',(val:string|number)=>{
        return `$${val}`
    })
})