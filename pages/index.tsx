import { Post } from '../components/Post';
import { MainLayout } from '../layouts/MainLayout';
import { GetServerSideProps } from "next";
import { wrapper } from "../redux/store";
import { parseCookies } from "nookies";
import { UserApi } from "../utils/api";
import { setUserData } from "../redux/slices/user";

export default function Home() {
  return (
    <MainLayout>
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </MainLayout>
  );
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async (ctx) => {
      try {
        const { authToken } = parseCookies(ctx)

        const userData = await UserApi.getMe(authToken);

        store.dispatch(setUserData(userData))
        console.log('userData: ', userData)
        
      } catch (err) {
        console.log(err)
        return  {props: {}}
      }
      return { props: {} };
    });
