import Layout from "./Layout.jsx";
import About from "./About";
import CategoryProducts from "./CategoryProducts";
import Checkout from "./Checkout";
import Contact from "./Contact";
import MessageDetail from "./MessageDetail";
import FAQ from "./FAQ";
import Favorites from "./Favorites";
import MyOrders from "./MyOrders";
import OnlineStores from "./OnlineStores";
import OrderSuccess from "./OrderSuccess";
import Pipeline from "./Pipeline";
import PromoAdmin from "./PromoAdmin";
import Shop from "./Shop";
import Terms from "./Terms";
import Profile from "./Profile";
import Login from "./Login";
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

const PAGES = {
    About: About,
    CategoryProducts: CategoryProducts,
    Checkout: Checkout,
    Contact: Contact,
    FAQ: FAQ,
    Favorites: Favorites,
    MyOrders: MyOrders,
    OnlineStores: OnlineStores,
    OrderSuccess: OrderSuccess,
    Pipeline: Pipeline,
    PromoAdmin: PromoAdmin,
    Shop: Shop,
    Terms: Terms,
    Profile: Profile,
    Login: Login,
}

function _getCurrentPage(url) {
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    let urlLastPart = url.split('/').pop();
    if (urlLastPart.includes('?')) {
        urlLastPart = urlLastPart.split('?')[0];
    }

    const pageName = Object.keys(PAGES).find(page => page.toLowerCase() === urlLastPart.toLowerCase());
    return pageName || Object.keys(PAGES)[0];
}

// Create a wrapper component that uses useLocation inside the Router context
function PagesContent() {
    const location = useLocation();
    const currentPage = _getCurrentPage(location.pathname);
    
    return (
        <Layout currentPageName={currentPage}>
            <Routes>
                <Route path="/" element={<About />} />
                <Route path="/About" element={<About />} />
                <Route path="/CategoryProducts" element={<CategoryProducts />} />
                <Route path="/Checkout" element={<Checkout />} />
                <Route path="/Contact" element={<Contact />} />
                <Route path="/Contact/messages/:id" element={<MessageDetail />} />
                <Route path="/FAQ" element={<FAQ />} />
                <Route path="/Favorites" element={<Favorites />} />
                <Route path="/MyOrders" element={<MyOrders />} />
                <Route path="/OnlineStores" element={<OnlineStores />} />
                <Route path="/OrderSuccess" element={<OrderSuccess />} />
                <Route path="/Pipeline" element={<Pipeline />} />
                <Route path="/PromoAdmin" element={<PromoAdmin />} />
                <Route path="/Shop" element={<Shop />} />
                <Route path="/Terms" element={<Terms />} />
                <Route path="/Profile" element={<Profile />} />
                <Route path="/Login" element={<Login />} />
            </Routes>
        </Layout>
    );
}

export default function Pages() {
    return (
        <Router>
            <PagesContent />
        </Router>
    );
}