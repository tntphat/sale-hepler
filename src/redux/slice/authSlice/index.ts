import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from '../messageSlice';
import { authService } from '../../../services/auth';

const userJson = localStorage.getItem('user');
const user = userJson ? JSON.parse(userJson) : {};

export const signup = createAsyncThunk(
  'auth/register',
  async ({ name, email, password, confirm_password }: any, thunkAPI: any) => {
    try {
      const response = await authService.signup(name, email, password, confirm_password);
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
  async ({ email, password }: any, thunkAPI: any) => {
    try {
      const data = await authService.login(email, password);
      return { user: data };
    } catch (error: any) {
      const message = error?.response?.data?.message || error.message || error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  },
);

export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout();
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
      state.user = payload.user;
    });

    builder.addCase(login.rejected, (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    });

    builder.addCase(logout.fulfilled, (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    });
  },
});
const { reducer } = authSlice;
export default reducer;
