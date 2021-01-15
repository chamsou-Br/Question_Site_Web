export const ANAresReduce = (state , action) => {
    if (action.type === 'AFICHE_RES'){
     const newstate = state.filter(res => {
            if (res.id === action.id && res.display === 'None') {
                    res.display = 'Block'

            } else if (res.id === action.id && res.display === 'Block') {
                res.display = 'None'
        } 
            return res ;
        })
        state = newstate;
        return state ;
    }
  else return state ;
};