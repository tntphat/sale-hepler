import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from '../appSlice/messageSlice';
import { apiAuth } from '../../../services/api';

const userJson = localStorage.getItem('user');
const user = userJson ? JSON.parse(userJson) : {};

export const signup = createAsyncThunk(
  'auth/register',
  async (data: IParamsSignUp, thunkAPI: any) => {
    try {
      const response = await apiAuth.signup(data);
      thunkAPI.dispatch(setMessage(response.data.message));
      return response.data;
    } catch (error: any) {
      const message = error?.response?.data?.message || error.message || error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  },
);

export const login = createAsyncThunk(
  'auth/login',
  async (params: IParamsSignIn, thunkAPI: any) => {
    try {
      const data = await apiAuth.login(params);
      return { user: data };
    } catch (error: any) {
      thunkAPI.dispatch(setMessage(error.message));
      return thunkAPI.rejectWithValue();
    }
  },
);

export const doGetUserInfo = createAsyncThunk('auth/getUserInfo', async () => {
  const res = await apiAuth.getUserInfo();
  return res.data;
});

export const logout = createAsyncThunk('auth/logout', async () => {
  await apiAuth.logout();
});

const initialState = user ? { isLoggedIn: true, user } : { isLoggedIn: false, user: null };
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signup.fulfilled, (state, action) => {
      state.isLoggedIn = false;
    });

    builder.addCase(signup.rejected, (state, action) => {
      state.isLoggedIn = false;
    });

    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.isLoggedIn = true;
      state.user = payload?.user;
    });

    builder.addCase(login.rejected, (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    });

    builder.addCase(logout.fulfilled, (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    });

    builder.addCase(doGetUserInfo.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.data.user;
    });

    builder.addCase(doGetUserInfo.rejected, (state, action) => {
      state.isLoggedIn = false;
    });
  },
});
const { reducer } = authSlice;
export default reducer;
