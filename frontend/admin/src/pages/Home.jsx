import ProductList from "../components/ProductList"
import Layout from '../components/Layout'
import ShowProductSlide from '../components/showProductSlide'

import ShowTrustBadges from "../components/showTrustBadges";
 const Home =() => {
    return (
      <div>
        <Layout />
        <ProductList />
        <ShowProductSlide />
        <ShowTrustBadges />
      </div>
    );

}
export default Home;