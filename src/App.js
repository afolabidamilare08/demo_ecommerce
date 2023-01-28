import './App.css';
import { HeaderComp } from './components/headerComp/headerComp';
import { HomesliderComp } from './components/headerComp/homesliderComp/homesliderComp';
import { HouseProduct } from './components/headerComp/producthouseComp/producthouseComp';
import { ProductList } from './components/headerComp/producthouseComp/productlistComp';

function App() {
  return (
    <div className="App">

        <HeaderComp/>
        <HomesliderComp/>
        
        <div>
          <HouseProduct
          title={"New Arrivals"}
            products={ 
              <>
                <ProductList/>
                <ProductList/>
                <ProductList/>
                <ProductList/>
                <ProductList/>
                <ProductList/>
                <ProductList/>
                <ProductList/>
              </>
             }
          />

          <HouseProduct
          title={"Best Sellers"}
          bgColor="orange"
            products={ 
              <>
                <ProductList/>
                <ProductList/>
                <ProductList/>
                <ProductList/>
                <ProductList/>
                <ProductList/>
                <ProductList/>
                <ProductList/>
              </>
             }
          />
        </div>

    </div>
  );
}

export default App;
