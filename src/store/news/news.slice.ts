import { createSlice } from "@reduxjs/toolkit";

import { newsActions } from "./news.actions";
import {
  transformGuardianData,
  transformNYTimesData,
} from "../../utils/dataTransformers";

type Article = {
  source: {
    id: null | string;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
};

export interface NewsState {
  startDate: Date | null;
  endDate: Date | null;
  isLoading: boolean;
  isError: boolean;
  selectedCategory: string;
  searchQuery: string;
  selectedSources: string[];
  news: Article[];
}

const initialState: NewsState = {
  startDate: null,
  endDate: null,
  isLoading: false,
  isError: false,
  selectedCategory: "",
  searchQuery: "",
  selectedSources: ["NewsAPI", "Guardian", "NYTimes"],
  news: [],
};

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    clearNewsData: (state) => {
      state.news = [];
    },
    updateSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    updateStartDate: (state, action) => {
      state.startDate = action.payload;
    },
    updateEndDate: (state, action) => {
      state.endDate = action.payload;
    },
    updateSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    toggleSource: (state, action) => {
      const source = action.payload;
      const index = state.selectedSources.indexOf(source);

      if (index !== -1) {
        state.selectedSources.splice(index, 1);
      } else {
        state.selectedSources.push(source);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(newsActions.fetchNewsAPIData.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(newsActions.fetchNewsAPIData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        const results = action.payload.data.articles;
        state.news = [...state.news, ...results];
      })
      .addCase(newsActions.fetchNewsAPIData.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(newsActions.fetchGuardianData.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(newsActions.fetchGuardianData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        const results = action.payload.data.response.results;

        const transformedData = results.map((article: any) =>
          transformGuardianData(article)
        );
        state.news = [...state.news, ...transformedData];
      })
      .addCase(newsActions.fetchGuardianData.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(newsActions.fetchNYTimesData.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(newsActions.fetchNYTimesData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        console.log("payload", action.payload);

        const results = action.payload.data.results
          ? action.payload.data.results
          : action.payload.data.response.docs;

        console.log("results", results);
        console.log("payload", action.payload);
        const transformedData = results.map((article: any) =>
          transformNYTimesData(article)
        );
        state.news = [...state.news, ...transformedData];
      })
      .addCase(newsActions.fetchNYTimesData.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

// Action creators are generated for each case reducer function
export const {
  clearNewsData,
  updateSearchQuery,
  updateStartDate,
  updateEndDate,
  updateSelectedCategory,
  toggleSource,
} = newsSlice.actions;

export default newsSlice.reducer;
