import {
  Action,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import unsplashAPI from '../../app/providers/api';
import { IPhotoItem, PageType } from '../../shared/alias-types/photos.types';

interface APIState {
  photos: IPhotoItem[] | [];
  photo: {
    id: Pick<IPhotoItem, 'id'> | {};
    urls: Pick<IPhotoItem, 'urls'> | {};
  };
  error: {
    isError: boolean;
  };
  status: 'idle' | 'loading' | 'failed';
}

interface IPhotosError {
  error: {
    isError: boolean;
  };
  // здесь можно гибко манипулировать если есть регламентации - а мне немного лень понтоваться
}

interface RejectedAction extends Action {
  error: IPhotosError;
}

function isRejectedAction(action: Action): action is RejectedAction {
  return action.type.endsWith('rejected');
}

const initialState: APIState = {
  photos: [],
  photo: {
    id: -1,
    urls: {},
  },
  status: 'idle',
};

const fetchPhotosAsyncFulfilledMapper = action =>
  (Array.isArray(action.payload) &&
    action.payload.map(
      ({ id, height, width, urls }: IPhotoItem) =>
        ({
          id,
          height,
          width,
          urls,
        } as IPhotoItem),
    )) ||
  [];
export const fetchPhotosAsync = createAsyncThunk<
  IPhotoItem,
  { page: PageType },
  {
    rejectValue: IPhotosError;
  }
>('api/fetchPhotos', async ({ page = 1 }, thunkApi) => {
  const res = await unsplashAPI.get(`/photos?page=${page}`);
  if (res.status !== 200) {
    return thunkApi.rejectWithValue({
      error: { isError: true },
    } as IPhotosError);
  }
  return res.data;
});

export const refreshPhotosAsync = createAsyncThunk<
  IPhotoItem,
  { page: PageType },
  {
    rejectValue: IPhotosError;
  }
>('api/refreshPhotos', async ({ page = 1 }, thunkApi) => {
  const res = await unsplashAPI.get(`/photos?page=${page}`);
  if (res.status !== 200) {
    return thunkApi.rejectWithValue({
      error: { isError: true },
    } as IPhotosError);
  }
  return res.data as IPhotoItem;
});

export const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {
    setOpenedPhoto(state, action) {
      state.photo = { id: action.payload.id, urls: action.payload.urls };
    },
    setError(state, action) {
      state.error.isError = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPhotosAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(
        fetchPhotosAsync.fulfilled,
        (state, action: PayloadAction<IPhotoItem>) => {
          state.status = 'idle';
          state.photos = [
            ...state.photos,
            ...fetchPhotosAsyncFulfilledMapper(action),
          ];
        },
      )
      .addCase(fetchPhotosAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.error;
      })
      .addCase(refreshPhotosAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(
        refreshPhotosAsync.fulfilled,
        (state, action: PayloadAction<IPhotoItem>) => {
          state.status = 'idle';
          state.photos = [...fetchPhotosAsyncFulfilledMapper(action)];
        },
      )
      .addCase(refreshPhotosAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.error;
      })
      .addMatcher(isRejectedAction, (state, action) => {});
  },
});

export const { setOpenedPhoto, setError } = apiSlice.actions;

export default apiSlice.reducer;
