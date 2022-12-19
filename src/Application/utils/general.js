export const mutateState = (setState, entries) => {
    setState((prev) => {
        return {
            ...prev,
            ...entries
        }
    })
}