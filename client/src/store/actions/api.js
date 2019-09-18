import { LOADING } from "../actionTypes";

export const setLoading = loading => {
  return {
    type: LOADING,
    loading
  };
};
