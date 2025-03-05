import OpenAI from "openai";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

export const fetchAIResponse = createAsyncThunk(
  "chat/fetchAIResponse",
  async (userMessage: string, { rejectWithValue }) => {
    try {
      const openai = new OpenAI({
        apiKey: OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
      });

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: userMessage }],
      });

      return { sender: "ai", text: response.choices[0].message.content };
    } catch (error) {
      console.error("OpenAI API Error:", error);

      if (error.response) {
        const { status, data } = error.response;

        if (status === 429) {
          return rejectWithValue(
            "API rate limit exceeded. Please try again later."
          );
        }

        return rejectWithValue(
          data?.error?.message || "An error occurred with OpenAI API."
        );
      }

      return rejectWithValue(
        error.message || "AI response failed. Please check your connection."
      );
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: JSON.parse(localStorage.getItem("chatMessages")) || [],
    loading: false,
    error: null,
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
      localStorage.setItem("chatMessages", JSON.stringify(state.messages));
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAIResponse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAIResponse.fulfilled, (state, action) => {
        state.loading = false;
        state.messages.push(action.payload);
        localStorage.setItem("chatMessages", JSON.stringify(state.messages));
      })
      .addCase(fetchAIResponse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addMessage, clearError } = chatSlice.actions;
export default chatSlice.reducer;
