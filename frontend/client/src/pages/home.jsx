import { Navbar } from "../components/navbar"; 
import ShowProductSlider from "../components/showSlideProducts";
import ShowTrustBadges from "../components/Hero/showTrustBadges";
function Home() {

    return (
      <div>
        <Navbar />
        <ShowProductSlider />
        <ShowTrustBadges />
      </div>
    );
}

export default Home;