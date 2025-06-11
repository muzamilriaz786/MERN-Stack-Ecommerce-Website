import { Navbar } from "../components/navbar"; 
import ShowProductSlider from "../components/showSlideProducts";
import ShowTrustBadges from "../components/Hero/showTrustBadges";
import ProductList from "../components/products/componentsList";

function Home() {

    return (
      <div>
        <Navbar />
        <ShowProductSlider />
        <ShowTrustBadges />
        <ProductList />
      </div>
    );
}

export default Home;