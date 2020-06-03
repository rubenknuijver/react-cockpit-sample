import axios from "axios";
import { Liveness } from "../models";
// import { Unsubscribe } from '@reduxjs/toolkit';

export type Method =
  | "get"
  | "GET"
  | "delete"
  | "DELETE"
  | "head"
  | "HEAD"
  | "options"
  | "OPTIONS"
  | "post"
  | "POST"
  | "put"
  | "PUT"
  | "patch"
  | "PATCH"
  | "link"
  | "LINK"
  | "unlink"
  | "UNLINK";

export type HttpRequest = {
  method: Method;
  url: string;
  contentType?: string;
  content?: any;
};

async function send<TResponse>({
  url,
  content,
  method,
  contentType
}: HttpRequest): Promise<TResponse> {
  const response = await axios.request<TResponse>({
    url: url,
    method: method,
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "Access-Control-Allow-Origin": "*",
      "Content-type": contentType || "application/json"
    },
    data: content
  });
  return response.data;
}

export const getData = (endpoint: string): Promise<Array<Liveness>> => {
  return send<Array<Liveness>>({
    method: "GET",
    url: endpoint
  });
};

const stopPolling = (pollingInterval: Nullable<number>) => {
  pollingInterval && clearInterval(pollingInterval);
};
export const startPolling = (
  interval: number | undefined,
  onTimeElapsedCallback: () => void
): Unsubscribe => {
  const pollingInterval = setInterval(onTimeElapsedCallback, interval);
  return () => {
    stopPolling(pollingInterval);
  };
};
