import Link from "next/link";

const Home = () => {

  return (
    <>
      <div>
        <Link href="auth/signin">Signin</Link>
      </div>
      <div>
        <Link href="auth/signup">Signup</Link>
      </div>
    </>
  );
};

export default Home;
