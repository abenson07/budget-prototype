import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Buckets from './pages/Buckets';
import Simulate from './pages/Simulate';
import AddNew from './pages/AddNew';
import Settings from './pages/Settings';
import Transactions from './pages/Transactions';
import PhoneContainer from './components/PhoneContainer';

function AppContent() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buckets" element={<Buckets />} />
        <Route path="/simulate" element={<Simulate />} />
        <Route path="/add" element={<AddNew />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/transactions" element={<Transactions />} />
      </Routes>
    </Layout>
  );
}

function App() {
  return (
    <Router>
      <div className="md:hidden h-full">
        <AppContent />
      </div>
      
      <PhoneContainer>
        <div className="h-full">
          <AppContent />
        </div>
      </PhoneContainer>
    </Router>
  );
}

export default App; 