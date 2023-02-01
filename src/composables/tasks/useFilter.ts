

export const UseFilter=()=>{
    const toBeNarrow=useState<number|string>('limit',()=>'199')
    const filterTasks = () => {
        navigateTo({
            name:'tasks-tasks',
            params:{tasks:toBeNarrow.value}
        })
    }

    return{
        toBeNarrow,filterTasks
    }

}