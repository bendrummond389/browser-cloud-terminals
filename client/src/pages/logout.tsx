import { NextPageContext } from 'next';

const LogoutPage = () => {
  return <></>;
};

export async function getServerSideProps({ res }: NextPageContext) {
  if (res) {
    res.writeHead(302, { Location: '/api/auth/logout' });
    res.end();
  }

  return { props: {} };
}

export default LogoutPage;
