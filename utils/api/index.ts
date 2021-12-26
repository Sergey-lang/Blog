import { GetServerSidePropsContext, NextPageContext } from "next";
import Cookies, { parseCookies } from "nookies";
import axios from "axios";
import { UserApi } from "./user";
import { PostApi } from "./post";
import { CommentApi } from "./comment";

export type ApiReturnType = {
  user: ReturnType<typeof UserApi>
  post: ReturnType<typeof PostApi>
  comment: ReturnType<typeof CommentApi>
}

export const Api = (ctx?: NextPageContext | GetServerSidePropsContext): ApiReturnType => {
  const cookies = ctx ? Cookies.get(ctx) : parseCookies();
  const token = cookies.rtoken;

  const instance = axios.create({
    baseURL: 'http://localhost:7777',
    // baseURL: typeof window === 'undefined' ? publicRuntimeConfig.API_NODE_URL : publickRuntimeConfig.API_CLIENT_URL,
    headers: {
      Authorization: 'Bearer ' + token,
    }
  })

  // const apis = {
  //   user: UserApi,
  //   post: PostApi,
  //   comment: CommentApi,
  // }
  //
  // return Object.entries(apis).reduce((acc: any, [key, func]) => {
  //   return {
  //     ...acc,
  //     [key]: func(instance)
  //   };
  // }, {} as ApiReturnType);

  return {
    user: UserApi(instance),
    post: PostApi(instance),
    comment: CommentApi(instance),
  }
}