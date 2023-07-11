import { NextPageContext } from 'next';

const LoginPage = () => {
  return <></>; 
};

export async function getServerSideProps({ res }: NextPageContext) {
  if (res) {
    res.writeHead(302, { Location: '/api/auth/login' });
    res.end();
  }

  return { props: {} };
}

export default LoginPage;