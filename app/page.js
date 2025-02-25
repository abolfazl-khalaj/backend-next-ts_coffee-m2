import Footer from "@/components/modules/footer/Footer";
import Navbar from "@/components/modules/navbar/Navbar";
import Articles from "@/components/templates/index/articles/Articles";
import Banner from "@/components/templates/index/banner/Banner";
import Latest from "@/components/templates/index/latest/Latest";
import Promote from "@/components/templates/index/promote/Promote";
import authUser from "@/configs/authServer";


export default async function Home() {

  const user = await authUser();
  console.log('user page home => ' , user);
  
  return (
    <>
      <Navbar isLogin={user ? true : false} />
      <Banner />
      <Latest />
      <Promote />
      <Articles />
      <Footer />
    </>
  );
}
