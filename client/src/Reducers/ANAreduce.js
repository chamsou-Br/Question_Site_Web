export const ANAreduce = (state , action) => {
    if (action.type === 'ADD_QUES') {
        return[...state , {
            username : action.Question.username ,
            question : action.Question.question ,
            display : 'None',
            id : Math.random()
        }]
    }
    if (action.type === 'ADD_FORM_RES') {
        const newstate = state.filter(qes => {
            if (qes.id === action.id && qes.display === 'None') {
                    qes.display = 'Block'

            } else if (qes.id === action.id && qes.display === 'Block') {
                qes.display = 'None'
        } 
        return qes 
    })
    
    state = newstate ;
    console.log(state);
    return state;
    }
    else return state ;
};