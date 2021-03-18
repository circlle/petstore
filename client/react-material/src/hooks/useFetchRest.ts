import { useRequest } from "ahooks";

export type UseLoadOptions = {
  path: string;
  method: "POST" | "GET" | "PUT" | "DELETE";
  body?: Record<string, any>;
};

const createUseLoad = (baseUrl: string) => <R>(options: UseLoadOptions) => {
  const { path, method, body } = options;
  const url = baseUrl + path;
  let stringBody = "";
  try {
    stringBody = JSON.stringify(body);
  } catch (err) {
    throw new Error(err);
  }
  const result = useRequest<R>({
    url,
    method,
    body: stringBody,
  });
  return result;
};
const useLoad = createUseLoad("http://localhost:4000");

export default useLoad;
