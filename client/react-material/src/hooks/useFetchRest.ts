import Cookies from "js-cookie";
import { FailedResponseDto, SuccessResponseDto } from "../generated-types";
import { useHistory } from "react-router";
import { useState } from "react";

export type LoadOptions = {
  path: string;
  method: "POST" | "GET" | "PUT" | "DELETE";
  body?: Record<string, any>;
};
export type CreateLoadOptions = {
  baseUrl: string;
  onUnAuthorization?: () => void;
  setLoading: (loading: boolean) => void;
};
export const TOKEN_FIELD = "pet_store";
export type SuccessResponse<T> = Omit<SuccessResponseDto, "data"> & { data: T };

export const createLoad = (createLoadOptions: CreateLoadOptions) => async <T>(
  options: LoadOptions
) => {
  const { baseUrl, onUnAuthorization, setLoading } = createLoadOptions;
  const { path, method, body } = options;
  const url = baseUrl + path;
  let stringBody = "";
  try {
    stringBody = JSON.stringify(body);
  } catch (err) {
    throw new Error(err);
  }

  setLoading(true);
  try {
    const response = await fetch(url, {
      method,
      headers: {
        "content-type": "application/json",
        Authorization: Cookies.get(TOKEN_FIELD) || "",
      },
      body: stringBody,
    });
    if (response.ok) {
      const data = (await response.json()) as SuccessResponse<T>;
      return data.data;
    } else {
      const data = (await response.json()) as FailedResponseDto;
      const statusCode = data.statusCode;
      if (statusCode === 401) {
        Cookies.remove("TOKEN_FIELD");
        onUnAuthorization && onUnAuthorization();
      }
      throw new Error(data.data.error);
    }
  } catch (err) {
    console.log(`Error when fetch ${path}: `, err);
  } finally {
    setLoading(false);
  }
};

const useLoad = () => {
  const history = useHistory();
  const onUnAuthorization = () => {
    history.push("/login");
  };
  const [loading, setLoading] = useState(false);
  const load = createLoad({
    baseUrl: "http://localhost:4000",
    onUnAuthorization,
    setLoading,
  });
  return { load, loading };
};

export default useLoad;
