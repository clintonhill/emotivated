const GET_ALL_STICKERS = 'stickers/getAll';

export const setAllStickers = (stickers) => {
    return {
        type: GET_ALL_STICKERS,
        payload: stickers
    }
}

export const getAllStickers = () => async (dispatch) => {
  const response = await fetch(`/api/stickers/`);
  if(response.ok) {
    const stickers = await response.json();
    dispatch(setAllStickers(stickers));
  }
}

const stickerReducer = (state = {}, action) => {
    let newState = {...state};
    switch (action.type){
        case GET_ALL_STICKERS:
          const unsorted = action.payload;
          for(let sticker of unsorted.stickers) {
            newState[sticker.id] = { name: sticker.name, path: sticker.path }
          }
            return newState
        default:
            return state
    }
}

export default stickerReducer
